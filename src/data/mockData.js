export const INITIAL_ADMINS = [
  {
    id: 'admin-1',
    name: 'Professor Sharma',
    email: 'sharma@demo.com',
    role: 'admin',
    avatar: 'PS',
    department: 'Computer Science'
  },
  {
    id: 'admin-2',
    name: 'Professor Mehta',
    email: 'mehta@demo.com',
    role: 'admin',
    avatar: 'PM',
    department: 'Software Engineering'
  }
];

export const INITIAL_STUDENTS = [
  {
    id: 'student-1',
    name: 'Kashish Gupta',
    email: 'kashish@demo.com',
    role: 'student',
    avatar: 'KG'
  },
  {
    id: 'student-2',
    name: 'Aarav Patel',
    email: 'aarav@demo.com',
    role: 'student',
    avatar: 'AP'
  },
  {
    id: 'student-3',
    name: 'Vikram Singh',
    email: 'vikram@demo.com',
    role: 'student',
    avatar: 'VS'
  },
  {
    id: 'student-4',
    name: 'Riya Sharma',
    email: 'riya@demo.com',
    role: 'student',
    avatar: 'RS'
  },
  {
    id: 'student-5',
    name: 'Ananya Verma',
    email: 'ananya@demo.com',
    role: 'student',
    avatar: 'AV'
  }
];

export const INITIAL_ASSIGNMENTS = [
  // Assignments created by Professor Sharma (admin-1)
  {
    id: 'asg-1',
    title: 'React Component Architecture & State',
    course: 'CS-401 Frontend Development',
    category: 'React',
    description: 'Implement modular component hierarchy, custom hooks, and state management using React and Tailwind CSS.',
    dueDate: '2026-11-08',
    driveUrl: 'https://drive.google.com/drive/folders/react-architecture-demo',
    createdBy: 'admin-1',
    assignedTo: 'ALL',
    assignedStudentIds: ['student-1', 'student-2', 'student-3', 'student-4', 'student-5'],
    createdAt: '2026-10-28T09:00:00.000Z'
  },
  {
    id: 'asg-2',
    title: 'UI Design Systems & Responsive Layouts',
    course: 'CS-302 UI/UX Engineering',
    category: 'UI/UX',
    description: 'Build responsive layouts with Tailwind CSS, design tokens, accessible color contrast, and fluid grid systems.',
    dueDate: '2026-11-10',
    driveUrl: 'https://drive.google.com/drive/folders/ui-design-systems-demo',
    createdBy: 'admin-1',
    assignedTo: 'ALL',
    assignedStudentIds: ['student-1', 'student-2', 'student-3', 'student-4', 'student-5'],
    createdAt: '2026-10-29T11:30:00.000Z'
  },
  {
    id: 'asg-3',
    title: 'RESTful API Integration & Error Handling',
    course: 'CS-402 Web Technologies',
    category: 'API',
    description: 'Connect client applications to REST endpoints with loading skeletons, caching, and graceful error boundary fallbacks.',
    dueDate: '2026-11-02', // Past date to demonstrate overdue state
    driveUrl: 'https://drive.google.com/drive/folders/api-integration-demo',
    createdBy: 'admin-1',
    assignedTo: 'ALL',
    assignedStudentIds: ['student-1', 'student-2', 'student-3', 'student-4', 'student-5'],
    createdAt: '2026-10-25T10:00:00.000Z'
  },
  {
    id: 'asg-4',
    title: 'Advanced Performance Optimization',
    course: 'CS-405 Advanced Web Systems',
    category: 'React',
    description: 'Apply code splitting, lazy loading, memoization, and bundle size reduction techniques to optimize page load speeds.',
    dueDate: '2026-11-14',
    driveUrl: 'https://drive.google.com/drive/folders/perf-optimization-demo',
    createdBy: 'admin-1',
    assignedTo: 'SELECTED',
    assignedStudentIds: ['student-1', 'student-2', 'student-3'], // Assigned only to Kashish, Aarav, and Vikram
    createdAt: '2026-10-30T14:15:00.000Z'
  },

  // Assignments created by Professor Mehta (admin-2)
  {
    id: 'asg-5',
    title: 'Software Testing & Test-Driven Development',
    course: 'SE-501 Software Verification',
    category: 'Testing',
    description: 'Write comprehensive unit tests, integration test suites, and mock APIs using Vitest and React Testing Library.',
    dueDate: '2026-11-09',
    driveUrl: 'https://drive.google.com/drive/folders/tdd-verification-demo',
    createdBy: 'admin-2',
    assignedTo: 'ALL',
    assignedStudentIds: ['student-1', 'student-2', 'student-3', 'student-4', 'student-5'],
    createdAt: '2026-10-31T08:30:00.000Z'
  },
  {
    id: 'asg-6',
    title: 'Microservices & Containerization',
    course: 'SE-503 Cloud Architecture',
    category: 'Cloud',
    description: 'Dockerize frontend and mock backend services with compose orchestrations, volume mounts, and automated health checks.',
    dueDate: '2026-11-15',
    driveUrl: 'https://drive.google.com/drive/folders/microservices-cloud-demo',
    createdBy: 'admin-2',
    assignedTo: 'SELECTED',
    assignedStudentIds: ['student-1', 'student-4', 'student-5'], // Assigned to Kashish, Riya, Ananya
    createdAt: '2026-11-01T10:00:00.000Z'
  }
];

