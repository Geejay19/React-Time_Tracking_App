# Phase 00: Workspace and Frontend Foundation

## Status

Ready for human review

## Source inputs

- `AGENTS.md`
- `PLANS.md`
- `Project-docs/Project-instructions/course_assignment_instructions.md`
- `Project-docs/Agent-instructions/PROJECT_SPEC.md`
- `Project-docs/Agent-instructions/API_CONTRACT.md`
- `Project-docs/Agent-instructions/TESTING_CHECKLIST.md`
- `Project-docs/Project-instructions/implement.md`

## Objective

Create a clean React/Vite frontend foundation under `frontend/` that installs, runs, lints, tests, and builds with the course-required Node/npm versions, without implementing application features or modifying the teacher server.

## Current preconditions

- `frontend/` exists and contains the correctly named working copy `implemented.md`.
- All module boxes in `frontend/implemented.md` remain unchecked.
- `server/` exists and is read-only.
- Root planning/specification documents exist.
- An empty or unrelated `time-tracking-app/` directory exists and is outside this phase.

## In scope

- Verify `node --version` and `npm --version` against Node 22.23.2/npm 10.9.8.
- Generate a React JavaScript Vite project directly into `frontend/` without overwriting `implemented.md`.
- Install frontend dependencies and create `package-lock.json`.
- Retain the official Vite template's generated linting foundation and adapt it only as needed.
- Add Vitest, jsdom, React Testing Library, jest-dom, and user-event as development dependencies.
- Add scripts for development, build, lint, test, test watch, and preview.
- Add minimal test setup and one foundation smoke test.
- Replace Vite demo content with the smallest neutral application placeholder required for a valid build; do not implement the six-view shell.
- Establish global CSS variables/reset foundations sufficient for later accessible light/dark themes, without designing final screens.
- Create only directories that receive real files in this phase.
- Create a concise `frontend/README.md` with installation, server expectation, run, test, lint, and build commands.
- Verify install, test, lint, and production build.
- Record actual evidence in `harness/build-log.md`.

## Out of scope

- Navigation or final application shell.
- Dashboard, Tasks, Activity History, Reports, Settings, or About features.
- API requests or server-data models.
- Task/tag/timestamp/options behavior.
- Final visual design.
- Course module checkbox changes.
- Browser automation or complete accessibility audit.
- Server/database changes.
- Git commits, pushes, deployment, or submission packaging.
- Deletion or reuse of `time-tracking-app/`.

## Dependencies and proposed tooling

Required runtime:

```text
Node.js 22.23.2
npm 10.9.8
```

Application foundation:

- React
- React DOM
- Vite
- Oxlint (provided by the current official Vite React template)

Proposed test dependencies:

- Vitest
- jsdom
- `@testing-library/react`
- `@testing-library/jest-dom`
- `@testing-library/user-event`

Do not add routing, state-management, charting, date, icon, CSS-framework, or component-library dependencies in this phase.

## Expected files

Expected creation or update under `frontend/`:

```text
frontend/
|-- .gitignore
|-- README.md
|-- implemented.md        # preserve required structure and unchecked modules
|-- index.html
|-- package.json
|-- package-lock.json
|-- vite.config.js
|-- public/
`-- src/
    |-- App.jsx
    |-- main.jsx
    |-- styles/
    |   |-- variables.css
    |   `-- global.css
    `-- test/
        |-- setup.js
        `-- App.test.jsx
```

The current official template uses Oxlint and does not generate `eslint.config.js`. Preserve that verified foundation rather than adding a redundant second linter.

Outside `frontend/`, update only:

- `harness/build-log.md`
- `harness/context/phase-00-workspace-and-frontend-foundation-context.md` only if a material lasting decision/discovery occurs.
- `PLANS.md` phase status.

Never modify `server/`.

## Implementation procedure

### 1. Preflight

