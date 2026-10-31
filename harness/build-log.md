# Build Log

## Purpose

This file records implementation progress and observed evidence. Plans belong in `PLANS.md` and phase files. Never claim a command or behavior passed unless actually tested.

## Project status

Current phase: Complete  
Last completed phase: Phase 12  
Known blocker: None

---

### 2026-10-31 — Final Compliance Fix and Submission Verification

**Status**: Complete

#### Final requirement fix

- Ongoing intervals are now included in Activity History overlap comparisons.
- Every involved ongoing/manual interval is identified.
- Added a regression test for the exact Module N edge case.

#### Final source verification

- `npm test`: 2 files, 8 tests passed.
- `npm run lint`: passed.
- `npm run build`: passed.

#### Submission archive

- Created `Activity-Time-Tracker-Submission.zip` from an explicit frontend allowlist.
- ZIP size: 36,296 bytes at creation.
- Confirmed project files exist directly at archive root.
- Confirmed no `node_modules`, `dist`, `.git`, server, or database content exists in the archive.
- Extracted the archive into a clean temporary directory.
- Extracted `npm ci`: 103 packages installed; 0 reported vulnerabilities.
- Extracted tests: 8 passed.
- Extracted lint: passed.
- Extracted production build: passed.

---

### 2026-10-31 — Phases 01–11: Complete Application

**Status**: Complete; submission audit awaits human confirmation

#### Scope completed

- Six-view responsive SPA shell and accessible navigation.
- Real API startup loading, normalization, task/tag CRUD, filtering, ordering, and timestamp-backed activation.
- Task/tag reports, local-time calculation utilities, Activity History drafts/explicit save, and daily chart.
- API-persisted theme and alternative mode, dashboard, About, loading/empty/error states, and responsive styling.

#### Verification evidence

- Node.js `v22.23.2`; npm `10.9.8`.
- `npm test`: 2 files and 7 tests passed.
- `npm run lint`: Oxlint exit code 0.
- `npm run build`: Vite 8.3.5 built 19 modules successfully.
- Local frontend HTTP response: 200.
- Real API startup: 5 tasks, 5 tags, 13 timestamps, options ID 1.
- Temporary integration records: tag/task created, task updated, two timestamps created/read, then all temporary records deleted.
- Teacher server source code and API behavior were not modified. `npm install` refreshed the server lockfile timestamp while installing its declared dependencies; the entire server remains excluded from submission.

#### Important review notes

- The provisional About author is `Geeth`; the human must correct it if necessary.
- Estimated hours in `implemented.md` is provisionally `3`; the human must replace it with their honest total if different.
- The teacher server dependency installation reported 4 vulnerabilities. No audit fix was applied because modifying teacher-provided dependencies is outside scope.
- Full Firefox/Chrome keyboard and browser accessibility-tool inspection should be performed by the human before packaging.
- No final ZIP was created.

---

### 2026-10-31 — Requirements Audit and Interface Refinement

**Status**: Complete

#### Audit performed

- Compared the implementation against every requirement module A–R.
- Inspected Dashboard, Tasks, Activity History, Reports, and Settings in the running browser.
- Inspected the responsive navigation and Tasks view at exactly 500 px.
- Rechecked the desktop layout at 1440 × 900.
- Checked captured browser warning/error logs; none were present.

#### Corrections and refinements

- Corrected undersized Dashboard panels so both columns use available desktop width.
- Changed new History intervals to appear within the selected observation range.
- Allowed explicitly closing an ongoing interval by entering an end time.
- Prevented accidental task switching while History drafts are unsaved.
- Added Escape handling for mobile navigation.
- Added modal focus containment and focus restoration.
- Added `Project-docs/Agent-instructions/REQUIREMENTS_AUDIT.md` with A–R traceability.

#### Verification

