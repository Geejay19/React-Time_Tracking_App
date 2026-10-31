# Application View Structure

## 1. Overview

The application will use a dashboard-style interface inspired by the provided reference image. The visual design does not need to copy the reference exactly, but it can use the same general ideas:

- A sidebar for primary navigation
- A clear page header
- A spacious main content area
- Cards with subtle borders
- A consistent accent color
- Clear status labels and primary action buttons
- A secondary panel for quick actions where useful
- A responsive layout that also works at 500 px width

The recommended application views are:

1. Dashboard
2. Tasks
3. Activity History
4. Reports
5. Settings
6. About

---

## 2. Main Navigation

The desktop application can use a fixed or collapsible sidebar:

```text
[Application Logo / Name]

Dashboard
Tasks
Activity History
Reports
Settings
About
```

Each navigation item should include both an icon and a text label. The current view should be clearly indicated.

At approximately 500 px width, the sidebar can collapse behind a menu button:

```text
[Menu] Application Name
```

Opening the menu should display the navigation options without permanently occupying the limited screen space.

---

# 3. Dashboard View

## Purpose

The Dashboard provides a quick overview of current activity and recent time usage. It acts as the main landing page and helps the user understand the current state of the application at a glance.

The Dashboard should show summaries rather than detailed management tools. Detailed task management should remain in the Tasks view, and detailed calculations should remain in the Reports view.

## Suggested Content

### Summary Cards

Possible summary cards include:

- Number of currently active tasks
- Total active time today
- Total number of tasks
- Most active tag today

Example:

```text
Active Now          Today's Time
2 tasks             4h 25m

Total Tasks         Most Used Tag
12 tasks            Study
```

### Currently Active Tasks

Show a compact list of tasks that are currently running:

```text
Currently Active

React Project       01:25:30    [Stop]
Reading             00:35:10    [Stop]
```

The displayed session duration should continue increasing while the task remains active.

### Recent Activity

Show a short list of recently recorded activities:

```text
Recent Activity

React Project       1h 20m
Exercise            45m
Reading             30m
```

### Small Daily Overview

A small chart can summarize today's time by task or tag. This chart should remain simple because the complete charting functionality belongs in the Reports view.

## Related Features

The Dashboard can provide quick access to:

- Current task activity status
- Starting and stopping active tasks
- Today's task active-time summary
- Today's tag active-time summary
- A small daily activity visualization

---

# 4. Tasks View

## Purpose

The Tasks view is the main working area of the application. It manages tasks, tags, filters, task ordering, and task activation.

This view can follow the reference image most closely by using a large task area and an optional right-side quick-action panel.

## Suggested Layout

```text
+------------------------------------------------------+
| Tasks                                [+ Add Task]    |
+------------------------------------------------------+
| Filters: [Study] [Work] [Health] [Clear]            |
+-------------------------------+----------------------+
|                               |                      |
| Task list                     | Quick Timer /        |
|                               | Selected Task Panel  |
|                               |                      |
+-------------------------------+----------------------+
```

## Task List

The main area can display tasks as cards or rows. Each task element should show:

- Task name
- Associated tags
- Active or inactive status
- Current session time or accumulated active time
- Start or Stop action
- Edit action
- Delete action
- Rearrangement control

Example active task:

```text
React Project

Tags: Study, Programming
Status: Active
Current session: 01:25:30

[Stop] [Edit] [Delete] [Move]
```

Example inactive task:

```text
Exercise

Tags: Health
Status: Inactive
Today: 45 minutes

[Start] [Edit] [Delete] [Move]
```

The active state must not be communicated using color alone. Use visible text, an icon, and styling together.

## Tag Filtering

The upper part of the Tasks view can contain the tag filters:

```text
Filter by tags:

[Study selected] [Programming selected] [Work] [Health]

[Clear filters]
```

When multiple tags are selected, display only the tasks containing all selected tags. A matching task may also contain additional unselected tags.

The interface should:

