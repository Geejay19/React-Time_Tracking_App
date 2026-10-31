# Project Specification

## Product summary

The product is a React single-page activity tracker. Users manage arbitrary tasks and tags, start and stop task activity, inspect and correct recorded intervals, view task/tag summaries and a daily chart, and configure theme and activity mode. The frontend communicates with the teacher-provided REST server.

## Goals

- Persist required data through the supplied API and restore state after reload.
- Calculate task and tag active time correctly with local-time and second-level precision.
- Work in current Firefox and Chrome.
- Remain convenient without page-level horizontal scrolling at 500 px.
- Support efficient keyboard-only use and WCAG AA contrast.
- Fulfil every individual requirement of each module claimed in `implemented.md`.

## Non-goals

Backend changes, authentication, user accounts, cloud deployment, replacement persistence, UTC conversion, and unsupported API features are out of scope. Global tag deletion is excluded unless separately approved and safely handles task references.

## Views

The six navigable views are Dashboard, Tasks, Activity History, Reports, Settings, and About. Only one is primary page content at a time. Navigation identifies the current view, supports keyboard use, uses a sidebar on wide screens, and an accessible collapsible menu on narrow screens.

## Dashboard

Dashboard is an overview and may show active-task count, today's total, total task count, most active tag, active tasks, recent activity, and a small chart. It reuses tested report calculations and has lower priority than graded functionality.

## Tasks

Every visible task always shows its name, associated tag texts, active/inactive state, Start/Stop, Edit, Delete, and rearrangement actions. State is not communicated using color alone.

Users can create/delete tasks, edit any task name, create tags, reuse existing tags, add/remove individual tags on individual tasks, activate/deactivate tasks, and rearrange task elements. New tasks start inactive. Names of at least 40 characters and at least three tags per task are supported.

Multiple tag filters use AND semantics: a task matches when it contains every selected tag, regardless of extra tags. Active filters are visible; Clear Filters restores all tasks; no-results state is explained.

Completed task/tag operations persist immediately through the API and update without reload.

## Activity state

Starting creates a type-0 timestamp; stopping creates type 1. In default mode, unlimited tasks may be active and changing one does not affect others. Status is derived from server timestamps and survives reload. An unmatched final activation remains active and accumulates while the frontend is closed.

## Activity History

Users select a task and an independent second-precision start/end range, defaulting to local midnight through now. List exactly the activity intervals overlapping the range in chronological order. Completed intervals show start, end, and duration. Ongoing intervals show start and `Ongoing`, never a false end.

Users may stage new intervals, start/end edits, and deletions. These changes are not automatically persisted. Provide Save Changes, Discard Changes, unsaved indication, pending state, and failure feedback. Every interval involved in an overlap is identified with text/icon plus styling.

## Reports

Reports has Task Summary, Tag Summary, and Daily Chart sections with independent ranges.

Task Summary defaults to local midnight through now and lists only tasks with overlapping activity, showing name and second-precision active time. Active tasks never count beyond now.

Tag Summary uses its own range and lists only relevant tag texts/totals. Overlapping activity from tasks sharing a tag is counted once.

Daily Chart selects one task and an independent inclusive range of local dates. Show one bar and clearly associated numeric value/unit for every day, including zero days. Split activity at midnight and cap the current day at now.

## Settings

Load/save only `/options/1`. Support at least light/dark themes and default/alternative modes. Changes apply immediately and survive reload; localStorage is not authoritative.

Entering alternative mode stops nothing immediately. Starting an inactive task afterward deactivates all other active tasks by storing their type-1 timestamps, then stores the selected task's type-0 timestamp. Partial failures are visible and state is not falsely reported as fully successful.

## About

Include application name/purpose, author, short usage guidance (or an explicit intuitive-use statement), explanation of tasks/tags/active time, technology information, and a mandatory visual-content origin/licensing statement. No final placeholder author is allowed.

## States and errors

Provide initial loading, empty collections, API failure/retry where meaningful, pending/success/failure mutations, no filtered tasks, no report activity, and unsaved History states. Prevent duplicate requests. Expected failures must not cause blank screens or uncaught UI errors.

## Responsive design and accessibility

At 500 px, collapse navigation, stack forms as needed, transform wide tables into cards or another narrow layout, reposition secondary panels, and keep charts/controls usable without page-level horizontal scrolling. Wider screens use available space sensibly.

All features work with keyboard only. Use semantic landmarks, proper labels, accessible names, visible focus, logical order, overlay focus management, Escape behavior where appropriate, readable fonts, WCAG AA contrast, and non-color status/error cues.

## Local time

All API/UI timestamps are local wall-clock values with at least second precision. Never convert to UTC. Correctly clip intervals to report ranges, split at local midnight, handle ongoing activity, future range ends, zero days, and overlapping same-tag activity.

## Completion

A module may be checked only after all its requirements are implemented and verified. Partial implementation is insufficient.
