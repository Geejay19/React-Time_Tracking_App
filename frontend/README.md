# Activity Time Tracker

A React single-page application for the Full Stack Web Development course. It tracks active time for arbitrary tasks through the separate teacher-provided REST server.

## Features

- Task and tag creation, editing, filtering, ordering, and deletion
- Simultaneous or one-task-at-a-time activity tracking
- Task and tag active-time summaries
- Explicitly saved historical interval corrections
- Daily activity bar chart
- Persistent light/dark theme and activity-mode settings
- Keyboard-accessible responsive interface for 500 px and wider screens

## Requirements

- Node.js 22.23.2
- npm 10.9.8
- Teacher server running at `http://127.0.0.1:3010`

The teacher server is separate from this frontend and is not included in the frontend project or submission.

## Install

```text
npm install
```

## Development

```text
npm run dev
```

No environment file is required for the course configuration.

## Verification

```text
npm test
npm run lint
npm run build
```

Use `npm run test:watch` during development and `npm run preview` to inspect a production build locally.

## Usage

1. Start the teacher server on port 3010.
2. Start this frontend with `npm run dev`.
3. Create or edit tasks in Tasks, then use Start and Stop to record activity.
4. Use Activity History for explicit interval corrections and Reports for summaries.