- Allow one or more tags to be selected
- Clearly show the active filters
- Allow all filters to be cleared easily
- Show every task when no filters are selected

## Quick Timer or Selected Task Panel

A right-side panel can show details and quick actions for the currently selected task.

Possible content includes:

- Selected task name
- Current active or inactive status
- Current session duration
- Total active time today
- Start or Stop button
- Recent activity intervals
- Manual interval entry action

On smaller screens, this panel should move below the task list or open as a drawer or dialog.

## Add and Edit Task Form

The task form should allow the user to:

- Enter or edit the task name
- Select existing tags
- Create a new tag
- Remove selected tags
- Confirm or cancel the action

Newly created tags should become available immediately without requiring a page refresh.

## Related Features

The Tasks view supports:

- Loading and displaying tasks and tags
- Adding and deleting tasks
- Editing task names
- Creating tags
- Adding and removing tags from tasks
- Reusing existing tags
- Filtering tasks using multiple tags
- Rearranging task elements
- Activating and deactivating tasks
- Showing active and inactive states

---

# 5. Activity History View

## Purpose

The Activity History view allows the user to inspect and correct previously recorded activity intervals.

This functionality should remain separate from the normal task list because editing historical timestamps is more advanced than starting or stopping a task.

## Selection Controls

The top section should allow the user to choose:

- A task
- A start date and time
- An end date and time

Example:

```text
Task:          [React Project]

Start:         [Date and time]
End:           [Date and time]

[Show Activity]
```

## Activity Interval List

Display the selected task's relevant intervals in chronological order.

Example:

```text
Date          Start       End         Duration       Status

20 Oct 2026   09:00       10:30       1h 30m         Valid
20 Oct 2026   14:00       15:15       1h 15m         Valid
21 Oct 2026   10:00       12:00       2h             Overlap
```

Each interval should provide:

- Start timestamp
- End timestamp
- Calculated duration
- Validation status
- Edit action
- Delete action

## Manual Interval Entry

Provide an Add Interval action. The form should contain:

- Selected task
- Start date and time
- End date and time
- Add and Cancel actions

## Interval Editing

The user should be able to:

- Add an activity interval
- Modify an interval's start time
- Modify an interval's end time
- Delete an interval
- Save changes through the API

Because an interval is represented by separate activation and deactivation timestamps, changing one interval may require updating both timestamp records.

## Validation and Overlap Warnings

The application should validate that:

- The end time occurs after the start time
- Date-time values are valid
- Intervals do not overlap incorrectly

Overlapping intervals should be highlighted visually and identified with text or an icon:

```text
Warning: Overlapping interval
```

Do not communicate the warning using color alone.

## Related Features

The Activity History view supports:

- Selecting a task and observation interval
- Listing activity intervals chronologically
- Adding activity intervals
- Editing start and end times
- Deleting activity intervals
- Saving interval changes through the API
- Detecting and highlighting overlaps

---

# 6. Reports View

## Purpose

The Reports view contains the application's time-analysis features.

Instead of creating a separate sidebar item for every report, the Reports view can use internal tabs:

```text
[Task Summary] [Tag Summary] [Daily Chart]
```

## 6.1 Task Summary Tab

Allow the user to select:

- Start date and time
- End date and time

The default observation interval should cover today from midnight until the current time.

Show:

- Each task with activity during the selected interval
- Task name
- Calculated active time
- Optional percentage of total recorded time

Example:

```text
Task Active-Time Summary

React Project       4h 25m
Reading             1h 30m
Exercise            45m
```

Tasks with zero activity during the selected period should not appear.

Calculations must:

- Count only activity overlapping the selected interval
- Use at least second-level precision
- Never count a currently active task beyond the current time

## 6.2 Tag Summary Tab

Allow the user to select a start and end date-time.

Show the active time for relevant tags:

```text
Study               5h 15m
Programming         4h 25m
Health              45m
```

When multiple tasks sharing the same tag are active at the same time, the overlapping period must be counted only once for that tag.

## 6.3 Daily Chart Tab

