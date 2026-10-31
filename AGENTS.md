# Repository Instructions

## Project purpose

This repository contains a Full Stack Web Development course assignment: a React single-page application for tracking active time for arbitrary tasks. The frontend communicates with the unmodified teacher-provided REST server.

## Repository structure

```text
Final-Assignment/
|-- AGENTS.md
|-- PLANS.md
|-- Project-docs/
|-- harness/
|-- server/       # teacher-provided, read-only
`-- frontend/     # Vite project and submission root
```

`Project-docs/` owns requirements and specifications. `harness/` owns phase plans and observed verification evidence. `frontend/` owns the submitted application.

## Source precedence

1. Teacher course instructions.
2. Teacher server/API instructions.
3. `Project-docs/Agent-instructions/PROJECT_SPEC.md`.
4. The approved `harness/build/phase-*.md` file.
5. `PLANS.md`.
6. Existing implementation.
7. Agent assumptions.

Report material conflicts and request a human decision. Never present an assumption as a requirement.

## Required technology

- React single-page application created with Vite.
- Node.js 22.23.2 and npm 10.9.8.
- Current Firefox and Chrome support, with particular attention to Firefox.
- `npm install` followed by `npm run dev` must work without extra setup.
- Use JavaScript/JSX unless an approved plan explicitly changes this.
- All code, identifiers, comments, and documentation must be in English.

## Server boundary

Everything under `server/` is teacher-provided and read-only. Never modify, format, rename, move, delete, or add files under `server/`. Never solve frontend requirements by changing the backend. Do not delete or reinitialize `server/db_file.db` without explicit approval. Do not include the server, its database, or its dependencies in the frontend submission.

The frontend must work with the unmodified server at `http://127.0.0.1:3010`. Do not depend on example IDs, names, record counts, or ordering.

## API rules

- Centralize HTTP access under `frontend/src/api/`.
- Use `/tags`, `/tasks`, `/timestamps`, `/timesfortask/:taskId`, and `/options/1` only as documented.
- Do not replace API persistence with localStorage, IndexedDB, or mock data.
- Tasks store associated tags as comma-separated tag ID strings. Never store tag names in the task `tags` property.
- Timestamp type `0` means activation; type `1` means deactivation.
- Use only options record ID 1.
- Handle loading, empty, pending, success, and failure states visibly.
- Prevent duplicate mutations while a request is pending.

## Date and time rules

All API and UI timestamps are local wall-clock times. Do not convert them to UTC. Avoid `toISOString()` when it changes the intended local date or time.

Support at least second-level precision. Sort timestamp records before deriving status or intervals. An unmatched final activation is ongoing and has no known end time. Never count an active task beyond the current moment.

Task and tag calculations must clip intervals to observation ranges, split activity at local midnight, and handle ongoing activity. For tag totals, merge overlapping activity from tasks sharing the tag so overlap is counted once. Keep time calculations in pure, independently tested utility functions.

## Required views

1. Dashboard
2. Tasks
3. Activity History
4. Reports
5. Settings
6. About

Prioritize graded functionality over Dashboard enhancements.

## Core behavior

- Every visible task always shows its name, tag texts, and active/inactive state.
- Task/tag changes are persisted immediately after the user completes an operation.
- Activity History additions, edits, and deletions are staged locally and persisted only through explicit `Save Changes`.
- Multiple selected tag filters use AND semantics.
- In default mode, any number of tasks may be active.
- Entering alternative mode does not stop tasks immediately. Starting a task afterward stops every other active task and records all required timestamps.
- Task Summary, Tag Summary, Activity History, and Daily Chart use independent date ranges.
- About includes the author, usage guidance, and a visual-content origin/licensing statement.

## Accessibility and responsiveness

All functionality must be efficiently keyboard usable. Use semantic HTML, labels, visible focus, logical focus order, accessible control names, and correct dialog/menu focus behavior. Do not communicate status or errors using color alone. Meet WCAG AA contrast.

At exactly 500 CSS pixels wide, the application must remain convenient without page-level horizontal scrolling. Change layouts appropriately; do not merely scale them.

## Code organization

Prefer focused modules under `frontend/src/api`, `components`, `views`, `hooks`, `context`, `utils`, `styles`, and `test`. Avoid an oversized `App.jsx`, scattered fetch calls, duplicated calculations, premature abstractions, unused dependencies, dead code, and empty placeholder files.

React Context and custom hooks are sufficient unless a demonstrated need justifies another state library.

## Testing

Prioritize automated tests for normalization, filtering, timestamp sorting/pairing, ongoing intervals, range clipping, midnight splitting, task totals, tag-overlap merging, daily totals, and overlap detection.

Run relevant commands when available:

```text
npm test
npm run lint
npm run build
```

Only claim checks actually run. Record commands and observed results in `harness/build-log.md`.

## Phase workflow

Work on one approved phase at a time:

1. Read this file, the current phase file, and linked specifications.
2. Inspect the live repository and preserve unrelated user changes.
3. Summarize intended files and behavior before material writes.
4. Implement only the approved scope.
5. Run focused and broader verification.
6. Inspect the changed-file set.
7. Record evidence, failures, and limitations in the build log.
8. Stop before beginning the next phase.

Do not mark a phase complete merely because code was written.

## Approval boundaries

Explicit human approval is required before modifying the server, reinitializing its database, adding a major dependency, materially changing architecture or requirements, committing/pushing, deploying, accessing credentials, beginning a later phase, marking course modules implemented, or creating the final ZIP.

## Submission

The contents of `frontend/` form the submission. The ZIP must contain those contents directly at its root, not an extra `frontend/` directory.

Include `implemented.md`, package manifests, Vite configuration, `index.html`, source, and required assets. Exclude `server/`, `Project-docs/`, `harness/`, root planning files, `node_modules/`, `dist/`, `.git/`, database files, environment files, and unnecessary artifacts.

A feature is done only after behavior, API use, accessibility, responsive behavior, relevant tests, lint/build checks, browser checks, and evidence have been completed in proportion to its scope.
