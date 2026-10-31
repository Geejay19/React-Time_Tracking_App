# Submission Checklist

## Functional audit

- [ ] Every checked module is fully implemented; partial modules remain unchecked.
- [ ] Required data uses the supplied API on port 3010 and survives reload.
- [ ] The app works with non-example and empty data.
- [ ] No unexpected console errors remain.

## Required root content

- [ ] `implemented.md`
- [ ] `package.json` and `package-lock.json`
- [ ] `index.html` and `vite.config.js`
- [ ] `src/`, required assets, and required configuration

## `implemented.md`

- [ ] Official filename and original required field labels are preserved.
- [ ] Only fully verified modules use `[x]`.
- [ ] Estimated hours is one integer.
- [ ] Most difficult feature is answered.
- [ ] AI tools, purposes, and practical use are accurate.

## Clean-copy verification

- [ ] `npm install`, `npm run dev`, tests, lint, and build succeed as applicable.
- [ ] No undeclared dependency or environment file is required.
- [ ] Firefox, Chrome, keyboard-only use, 500 px, both themes, empty data, failures, and persistence are verified.

## Exclusions

- [ ] No `node_modules/`, `dist/`, `.git/`, server, database, Project-docs, harness, root planning files, `.env`, logs, temporary artifacts, or nested ZIPs.

## Archive structure

The ZIP contains project files directly, not an extra `frontend/` directory:

```text
submission.zip
|-- implemented.md
|-- package.json
|-- package-lock.json
|-- index.html
|-- vite.config.js
`-- src/
```

- [ ] Real ZIP format with `.zip`/`.ZIP` name and reasonable size.
- [ ] Extracted archive passes the clean-copy verification.
- [ ] No placeholders, false claims, credentials, or unnecessary content remain.