Allow the user to select:

- One task
- Start date
- End date

Show one bar for every day in the selected period:

```text
Active Time by Day

Mon    #######     3h 20m
Tue    ####        1h 45m
Wed    #########   4h 10m
Thu                0h
Fri    #####       2h 05m
```

If activity crosses midnight, divide the active time between the correct days.

Example:

```text
Activity: 23:30 to 01:30

Day 1: 23:30 to 00:00 = 30 minutes
Day 2: 00:00 to 01:30 = 1 hour 30 minutes
```

Days with no activity should still be represented correctly with a zero value.

## Related Features

The Reports view supports:

- Custom observation intervals
- Task active-time summaries
- Tag active-time summaries
- Second-level calculation precision
- Daily active-time bar charts
- Intervals crossing midnight
- Currently active tasks

---

# 7. Settings View

## Purpose

The Settings view manages application preferences. Settings should be loaded from and saved through the options record with ID 1.

## Appearance Section

Allow the user to select an application theme.

Example:

```text
Theme

( ) Light
( ) Dark
( ) System
```

The exact themes and visual styles can follow the application's design system.

## Activity Mode Section

Allow the user to choose between two modes:

```text
Activity Mode

( ) Default mode
    Multiple tasks can be active simultaneously.

( ) Alternative mode
    Only one task can be active at a time.
```

In alternative mode, starting a new task should stop the currently active task and create the required stop and start timestamps.

## Optional Display Preferences

Optional preferences could include:

- Compact or comfortable task-card density
- Preferred time display format
- Default report interval

Optional settings should not distract from the required theme and activity mode settings.

## Related Features

The Settings view supports:

- Theme selection
- Default activity mode
- Alternative activity mode
- Saving settings through the API
- Restoring settings when the application starts

---

# 8. About View

## Purpose

The About view provides general application information and basic usage guidance.

## Suggested Content

The view may include:

- Application name
- Application purpose
- Main features
- Instructions for starting and stopping tasks
- Explanation of tags
- Explanation of active time
- Technology information
- Application version
- Developer information, if appropriate

The About view can be a simple informational page without complex controls.

---

# 9. Responsive Design

The interface should work properly at a screen width of 500 px and should use additional space effectively on wider screens.

## Desktop Layout

The desktop layout can use:

- A visible sidebar
- A page header
- A large central content area
- An optional right-side action panel
- Multi-column cards and reports

## Narrow Layout

At approximately 500 px width:

- Collapse the sidebar into a menu
- Stack task controls when necessary
- Move the quick task panel below the main content or open it as a drawer
- Use a single-column form layout
- Ensure charts and interval lists remain usable
- Avoid unnecessary horizontal scrolling

---

# 10. Feature Distribution Summary

## Dashboard

- Overview information
- Currently active tasks
- Today's active time
- Recent activity
- Small summary chart

## Tasks

- Task management
- Tag management
- Tag filtering
- Task rearrangement
- Start and Stop controls
- Quick timer or selected-task panel

## Activity History

- Activity interval list
- Manual interval creation
- Interval editing
- Interval deletion
- Overlap detection

## Reports

- Task active-time summary
- Tag active-time summary
- Daily bar chart
- Time-range controls

## Settings

- Theme selection
- Default activity mode
- Alternative activity mode
- Persistent options

## About

- Application information
- Basic usage instructions
- Technical and version information

---

# 11. Final Recommended View Structure

```text
1. Dashboard
2. Tasks
3. Activity History
4. Reports
5. Settings
6. About
```

This structure provides a clear location for every major feature while keeping each view focused:

- Dashboard provides an overview.
- Tasks contains daily task and tag operations.
- Activity History handles advanced timestamp management.
- Reports contains calculations and visualizations.
- Settings contains persistent preferences.
- About contains application information and guidance.

The reference interface should be used as visual inspiration rather than copied directly. The final application can use its own branding, colors, components, spacing, and interaction patterns while preserving the clear dashboard-style organization.