export const INITIAL_SUBMISSIONS = [
  // asg-1 (Prof. Sharma - CS-401)
  {
    id: 'sub-1',
    assignmentId: 'asg-1',
    studentId: 'student-1',
    status: 'Submitted',
    submittedAt: '2026-11-04T14:30:00.000Z',
    submittedBy: 'Kashish Gupta'
  },
  {
    id: 'sub-2',
    assignmentId: 'asg-1',
    studentId: 'student-2',
    status: 'Submitted',
    submittedAt: '2026-11-04T16:15:00.000Z',
    submittedBy: 'Aarav Patel'
  },
  {
    id: 'sub-3',
    assignmentId: 'asg-1',
    studentId: 'student-3',
    status: 'Pending',
    submittedAt: null,
    submittedBy: null
  },
  {
    id: 'sub-4',
    assignmentId: 'asg-1',
    studentId: 'student-4',
    status: 'Pending',
    submittedAt: null,
    submittedBy: null
  },
  {
    id: 'sub-5',
    assignmentId: 'asg-1',
    studentId: 'student-5',
    status: 'Pending',
    submittedAt: null,
    submittedBy: null
  },

  // asg-2 (Prof. Sharma - CS-302, Pending for student-1, ready to test submission!)
  {
    id: 'sub-6',
    assignmentId: 'asg-2',
    studentId: 'student-1',
    status: 'Pending',
    submittedAt: null,
    submittedBy: null
  },
  {
    id: 'sub-7',
    assignmentId: 'asg-2',
    studentId: 'student-2',
    status: 'Pending',
    submittedAt: null,
    submittedBy: null
  },
  {
    id: 'sub-8',
    assignmentId: 'asg-2',
    studentId: 'student-3',
    status: 'Submitted',
    submittedAt: '2026-11-03T18:00:00.000Z',
    submittedBy: 'Vikram Singh'
  },
  {
    id: 'sub-9',
    assignmentId: 'asg-2',
    studentId: 'student-4',
    status: 'Pending',
    submittedAt: null,
    submittedBy: null
  },
  {
    id: 'sub-10',
    assignmentId: 'asg-2',
    studentId: 'student-5',
    status: 'Pending',
    submittedAt: null,
    submittedBy: null
  },

  // asg-3 (Prof. Sharma - CS-402, Due Nov 2 2026)
  {
    id: 'sub-11',
    assignmentId: 'asg-3',
    studentId: 'student-1',
    status: 'Submitted',
    submittedAt: '2026-11-01T18:20:00.000Z',
    submittedBy: 'Kashish Gupta'
  },
  {
    id: 'sub-12',
    assignmentId: 'asg-3',
    studentId: 'student-2',
    status: 'Overdue',
    submittedAt: null,
    submittedBy: null
  },
  {
    id: 'sub-13',
    assignmentId: 'asg-3',
    studentId: 'student-3',
    status: 'Overdue',
    submittedAt: null,
    submittedBy: null
  },
  {
    id: 'sub-14',
    assignmentId: 'asg-3',
    studentId: 'student-4',
    status: 'Submitted',
    submittedAt: '2026-11-02T09:10:00.000Z',
    submittedBy: 'Riya Sharma'
  },
  {
    id: 'sub-15',
    assignmentId: 'asg-3',
    studentId: 'student-5',
    status: 'Overdue',
    submittedAt: null,
    submittedBy: null
  },

  // asg-4 (Prof. Sharma - CS-405, assigned to student-1, student-2, student-3)
  {
    id: 'sub-16',
    assignmentId: 'asg-4',
    studentId: 'student-1',
    status: 'Pending',
    submittedAt: null,
    submittedBy: null
  },
  {
    id: 'sub-17',
    assignmentId: 'asg-4',
    studentId: 'student-2',
    status: 'Submitted',
    submittedAt: '2026-11-04T11:45:00.000Z',
    submittedBy: 'Aarav Patel'
  },
  {
    id: 'sub-18',
    assignmentId: 'asg-4',
    studentId: 'student-3',
    status: 'Pending',
    submittedAt: null,
    submittedBy: null
  },

  // asg-5 (Prof. Mehta - SE-501)
  {
    id: 'sub-19',
    assignmentId: 'asg-5',
    studentId: 'student-1',
    status: 'Submitted',
    submittedAt: '2026-11-03T11:00:00.000Z',
    submittedBy: 'Kashish Gupta'
  },
  {
    id: 'sub-20',
    assignmentId: 'asg-5',
    studentId: 'student-2',
    status: 'Pending',
    submittedAt: null,
    submittedBy: null
  },
  {
    id: 'sub-21',
    assignmentId: 'asg-5',
    studentId: 'student-3',
    status: 'Pending',
    submittedAt: null,
    submittedBy: null
  },
  {
    id: 'sub-22',
    assignmentId: 'asg-5',
    studentId: 'student-4',
    status: 'Pending',
    submittedAt: null,
    submittedBy: null
  },
  {
    id: 'sub-23',
    assignmentId: 'asg-5',
    studentId: 'student-5',
    status: 'Submitted',
    submittedAt: '2026-11-04T15:20:00.000Z',
    submittedBy: 'Ananya Verma'
  },

  // asg-6 (Prof. Mehta - SE-503, assigned to student-1, student-4, student-5)
  {
    id: 'sub-24',
    assignmentId: 'asg-6',
    studentId: 'student-1',
    status: 'Pending',
    submittedAt: null,
    submittedBy: null
  },
  {
    id: 'sub-25',
    assignmentId: 'asg-6',
    studentId: 'student-4',
    status: 'Pending',
    submittedAt: null,
    submittedBy: null
  },
  {
    id: 'sub-26',
    assignmentId: 'asg-6',
    studentId: 'student-5',
    status: 'Submitted',
    submittedAt: '2026-11-04T19:30:00.000Z',
    submittedBy: 'Ananya Verma'
  }
];

