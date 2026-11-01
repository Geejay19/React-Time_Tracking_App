import {
  buildIntervals, dailyTotals, findOverlaps, formatApiLocal,
  isTaskActive, tagTotal, taskTotal,
} from '../utils/time.js'

// Shared timestamp data for two tasks. The intervals cross midnight and overlap,
// allowing several calculations to be tested with one predictable data set.
// Timestamp type 0 means activation and type 1 means deactivation.
const records = [
  { id: 1, taskId: 1, type: 0, timestamp: '2026-10-30 23:30:00.000' },
  { id: 2, taskId: 1, type: 1, timestamp: '2026-10-31 01:30:00.000' },
  { id: 3, taskId: 2, type: 0, timestamp: '2026-10-31 00:30:00.000' },
  { id: 4, taskId: 2, type: 1, timestamp: '2026-10-31 02:00:00.000' },
]

describe('local time calculations', () => {
  // Verifies the assignment's local wall-clock rule. The API value must retain
  // the supplied local date and time instead of being converted to UTC.
  it('formats a local wall-clock timestamp without UTC conversion', () => {
    expect(formatApiLocal(new Date(2026, 9, 31, 12, 4, 5, 6)))
      .toBe('2026-10-31 12:04:05.006')
  })

  // Covers activation/deactivation pairing and status derivation. A matched
  // activation is inactive, while a final unmatched activation is ongoing.
  it('pairs timestamp records and detects active tasks', () => {
    expect(buildIntervals(records, 1)).toHaveLength(1)
    expect(isTaskActive(records, 1)).toBe(false)
    expect(isTaskActive([...records, { id: 5, taskId: 1, type: 0, timestamp: '2026-10-31 03:00:00.000' }], 1)).toBe(true)
  })

  // Ensures report totals count only the portion of an activity interval that
  // falls inside the independently selected observation range.
  it('clips task time to the observation range', () => {
    const total = taskTotal(records, 1, '2026-10-31 00:00:00.000', '2026-10-31 01:00:00.000', new Date(2026, 9, 31, 3))
    expect(total).toBe(60 * 60 * 1000)
  })

  // Covers tag-summary union logic. Both tasks share tag 7, so their overlapping
  // active periods must be merged and the overlap counted only once.
  it('deduplicates overlapping activity for a tag', () => {
    const tasks = [{ id: 1, tagIds: [7] }, { id: 2, tagIds: [7] }]
    const total = tagTotal(tasks, records, 7, '2026-10-31 00:00:00.000', '2026-10-31 03:00:00.000', new Date(2026, 9, 31, 3))
    expect(total).toBe(2 * 60 * 60 * 1000)
  })

  // Verifies that activity crossing local midnight is divided between the
  // correct calendar days and that dates with no activity still receive zero.
  it('splits activity across local calendar days and includes zero days', () => {
    const days = dailyTotals(records, 1, '2026-10-30', '2026-11-01', new Date(2026, 10, 2))
    expect(days.map((day) => day.milliseconds)).toEqual([30 * 60 * 1000, 90 * 60 * 1000, 0])
  })

  // Covers Activity History validation by confirming that every interval taking
  // part in an overlap is identified for visual warning in the interface.
  it('marks every overlapping interval', () => {
    const intervals = [
      { key: 'a', start: '2026-10-31 10:00:00.000', end: '2026-10-31 11:00:00.000' },
      { key: 'b', start: '2026-10-31 10:30:00.000', end: '2026-10-31 12:00:00.000' },
    ]
    expect([...findOverlaps(intervals)].sort()).toEqual(['a', 'b'])
  })

  // Regression coverage for an interval without a known end. The ongoing
  // interval is treated as ending at `now`, so both conflicting entries are marked.
  it('marks both a manual interval and an overlapping ongoing interval', () => {
    const intervals = [
      { key: 'ongoing', start: '2026-10-31 10:00:00.000', end: null, ongoing: true },
      { key: 'manual', start: '2026-10-31 10:30:00.000', end: '2026-10-31 11:00:00.000' },
    ]
    const now = new Date(2026, 9, 31, 12, 0, 0)

    expect([...findOverlaps(intervals, now)].sort()).toEqual(['manual', 'ongoing'])
  })
})
