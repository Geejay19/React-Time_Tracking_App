import {
  buildIntervals, dailyTotals, findOverlaps, formatApiLocal,
  isTaskActive, tagTotal, taskTotal,
} from '../utils/time.js'

const records = [
  { id: 1, taskId: 1, type: 0, timestamp: '2026-10-30 23:30:00.000' },
  { id: 2, taskId: 1, type: 1, timestamp: '2026-10-31 01:30:00.000' },
  { id: 3, taskId: 2, type: 0, timestamp: '2026-10-31 00:30:00.000' },
  { id: 4, taskId: 2, type: 1, timestamp: '2026-10-31 02:00:00.000' },
]

describe('local time calculations', () => {
  it('formats a local wall-clock timestamp without UTC conversion', () => {
    expect(formatApiLocal(new Date(2026, 9, 31, 12, 4, 5, 6)))
      .toBe('2026-10-31 12:04:05.006')
  })

  it('pairs timestamp records and detects active tasks', () => {
    expect(buildIntervals(records, 1)).toHaveLength(1)
    expect(isTaskActive(records, 1)).toBe(false)
    expect(isTaskActive([...records, { id: 5, taskId: 1, type: 0, timestamp: '2026-10-31 03:00:00.000' }], 1)).toBe(true)
  })

  it('clips task time to the observation range', () => {
    const total = taskTotal(records, 1, '2026-10-31 00:00:00.000', '2026-10-31 01:00:00.000', new Date(2026, 9, 31, 3))
    expect(total).toBe(60 * 60 * 1000)
  })

  it('deduplicates overlapping activity for a tag', () => {
    const tasks = [{ id: 1, tagIds: [7] }, { id: 2, tagIds: [7] }]
    const total = tagTotal(tasks, records, 7, '2026-10-31 00:00:00.000', '2026-10-31 03:00:00.000', new Date(2026, 9, 31, 3))
    expect(total).toBe(2 * 60 * 60 * 1000)
  })

  it('splits activity across local calendar days and includes zero days', () => {
    const days = dailyTotals(records, 1, '2026-10-30', '2026-11-01', new Date(2026, 10, 2))
    expect(days.map((day) => day.milliseconds)).toEqual([30 * 60 * 1000, 90 * 60 * 1000, 0])
  })

  it('marks every overlapping interval', () => {
    const intervals = [
      { key: 'a', start: '2026-10-31 10:00:00.000', end: '2026-10-31 11:00:00.000' },
      { key: 'b', start: '2026-10-31 10:30:00.000', end: '2026-10-31 12:00:00.000' },
    ]
    expect([...findOverlaps(intervals)].sort()).toEqual(['a', 'b'])
  })

  it('marks both a manual interval and an overlapping ongoing interval', () => {
    const intervals = [
      { key: 'ongoing', start: '2026-10-31 10:00:00.000', end: null, ongoing: true },
      { key: 'manual', start: '2026-10-31 10:30:00.000', end: '2026-10-31 11:00:00.000' },
    ]
    const now = new Date(2026, 9, 31, 12, 0, 0)

    expect([...findOverlaps(intervals, now)].sort()).toEqual(['manual', 'ongoing'])
  })
})
