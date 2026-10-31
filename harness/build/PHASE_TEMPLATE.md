# Phase XX: Phase title

## Status

Not started

## Source inputs

- `AGENTS.md`
- `PLANS.md`
- `Project-docs/Agent-instructions/PROJECT_SPEC.md`
- Add phase-specific sources.

## Objective

Describe the observable outcome.

## In scope

- Approved behavior.

## Out of scope

- Later phases and unrelated work.

## Dependencies

- Required completed phases and tooling/server state.

## Expected files

- List files expected to be created or modified.

Never modify `server/`.

## Decisions requiring human input

None currently identified. Stop for any material unapproved decision.

## Approach

1. Read-only inspection.
2. Add/update focused tests where applicable.
3. Implement minimum approved behavior.
4. Refactor only within scope.
5. Run focused verification, lint, and build.
6. Record observed evidence.
7. Stop after this phase.

## Acceptance criteria

- [ ] Observable criterion.
- [ ] Relevant loading/error, keyboard, and 500 px behavior works.
- [ ] Focused tests, lint, and build pass as applicable.
- [ ] No unexpected console errors appear.

## Verification

Run from `frontend/` when available:

```text
npm test
npm run lint
npm run build
```

Record files changed, commands/results, manual checks, failures/skips, and limitations.

## Stop condition

Stop when all criteria pass with evidence, or a blocker needs human input. Do not begin the next phase.
