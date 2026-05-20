# Feature Update: Project Active / Completed Workflow

Goal
- Add an "Active / Completed" status to projects.
- When HR adds a new project it should appear in the Productivity Tracker as `Active` by default.
- Users can mark a project as `Completed` from the Productivity Tracker UI.
- Completed projects should remain visible (with a Completed badge) but should not be available for employee login or selection where a project is required for login.
- The UI should clearly show who marked the project as completed and when.

Suggested UI changes

1. Admin / HR (`admin.html`)
- When HR adds a project, store it with a `status` field set to `active` (default).
- Project object example stored in client/local list:
  {
    "name": "Project Name",
    "status": "active", // active | completed
    "createdBy": "hr@example.com",
    "createdAt": "2026-05-19T12:34:56Z"
  }
- Expose a small toggle or select when creating/editing a project to override the default.

2. Productivity Tracker (`productivity-tracker.html`)
- Show each project with a status badge: `Active` (green) or `Completed` (gray).
- Add an action (for users with permission) to mark a project `Completed`.
- When marking Completed, store the following metadata on the project:
  - `status: 'completed'`
  - `completedBy: '<user-email-or-id>'`
  - `completedAt: '<ISO timestamp>'`
- Completed projects remain visible but are visually de-emphasized and removed from any selection lists used for login or assigning active work.
- Display small text like: "Completed by Alice (alice@example.com) — 2026-05-19" on the project card or a tooltip.

Backend / Data handling suggestions

- Google Apps Script (`code.gs`) data model change:
  - Projects sheet: add `status`, `createdBy`, `createdAt`, `completedBy`, `completedAt` columns.
  - When admin adds a project via `callAPI('addProject', {...})`, include status fields.
  - When a user marks complete, call a new API `callAPI('completeProject', { name, completedBy, completedAt })` to persist.

Client-side persistence

- Keep `projectList` as an array of project objects, not simple strings.
- Update all dropdowns and multi-select components to filter out `status==='completed'` when used for login or active assignment.
- Where lists show projects for browsing or reporting, include completed ones but show their badge.

Security & Permissions

- Only HR and authorized users should be able to create projects and change status. If marking by regular user is allowed, ensure a confirmation step and optionally require manager approval.

UI Example (pseudo HTML snippet)

- Project card:
  <div class="proj-card">
    <div class="proj-title">Project Name</div>
    <div class="proj-badge proj-active">Active</div>
    <div class="proj-meta">Created by HR — May 19, 2026</div>
    <button class="mark-complete">Mark Completed</button>
  </div>

- Completed display:
  <div class="proj-card proj-completed">
    <div class="proj-title">Project Name</div>
    <div class="proj-badge proj-completed">Completed</div>
    <div class="proj-meta">Completed by Alice — May 19, 2026</div>
  </div>

Next steps I can take for you (choose one):
- I can update the documentation file `APPLICATION_WORKFLOW.md` to include this feature text and regenerate `APPLICATION_WORKFLOW.docx`.
- I can implement the client-side changes in `admin.html` and `productivity-tracker.html` (UI + JS) and test them locally.
- I can add the required `code.gs` Apps Script API signatures and examples for persisting project status.

Tell me which option you'd like me to perform next.