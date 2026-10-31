# Project Implementation Plan

## Purpose

This roadmap sequences implementation of the React task activity tracker. Detailed requirements live in `Project-docs/Agent-instructions/PROJECT_SPEC.md`; repository rules live in `AGENTS.md`; each phase is governed by its approved file under `harness/build/`.

## Status

| Phase | Description | Status |
|---|---|---|
| 00 | Workspace and frontend foundation | Complete |
| 01 | Application shell and navigation | Complete |
| 02 | API client and startup data | Complete |
| 03 | Task and tag management | Complete |
| 04 | Activation and current status | Complete |
| 05 | Filtering and rearrangement | Complete |
| 06 | Task and tag reports | Complete |
| 07 | Activity History and explicit saving | Complete |
| 08 | Daily activity chart | Complete |
| 09 | Settings and alternative mode | Complete |
| 10 | Dashboard | Complete |
| 11 | Accessibility and responsive verification | Complete |
| 12 | Submission audit | Complete |

Allowed statuses: Not started, In progress, Blocked, Ready for review, Complete. A phase becomes Complete only after its acceptance criteria and verification evidence are satisfied.

## Phase outcomes

### 00 — Workspace and frontend foundation

Create the Vite React project under `frontend/`, establish package scripts, linting, testing, global styling foundations, initial directories, and retain the official `implemented.md` with all modules unchecked.

### 01 — Application shell and navigation

Implement the accessible responsive shell, six navigable views, mobile menu, and required About information. Targets A, B, and foundations of Q/R.

### 02 — API client and startup data

Implement centralized API access, normalization, concurrent startup loading of tasks/tags/timestamps/options, relationships, status derivation, and loading/empty/error states. Targets C and foundations for J–P.

### 03 — Task and tag management

Implement task create/delete/rename, tag creation and reuse, per-task tag association changes, immediate API persistence, and failure handling. Targets D, E, F, H.

### 04 — Activation and current status

Implement persisted start/stop timestamps, multiple active tasks, ongoing time, and status restoration after reload. Targets J.

### 05 — Filtering and rearrangement

Implement visible multi-tag AND filters, clearing, empty results, arbitrary accessible rearrangement, and approved order persistence if selected. Targets G and I.

### 06 — Task and tag reports

Implement independent second-precision task/tag ranges, interval clipping, ongoing activity, relevant-only lists, and tag overlap deduplication. Targets K and L.

### 07 — Activity History and explicit saving

Implement independent details range, chronological interval listing, ongoing presentation, draft add/edit/delete, Save/Discard, unsaved indication, overlap identification, and timestamp persistence. Targets M and N.

### 08 — Daily activity chart

Implement independent whole-day range, task selection, one accessible bar/value per day, zero days, midnight splitting, and current-day capping. Targets O.

### 09 — Settings and alternative mode

Implement immediate/persisted theme and mode settings using `/options/1`, plus stopping all other active tasks when starting one in alternative mode. Targets P.

### 10 — Dashboard

Implement overview cards, active tasks, recent activity, and optional small visualization by reusing tested report calculations.

### 11 — Accessibility and responsive verification

Audit keyboard operation, focus, labels, contrast, 500 px layout, wider layouts, Firefox, Chrome, console output, and remediation. Completes Q/R.

### 12 — Submission audit

Verify module claims, `implemented.md`, AI disclosure, clean installation, tests/build, archive content, and correct ZIP root structure.

## Dependency order

Phase 00 precedes 01 and 02. Startup data precedes mutation and time features. Activation precedes reports, history, and alternative mode. Required grading features precede Dashboard polish. Accessibility is considered in every phase and audited again in Phase 11. Phase 12 is last.

## Architectural direction

Use React function components, hooks, centralized API modules, pure calculation utilities, focused components, minimal shared state, CSS variables, and automated calculation tests. Do not add Redux, a large UI framework, deployment infrastructure, authentication, or backend code without explicit approval.

## Human gates

Approval is required before each implementation phase, major dependencies, material architectural changes, server database reset, module markings, or submission packaging.
