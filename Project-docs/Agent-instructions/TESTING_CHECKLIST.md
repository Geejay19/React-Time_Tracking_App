# Testing Checklist

Only check observed results. Record commands and evidence in `harness/build-log.md`.

## Installation

- [ ] `npm install` succeeds in `frontend/`.
- [ ] `npm run dev`, `npm test`, `npm run lint`, and `npm run build` succeed.
- [ ] No `.env` file is required.
- [ ] The app connects to the unmodified server on port 3010.
- [ ] No unexpected browser-console errors occur.

## Startup data

- [ ] Tasks, tags, timestamps, and options load automatically.
- [ ] Every task appears once with name and tag texts.
- [ ] Status is correct after reload.
- [ ] Empty collections and API failures do not crash the app.
- [ ] Retry works where offered.

## Tasks and tags

- [ ] Create/delete tasks in arbitrary order.
- [ ] New tasks begin inactive.
- [ ] Edit a name of at least 40 characters.
- [ ] Create/reuse tags immediately.
- [ ] Add/remove individual tag associations.
- [ ] At least three tags per task and one tag across tasks work.
- [ ] Duplicate associations are prevented.
- [ ] Changes persist after reload; failures are visible.

## Filtering and rearrangement

- [ ] No filters shows all tasks.
- [ ] One and multiple filters work with AND semantics.
- [ ] Extra task tags do not prevent matches.
- [ ] Active filters and Clear Filters are obvious.
- [ ] No-results state is clear.
- [ ] Arbitrary ordering is possible with keyboard controls.

## Activity

- [ ] State is always visible without relying on color.
- [ ] Start stores type 0; stop stores type 1.
- [ ] Multiple tasks remain active in default mode.
- [ ] State survives reload and ongoing time continues.
- [ ] Stopping does not erase accumulated time.

## Calculation tests

- [ ] Tag-string parsing/serialization and timestamp sorting.
- [ ] Completed and ongoing interval pairing.
- [ ] Inside, outside, partially overlapping, and spanning ranges.
- [ ] One-second duration and future report end.
- [ ] Midnight crossing, zero day, and multiple daily intervals.
- [ ] Same-tag overlap merging and adjacent non-overlap.
- [ ] Every overlapping editable interval is identified.

## Reports

- [ ] Task and Tag ranges are independent and default midnight-to-now.
- [ ] Controls and displayed totals support seconds.
- [ ] Zero-activity entries are omitted.
- [ ] Active activity is capped at now.
- [ ] Tag overlap is counted once.
- [ ] Empty results are handled.
- [ ] Daily Chart range is independent, includes every day/zero day, numeric values/units, midnight splitting, and current-day capping.

## Activity History

- [ ] Range is independent and defaults midnight-to-now.
- [ ] Exactly overlapping intervals are chronological.
- [ ] Ongoing interval has no false end.
- [ ] Add/edit/delete are staged, not auto-saved.
- [ ] Save, Discard, unsaved indication, and failure behavior work.
- [ ] All overlapping intervals are identified.
- [ ] Valid explicit saves persist after reload.

## Settings

- [ ] Light/dark themes apply immediately and survive reload.
- [ ] Default/alternative modes survive reload through options ID 1.
- [ ] Entering alternative mode does not stop tasks immediately.
- [ ] Starting afterward stops all other active tasks and stores timestamps.
- [ ] Partial failures are visible; localStorage is not authoritative.

## About, accessibility, responsiveness

- [ ] About includes author, guidance, purpose, concepts, and content licensing/origin.
- [ ] All functionality works with keyboard only and visible logical focus.
- [ ] Forms, icons, dialogs, menus, statuses, and errors are accessible.
- [ ] WCAG AA contrast and readable font sizes are verified.
- [ ] At 500x800 there is no page-level horizontal scroll.
- [ ] 768x1024, 1280x720, and 1920x1080 use space sensibly.
- [ ] Current Firefox and Chrome are verified.
