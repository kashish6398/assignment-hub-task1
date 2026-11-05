# Assignment Hub
### Assignment & Review Dashboard

A responsive, role-based coursework management platform built with React, Vite, and Tailwind CSS. The application facilitates clear academic workflows between **Students** and **Professors (Admins)** with user-specific data isolation, targeted assignment allocation, a two-step submission confirmation process, and real-time completion progress tracking.

---

## 🌟 Key Features

### 1. Simple Mock Login & Instant Role Switching
- **Split-Screen Role Selection Portal:** Welcome page allowing one-click login for either **Student** or **Admin (Professor)**.
- **Seven Seeded Demo Accounts:**
  - **2 Admins:** `Professor Sharma` (Computer Science), `Professor Mehta` (Software Engineering)
  - **5 Students:** `Kashish Gupta` (Default Student), `Aarav Patel`, `Vikram Singh`, `Riya Sharma`, `Ananya Verma`
- **Instant TopHeader Persona Switcher:** Switch between any of the 7 accounts on the fly without logging out, making testing seamless.

### 2. Student Experience
- **Dedicated Dashboard:**
  - Personal greeting banner (`Hello, Kashish Gupta! 👋`).
  - 4-column metric row: `Total Assigned`, `Submitted`, `Pending`, and `Overdue` counts.
  - Circular SVG radial progress ring displaying personal completion rate (e.g. `3 of 5 submitted • 60%`).
  - Compact preview of pending/upcoming coursework with quick "Submit" action.
- **Separate "My Assignments" Page:**
  - Full list of assignments allocated to the active student.
  - Search by assignment title, subject, or description.
  - Status filter dropdown (`All`, `Submitted`, `Pending`, `Overdue`).
  - Due-date sorting (`Soonest First`, `Latest First`, `A to Z`).
  - External Google Drive submission links.
  - Two-step submission confirmation workflow.
- **Two-Step Submission Confirmation:**
  - **Step 1:** Verifies external Google Drive upload link and asks student to confirm: *"Yes, I have submitted my work to Google Drive"*.
  - **Step 2:** Final confirmation dialog asking the student to finalize submission for grading.
  - Updates status immediately to `Submitted`, saves timestamp, logs activity, and recalculates progress indicators.

### 3. Admin (Professor) Experience
- **Strict Data Isolation:**
  - Each Admin sees **only the assignments they created**.
  - Coursework created by `Professor Sharma` is isolated from `Professor Mehta`.
- **Assignment Management (CRUD):**
  - **Create:** Publish new assignments with Title, Course Code, Description, Due Date, Google Drive URL, and **Targeted Allocation**.
  - **Student Allocation:** Choose between **Assign to All 5 Students** or **Assign to Selected Students** (interactive checkbox selector).
  - **Edit:** Modify title, instructions, due dates, drive links, or adjust allocated student lists.
  - **Delete:** Remove assignments and cascade clean associated submissions.
- **Student Submissions Roster:**
  - Dedicated page allowing professors to select any created assignment.
  - Horizontal progress bar showing class completion rate (`X of Y Students • Z%`).
  - Structured roster table displaying every student's status (`Submitted`, `Pending`, `Overdue`) and exact submission timestamps.
- **Admin Dashboard & Analytics:**
  - 5-column metric strip: `Assignments Created`, `Student Allocations`, `Submitted`, `Pending`, and `Class Completion Rate`.
  - Circular SVG donut chart breaking down completion statuses.
  - Real-time recent activity feed logging student submissions.

### 4. Visual Architecture & Dual Theme
- **Persistent Left Navy Sidebar (`#0F172A`):** Anchors navigation across desktop viewports, fully collapsible on mobile screens.
- **Adaptive Workspace Canvas:** Clean light canvas (`#F4F7FE`) with pure-white cards (`#FFFFFF`) and one-click Dark Mode switch (`#0B0F19` canvas, `#111827` cards).
- **Zero-Dependency SVG Rings:** Custom SVG circular progress rings and linear progress bars.
- **Client-Side Persistence:** Automatically saves all state, submissions, created coursework, and theme preferences to `localStorage`.

---

## 🔑 Demo Credentials

No passwords required — click any demo account pill in the **Role Portal** or the **TopHeader Switcher**:

| Role | Name | Email | Focus / Notes |
| :--- | :--- | :--- | :--- |
| **Student** | **Kashish Gupta** *(Default)* | `kashish@demo.com` | Assigned coursework across both professors |
| **Student** | **Aarav Patel** | `aarav@demo.com` | Has submitted assignments for CS-401 & CS-405 |
| **Student** | **Vikram Singh** | `vikram@demo.com` | Test individual submission flows |
| **Student** | **Riya Sharma** | `riya@demo.com` | Allocated to SE-503 (Cloud Architecture) |
| **Student** | **Ananya Verma** | `ananya@demo.com` | Completed SE-501 & SE-503 |
| **Admin** | **Professor Sharma** | `sharma@demo.com` | Dept. of Computer Science (CS-401, CS-302, CS-402, CS-405) |
| **Admin** | **Professor Mehta** | `mehta@demo.com` | Dept. of Software Engineering (SE-501, SE-503) |

---

## 📁 Folder Structure

```text
assignment-hub/
├── public/
│   └── favicon.svg                  # Text-neutral Assignment Hub favicon
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   └── RoleSelectionPortal.jsx  # Split-screen role selector with demo login pills
│   │   ├── common/
│   │   │   ├── ConfirmationModal.jsx    # Two-step submission confirmation dialog
│   │   │   ├── RadialProgress.jsx       # Reusable SVG circular progress ring
│   │   │   └── StatusPill.jsx           # Semantic status badges (Submitted, Pending, Overdue)
│   │   ├── layout/
│   │   │   ├── Sidebar.jsx              # Persistent navy sidebar with dark mode toggle & exit
│   │   │   └── TopHeader.jsx            # Search bar, 7-account persona switcher, activity bell
│   │   ├── professor/
│   │   │   ├── AdminDashboard.jsx       # KPI strip, donut chart analytics, quick actions
│   │   │   ├── CreateAssignmentModal.jsx # Assignment authoring & editing modal with student allocation
│   │   │   ├── ManageAssignmentsView.jsx # Dedicated assignment CRUD & management table
│   │   │   ├── StudentSubmissionsModal.jsx # Quick submission roster modal dialog
│   │   │   └── StudentSubmissionsView.jsx  # Dedicated full-page student submissions roster
│   │   └── student/
│   │       ├── AssignmentRowItem.jsx    # Coursework card with status badge & external Drive button
│   │       ├── MyAssignmentsView.jsx    # Dedicated My Assignments page with search, filters & sort
│   │       └── StudentDashboard.jsx     # Welcome banner, 4 KPI cards, progress ring & preview
│   ├── context/
│   │   └── AppContext.jsx               # Global state, assignment CRUD, student allocation & localStorage
│   ├── data/
│   │   └── mockData.js                  # Initial seed data (2 Admins, 5 Students, 6 Assignments)
│   ├── App.jsx                          # Main shell orchestrating role & navigation routing
│   ├── index.css                        # Tailwind directives and custom scrollbar styles
│   └── main.jsx                         # React 18 application entry point
├── index.html                           # App entry with updated title: Assignment Hub
├── package.json                         # Dependencies and build scripts
├── postcss.config.js                    # PostCSS configuration
├── tailwind.config.js                   # Tailwind color tokens and dark mode config
└── vite.config.js                       # Vite build & development server config
```

---

## 🛠️ Setup & Running Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn or pnpm

### Installation Steps
1. **Clone the repository and install dependencies:**
   ```bash
   npm install
   ```

2. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

3. **Build production bundle:**
   ```bash
   npm run build
   ```

---

## 📐 Key Design & Architecture Decisions

1. **State Isolation & Storage Sync:**
   - Centralized via React Context API (`AppContext.jsx`) with automatic JSON hydration from/to `localStorage`.
   - Admin view queries only `assignments.filter(a => a.createdBy === currentAdmin.id)`.
   - Student view queries only `assignments.filter(a => a.assignedStudentIds.includes(currentStudent.id))`.
2. **Dedicated Pages vs. Duplicate Views:**
   - `StudentDashboard` focuses on metrics, completion rate, and upcoming tasks.
   - `MyAssignmentsView` provides a full management table with search, status filtering, and due date sorting.
   - `AdminDashboard` provides overview stats and charts.
   - `ManageAssignmentsView` provides full CRUD actions.
   - `StudentSubmissionsView` provides comprehensive student roster tracking with Drive links.
3. **Two-Step Verification:**
   - Adheres strictly to the specification: Step 1 verifies external Drive folder and requests acknowledgment; Step 2 presents the final confirmation dialog before updating state to `Submitted`.
