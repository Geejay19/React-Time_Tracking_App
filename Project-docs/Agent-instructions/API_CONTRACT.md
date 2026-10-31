# Frontend API Contract

## Base URL

`http://127.0.0.1:3010`

The evaluated frontend must use port 3010 without requiring an environment file. An optional override may exist, but this remains the default.

## General rules

Use JSON and `Content-Type: application/json` where required. Do not depend on fixed example data or replace persistence. Centralize errors with operation, endpoint, HTTP status when available, and a safe message.

## Tags

- `GET /tags` — all tags
- `GET /tags/:id` — one tag
- `POST /tags` — create `{ "name": "Study", "additional_data": "" }`
- `PUT /tags/:id` — replace
- `PATCH /tags/:id` — partial update
- `DELETE /tags/:id` — delete

The server does not remove a deleted tag ID from tasks automatically. Do not implement global tag deletion without safely updating all affected tasks.

## Tasks

- `GET /tasks`
- `GET /tasks/:id`
- `POST /tasks`
- `PUT /tasks/:id`
- `PATCH /tasks/:id`
- `DELETE /tasks/:id`

Example request data:

```json
{ "name": "React project", "tags": "1,2,3", "additional_data": "" }
```

`tags` is a comma-separated string of tag IDs.

## Timestamps

- `GET /timestamps`
- `GET /timestamps/:id`
- `GET /timesfortask/:taskId`
- `GET /timesfortask/:taskId/0`
- `GET /timesfortask/:taskId/1`
- `POST /timestamps`
- `PUT /timestamps/:id`
- `PATCH /timestamps/:id`
- `DELETE /timestamps/:id`

Example request data:

```json
{ "timestamp": "2026-10-31 14:58:09.000", "task": 2, "type": 0 }
```

Type 0 is activation; type 1 is deactivation.

## Options

Use only ID 1:

- `GET /options/1`
- `PUT /options/1`
- `PATCH /options/1`

Example:

```json
{ "theme": "dark", "alternative": 0, "own_textual_data": "" }
```

`alternative: 0` is default mode; `alternative: 1` is alternative mode.

## Normalization

Normalize a server task such as `{ id, name, tags: "1,2,7", additional_data }` to `{ id, name, tagIds: [1,2,7], additionalData }`. Treat an empty tags string as an empty array. Serialize with `tagIds.join(",")`. Resolve displayed tag texts from the separate tag collection.

## Date-time representation

Use local `YYYY-MM-DD HH:mm:ss.SSS` values. Do not convert to UTC or send `Z` timestamps unless later verified documentation explicitly requires it.

## Startup

Load tasks, tags, timestamps, and options ID 1. Independent requests may run concurrently. Do not declare the app ready until relationships and activity states are derived.