1. Inspect `frontend/` and preserve `implemented.md`.
2. Inspect working-tree state if a Git repository exists; otherwise record that Git evidence is unavailable.
3. Verify exact Node and npm versions.
4. If versions differ, report the mismatch before dependency installation. Continue only if the human accepts the risk or corrects the environment.

### 2. Generate Vite safely

Because `frontend/` is non-empty, do not run a generator that might overwrite `implemented.md` without first confirming behavior. Use a temporary workspace directory if necessary, then apply the generated foundation into `frontend/` while preserving the official template.

Use the React JavaScript template, not TypeScript.

### 3. Establish package scripts

The final manifest should provide:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "test": "vitest run",
    "test:watch": "vitest",
    "preview": "vite preview"
  }
}
```

Adapt to the generated manifest rather than overwriting dependency versions blindly.

### 4. Minimal foundation UI

Render a simple application root with a project placeholder and no course feature claims. Provide semantic structure and a smoke test proving the app renders.

Do not mark Module A merely because a placeholder renders; three navigable views belong to Phase 01.

### 5. CSS foundation

Define neutral variables for typography, spacing, colors, focus outline, borders, and content width. Ensure browser preference settings cannot make placeholder text invisible. Final theme implementation remains Phase 09.

### 6. Documentation

The frontend README records:

- Purpose.
- Required Node/npm versions.
- Teacher server expectation and port 3010.
- `npm install`.
- `npm run dev`.
- Test/lint/build commands.
- Statement that the server is separate and not included in the frontend project.

Do not copy the complete course instructions into the README.

## Decisions already made

- Submission/application root: `frontend/`.
- Framework: React with Vite.
- Language: JavaScript/JSX.
- Test runner: Vitest.
- Component testing: React Testing Library.
- Backend: teacher server at port 3010, kept separate and unmodified.
- Official working submission template: `frontend/implemented.md`.
- No product module is claimed in Phase 00.

## Decisions not needed in this phase

- Final application name.
- Author display name.
- Final visual branding.
- Task-order persistence representation.
- Chart implementation dependency.
- Routing library versus lightweight internal navigation (decide in Phase 01).

## Acceptance criteria

- [ ] Exact Node/npm versions are verified or any accepted mismatch is documented.
- [ ] `frontend/package.json` and lockfile exist.
- [ ] React/Vite application starts with `npm run dev` without requiring `.env`.
- [ ] `npm test` passes a meaningful foundation smoke test.
- [ ] `npm run lint` passes.
- [ ] `npm run build` passes and creates `frontend/dist/`.
- [ ] Generated `dist/` and `node_modules/` are ignored.
- [ ] `frontend/implemented.md` retains the teacher's headings/field labels, correct filename, and unchecked modules.
- [ ] No server file changed.
- [ ] No six-view/product functionality is falsely claimed.
- [ ] README commands match the actual package scripts.
- [ ] No unused demo assets or demo code remain.
- [ ] Actual commands and observed results are recorded in the build log.

## Verification commands

Run from `frontend/`:

```text
node --version
npm --version
npm install
npm test
npm run lint
npm run build
```

Start the development server for a bounded smoke check:

```text
npm run dev
```

Verify the reported local URL renders the placeholder, then stop the process.

## Manual verification

- Page renders without a blank screen.
- Document title is not the default Vite title.
- Placeholder is readable under light and dark browser preferences.
- Browser console has no unexpected error.
- No interaction suggests unimplemented course features already work.

## Evidence required

Record:

- Exact Node/npm versions.
- Dependencies and scripts created.
- Commands actually run with exit results.
- Smoke-test result.
- Files created/updated.
- Any version mismatch, warning, skipped check, or limitation.
- Confirmation that `server/` remained unchanged.

## Approval gate

Human approval is required before beginning Phase 00 because it installs dependencies and generates frontend project files.

## Stop condition

Stop after Phase 00 acceptance criteria and evidence are complete, or when a blocker requires human input. Do not begin Phase 01 automatically.
