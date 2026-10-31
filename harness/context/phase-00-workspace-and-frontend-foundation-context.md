# Phase 00 Context

## Verified tooling

- Node.js 22.23.2 and npm 10.9.8 match the course requirements exactly.
- The official React JavaScript Vite template generated React 19.2.x, Vite 8.3.x, and Oxlint.
- The current template uses Oxlint instead of the older ESLint-based foundation and does not generate `eslint.config.js`. The project retained the official template's `npm run lint` workflow rather than adding a redundant linter.

## Testing decision

Vitest with jsdom and React Testing Library is the approved frontend test foundation. The package provides `test` and `test:watch` scripts.

## Submission template

The teacher's source file remains at `Project-docs/Project-instructions/implement.md`. The required working submission copy is `frontend/implemented.md`; all module boxes remained unchecked in Phase 00.

## Workspace note

The existing `time-tracking-app/` directory was outside Phase 00 and remained untouched. The application/submission root is `frontend/`.