- `npm test`: 2 files, 7 tests passed.
- `npm run lint`: passed.
- `npm run build`: passed; 19 modules transformed.
- Exact 500 px visual inspection: no page-level horizontal scrolling observed.
- Desktop visual inspection: corrected Dashboard panels use their columns.
- Browser console: no captured warnings or errors.

#### Remaining human-owned submission items

- Confirm the exact author name and honest total working hours.
- Perform the final Firefox/Chrome keyboard and browser accessibility-tool pass.
- Package and extract-test the final ZIP.

---

### 2026-10-31 — Phase 00: Workspace and Frontend Foundation

**Status**: Complete

#### Scope completed

- Verified the exact course Node.js and npm versions.
- Generated the official React JavaScript Vite foundation under `frontend/` while preserving `implemented.md`.
- Replaced demo content/assets with a neutral semantic foundation screen.
- Added global CSS variables, preference-safe colors, and visible focus styling.
- Added Vitest, jsdom, React Testing Library, jest-dom, and user-event.
- Added test/watch scripts, test setup, rendering smoke test, Vite configuration, and frontend README.
- Preserved all course module checkboxes as unchecked.

#### Files changed

- Frontend manifests, lockfile, Vite configuration, README, source foundation, styles, and test setup under `frontend/`.
- `PLANS.md`
- `harness/build/phase-00-workspace-and-frontend-foundation.md`
- `harness/context/phase-00-workspace-and-frontend-foundation-context.md`

#### Material decisions or discoveries

- The current official Vite React template uses Oxlint rather than ESLint. The verified generated linter was retained.
- `frontend/` is the application/submission root. `time-tracking-app/` remains untouched and unused.

#### Commands and observed results

```text
node --version
```

Observed: `v22.23.2`.

```text
npm --version
```

Observed: `10.9.8`.

```text
npm install --save-dev vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

Observed: 103 packages installed, 0 reported vulnerabilities.

```text
npm test
```

Observed: 1 test file and 1 test passed with Vitest 5.0.5.

```text
npm run lint
```

Observed: Oxlint completed with exit code 0.

```text
npm run build
```

Observed: Vite 8.3.5 built 16 modules successfully.

```text
npm run dev -- --host 127.0.0.1
```

Observed: Vite became ready and a local HTTP smoke request returned status 200 with the expected document title and root element.

#### Manual verification

- Bounded localhost response check confirmed the expected HTML title and React root.
- Component rendering was verified through jsdom/React Testing Library.
- Full visual browser and console inspection remains part of Phase 01 and the Phase 11 audit.

#### Acceptance criteria

- [x] Required Node/npm versions verified.
- [x] Package manifest and lockfile exist.
- [x] Development server works without `.env`.
- [x] Tests, lint, and production build pass.
- [x] Generated artifacts are ignored.
- [x] `implemented.md` retains required structure and unchecked modules.
- [x] No server file was modified.
- [x] README matches the package scripts.
- [x] Vite demo code and assets were removed.

#### Failures or skipped checks

- The first scaffold invocation produced the wrong vanilla TypeScript template; it was inspected, rejected, and its temporary output was safely removed before any merge.
- The in-app browser could not reach the sandboxed localhost server. A same-context HTTP smoke check succeeded instead.
- Git diff/status evidence was unavailable because this directory is not currently a Git repository.

#### Remaining work and handoff

- Phase 01 must implement the accessible responsive application shell and navigation.
- Final application name and author display name remain human decisions for later phases.

---

## Entry template

### YYYY-MM-DD — Phase XX: Title

**Status**: Not started / In progress / Blocked / Ready for review / Complete

#### Scope completed

- Describe implemented work.

#### Files changed

- `path/to/file`

#### Material decisions or discoveries

- Record only information affecting later work.

#### Commands and observed results

```text
command
```

Observed result:

```text
actual result
```

#### Manual verification

- Browser/viewport:
- Behavior:
- Observed result:

#### Acceptance criteria

- [ ] Criterion

#### Failures or skipped checks

- State the check and reason.

#### Remaining work and handoff

- State what remains and what the next phase needs.

---