export const INITIAL_ACTIVITIES = [
  {
    id: 'act-1',
    type: 'submission',
    title: 'Kashish Gupta submitted React Component Architecture',
    description: 'Submitted for CS-401 • Google Drive link verified',
    timestamp: '1 hour ago',
    adminId: 'admin-1',
    author: 'Kashish Gupta',
    tag: 'CS-401',
    badgeColor: 'emerald'
  },
  {
    id: 'act-2',
    type: 'submission',
    title: 'Aarav Patel submitted Advanced Performance Optimization',
    description: 'Submitted for CS-405',
    timestamp: '3 hours ago',
    adminId: 'admin-1',
    author: 'Aarav Patel',
    tag: 'CS-405',
    badgeColor: 'blue'
  },
  {
    id: 'act-3',
    type: 'submission',
    title: 'Ananya Verma submitted Software Testing & TDD',
    description: 'Submitted for SE-501',
    timestamp: '5 hours ago',
    adminId: 'admin-2',
    author: 'Ananya Verma',
    tag: 'SE-501',
    badgeColor: 'emerald'
  },
  {
    id: 'act-4',
    type: 'create',
    title: 'UI Design Systems & Responsive Layouts published',
    description: 'Assigned to all 5 students • Due Nov 10, 2026',
    timestamp: '1 day ago',
    adminId: 'admin-1',
    author: 'Professor Sharma',
    tag: 'CS-302',
    badgeColor: 'purple'
  }
];
