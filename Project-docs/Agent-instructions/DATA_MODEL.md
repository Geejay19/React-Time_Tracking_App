# Frontend Data Model

## Tag

```js
{ id: Number, name: String, additionalData: String }
```

Display tag text, prevent duplicate association to one task, and allow reuse across tasks.

## Task

```js
{ id: Number, name: String, tagIds: Number[], additionalData: String }
```

Derived presentation fields may include resolved `tags`, `isActive`, and `currentSessionStartedAt`. Activity is derived from timestamps, not persisted as a separate authoritative property.

## Timestamp

```js
{ id: Number, timestamp: String, taskId: Number, type: 0 | 1 }
```

Type 0 activates and type 1 deactivates. Values are local time. Sort explicitly before derivation.

## Activity interval

```js
{
  taskId: Number,
  startTimestampId: Number,
  endTimestampId: Number | null,
  start: String,
  end: String | null,
  ongoing: Boolean
}
```

Pair each valid activation with its following deactivation. An unmatched final activation is ongoing with no end. Preserve IDs for editing. Malformed data must not crash the app; expose an understandable warning when relevant.

## Options

Server: `{ id: 1, theme, alternative: 0 | 1, own_textual_data }`.

Frontend may normalize to `{ theme: "light" | "dark", alternativeMode: Boolean, ownTextualData }`.

## Independent ranges

Maintain separate state for Task Summary, Tag Summary, Activity History, and Daily Chart ranges.

## Calculations

For task time, derive intervals, use now as the calculation end for ongoing intervals, clip to the observation range, discard nonpositive overlaps, and sum durations.

For tag time, collect intervals from associated tasks, clip them, merge overlaps, and sum the merged intervals.

For daily time, use local day boundaries, clip intervals to each day, cap today at now, and include zero days.

## Activity History draft

Maintain original intervals, draft intervals, unsaved status, and validation issues separately. Draft changes do not mutate authoritative server-backed state until Save succeeds. Overlap issues identify all involved draft intervals.
