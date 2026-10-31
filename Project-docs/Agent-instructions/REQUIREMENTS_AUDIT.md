# Requirements Alignment Audit

Audit date: 2026-10-31

## Overall result

The implemented frontend covers the functional scope of Modules A–R and uses the documented teacher API. Automated tests, lint, build, real API CRUD integration, desktop visual inspection, and exact 500 px responsive inspection pass.

Module A's final submission/ZIP conditions cannot be completed until packaging. The human author must also confirm the author name and honest working-hour estimate before submission.

## Module mapping

| Module | Requirement | Implementation evidence | Status |
|---|---|---|---|
| A | Proper submission, `implemented.md`, three navigable views | Six navigable views; official working `implemented.md`; submission checklist | Application aligned; ZIP pending |
| B | About/Info with author, guidance, and content licensing/origin | About view contains all three categories | Aligned; confirm author name |
| C | Load tasks/tags from server and show one React task element each | Parallel API startup loading, normalization, visible names/tag texts | Aligned |
| D | Add/remove task elements without reload | Task dialog and per-card deletion with immediate state update | Aligned |
| E | Edit names; create/add/remove tags independently | Task editor and reusable tag selector | Aligned |
| F | Persist task/tag changes through API automatically | POST/PUT/DELETE API layer called when operations complete | Aligned |
| G | Multi-tag AND filtering, visible filters, clear action | Tag filter chips, AND predicate, clear/no-results state | Aligned |
| H | Reuse existing and newly created tags | Existing checkbox list; created tags added immediately | Aligned |
| I | Arbitrarily rearrange task elements | Keyboard-operable up/down controls | Aligned |
| J | Visible state, start/stop timestamps, reload status, simultaneous tasks | Timestamp-backed Start/Stop, status derivation, default-mode independence | Aligned |
| K | Independent task summary range, relevant tasks, second precision, current cap | Task Summary tab and tested range clipping | Aligned |
| L | Independent tag summary and overlap counted once | Tag Summary tab and tested interval merging | Aligned |
| M | Independent task details range, exact overlaps, chronology, ongoing end omitted | Activity History derivation and Ongoing presentation | Aligned |
| N | Draft add/delete/edit, explicit save, API persistence, overlap highlighting | Draft History state, Save/Discard, timestamp CRUD, all-overlap detection | Aligned |
| O | Independent whole-day task chart, one bar/value per day | Daily Chart tab, zero days, midnight split, current cap | Aligned |
| P | Immediate persistent theme/mode; alternative mode stops all others on next start | Settings `/options/1`, theme state, multi-stop activation flow | Aligned |
| Q | Responsive at 500 px without horizontal scrolling and sensible wide layout | Exact 500 px browser inspection and responsive CSS; wide dashboard/task layouts | Aligned |
| R | Keyboard use, suitable fonts, WCAG AA contrast | Semantic controls, focus styles, skip link, modal focus containment, non-color cues, contrast palette | Aligned; final browser a11y audit advisable |

## API and data alignment

- Base URL defaults to `http://127.0.0.1:3010` without requiring `.env`.
- Tasks serialize tag associations as comma-separated tag IDs.
- Tags remain separate API resources.
- Timestamp type 0 activates and type 1 deactivates.
- Options use only ID 1.
- Timestamp formatting remains local and does not use UTC conversion.
- Temporary real-server CRUD integration was completed and cleaned up.

## Calculation coverage

Automated tests cover:

- Local wall-clock formatting.
- Timestamp sorting/pairing and active-state derivation.
- Observation-range clipping.
- Same-tag overlap deduplication.
- Midnight splitting and zero days.
- Identification of every overlapping editable interval.

## Refinements made during audit

- Expanded Dashboard activity/recent panels to use their grid columns correctly.
- Ensured newly added History intervals appear inside the selected range.
- Allowed an ongoing interval to receive a deliberate end timestamp during explicit correction.
- Prevented task switching while unsaved History edits exist.
- Added Escape handling for the mobile menu.
- Added modal focus containment and restoration.

## Human pre-submission checks

1. Confirm `Geeth` is the exact author name to show.
2. Replace the provisional `3` working hours with the honest total if different.
3. Perform a final keyboard-only pass in Firefox and Chrome.
4. Run browser accessibility/contrast tools.
5. Create the ZIP from the contents of `frontend/`, excluding `node_modules/` and `dist/`.
6. Extract the ZIP and repeat clean install/build verification.
