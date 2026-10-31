const pad = (value, length = 2) => String(value).padStart(length, '0')

export function parseLocal(value) {
  if (value instanceof Date) return new Date(value)
  if (!value) return null
  const normalized = String(value).replace(' ', 'T')
  const date = new Date(normalized)
  return Number.isNaN(date.getTime()) ? null : date
}

export function formatApiLocal(value) {
  const date = parseLocal(value)
  if (!date) return ''
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}.${pad(date.getMilliseconds(), 3)}`
}

export function toInputLocal(value) {
  const date = parseLocal(value)
  if (!date) return ''
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}

export function startOfToday(now = new Date()) {
  return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

export function dateInput(value) {
  const date = parseLocal(value)
  return date ? `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` : ''
}

export function formatDuration(milliseconds) {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000))
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
}

export function formatReadableLocal(value) {
  const date = parseLocal(value)
  if (!date) return 'Unknown'
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric', month: 'short', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  }).format(date)
}

export function buildIntervals(records, taskId) {
  const sorted = records
    .filter((record) => Number(record.taskId) === Number(taskId))
    .slice()
    .sort((a, b) => {
      const timeDifference = parseLocal(a.timestamp) - parseLocal(b.timestamp)
      return timeDifference || a.id - b.id
    })

  const intervals = []
  let open = null
  sorted.forEach((record) => {
    if (record.type === 0) {
      if (open) {
        intervals.push({
          key: `orphan-${open.id}`,
          taskId: Number(taskId),
          startTimestampId: open.id,
          endTimestampId: null,
          start: open.timestamp,
          end: null,
          ongoing: true,
          warning: 'Activation has no following deactivation.',
        })
      }
      open = record
    } else if (record.type === 1 && open) {
      intervals.push({
        key: `${open.id}-${record.id}`,
        taskId: Number(taskId),
        startTimestampId: open.id,
        endTimestampId: record.id,
        start: open.timestamp,
        end: record.timestamp,
        ongoing: false,
      })
      open = null
    }
  })
  if (open) {
    intervals.push({
      key: `ongoing-${open.id}`,
      taskId: Number(taskId),
      startTimestampId: open.id,
      endTimestampId: null,
      start: open.timestamp,
      end: null,
      ongoing: true,
    })
  }
  return intervals
}

export function isTaskActive(records, taskId) {
  const relevant = records
    .filter((record) => Number(record.taskId) === Number(taskId))
    .slice()
    .sort((a, b) => parseLocal(a.timestamp) - parseLocal(b.timestamp) || a.id - b.id)
  return relevant.at(-1)?.type === 0
}

export function clippedDuration(interval, rangeStart, rangeEnd, now = new Date()) {
  const start = parseLocal(interval.start)
  const rawEnd = interval.end ? parseLocal(interval.end) : now
  const end = rawEnd > now ? now : rawEnd
  const from = parseLocal(rangeStart)
  const to = parseLocal(rangeEnd)
  if (!start || !end || !from || !to) return 0
  return Math.max(0, Math.min(end, to) - Math.max(start, from))
}

export function taskTotal(records, taskId, rangeStart, rangeEnd, now = new Date()) {
  return buildIntervals(records, taskId).reduce(
    (sum, interval) => sum + clippedDuration(interval, rangeStart, rangeEnd, now),
    0,
  )
}

export function mergeIntervals(intervals, rangeStart, rangeEnd, now = new Date()) {
  const from = parseLocal(rangeStart)
  const to = parseLocal(rangeEnd)
  const clipped = intervals
    .map((interval) => {
      const start = parseLocal(interval.start)
      const rawEnd = interval.end ? parseLocal(interval.end) : now
      const end = rawEnd > now ? now : rawEnd
      return [new Date(Math.max(start, from)), new Date(Math.min(end, to))]
    })
    .filter(([start, end]) => start < end)
    .sort((a, b) => a[0] - b[0])

  return clipped.reduce((merged, current) => {
    const last = merged.at(-1)
    if (!last || current[0] >= last[1]) merged.push(current)
    else if (current[1] > last[1]) last[1] = current[1]
    return merged
  }, [])
}

export function tagTotal(tasks, records, tagId, rangeStart, rangeEnd, now = new Date()) {
  const intervals = tasks
    .filter((task) => task.tagIds.includes(Number(tagId)))
    .flatMap((task) => buildIntervals(records, task.id))
  return mergeIntervals(intervals, rangeStart, rangeEnd, now)
    .reduce((sum, [start, end]) => sum + (end - start), 0)
}

export function overlapsRange(interval, start, end, now = new Date()) {
  return clippedDuration(interval, start, end, now) > 0
}

export function findOverlaps(intervals) {
  const problematic = new Set()
  intervals.forEach((current, index) => {
    const currentStart = parseLocal(current.start)
    const currentEnd = parseLocal(current.end)
    if (!currentStart || !currentEnd || currentEnd <= currentStart) problematic.add(current.key)
    intervals.slice(index + 1).forEach((other) => {
      const otherStart = parseLocal(other.start)
      const otherEnd = parseLocal(other.end)
      if (currentStart < otherEnd && otherStart < currentEnd) {
        problematic.add(current.key)
        problematic.add(other.key)
      }
    })
  })
  return problematic
}

export function dailyTotals(records, taskId, startDate, endDate, now = new Date()) {
  const start = parseLocal(`${startDate}T00:00:00`)
  const final = parseLocal(`${endDate}T00:00:00`)
  if (!start || !final || start > final) return []
  const days = []
  for (let day = start; day <= final; day = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1)) {
    const next = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1)
    days.push({
      date: dateInput(day),
      label: new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(day),
      milliseconds: taskTotal(records, taskId, day, next, now),
    })
  }
  return days
}
