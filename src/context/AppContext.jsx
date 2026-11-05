import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_ADMINS,
  INITIAL_STUDENTS,
  INITIAL_ASSIGNMENTS,
  INITIAL_SUBMISSIONS,
  INITIAL_ACTIVITIES
} from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // --- Dark Mode State ---
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('ah_dark_mode');
    if (saved !== null) return saved === 'true';
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('ah_dark_mode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('ah_dark_mode', 'false');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  // --- Users & Roles ---
  const [admins] = useState(INITIAL_ADMINS);
  const [students] = useState(INITIAL_STUDENTS);

  // Current logged in user (default: Kashish Gupta)
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('ah_current_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        // Verify user exists in seeded lists
        const exists = [...INITIAL_STUDENTS, ...INITIAL_ADMINS].find(u => u.id === parsed.id);
        if (exists && exists.name === parsed.name) return exists;
      } catch (e) {
        // Fallback
      }
    }
    return INITIAL_STUDENTS[0]; // Default: Kashish Gupta
  });

  const [currentRole, setCurrentRole] = useState(() => {
    const savedRole = localStorage.getItem('ah_current_role');
    if (savedRole === 'admin' || savedRole === 'student') return savedRole;
    return 'student';
  });

  // Sync auth state to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('ah_current_user', JSON.stringify(currentUser));
      localStorage.setItem('ah_current_role', currentRole);
    } else {
      localStorage.removeItem('ah_current_user');
      localStorage.removeItem('ah_current_role');
    }
  }, [currentUser, currentRole]);

  // --- Assignments State ---
  const [assignments, setAssignments] = useState(() => {
    const saved = localStorage.getItem('ah_assignments');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // If it contains valid assignments with createdBy, use it
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].createdBy) {
          return parsed;
        }
      } catch (e) {}
    }
    return INITIAL_ASSIGNMENTS;
  });

  // --- Submissions State ---
  const [submissions, setSubmissions] = useState(() => {
    const saved = localStorage.getItem('ah_submissions');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {}
    }
    return INITIAL_SUBMISSIONS;
  });

  // --- Activities State ---
  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem('ah_activities');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {}
    }
    return INITIAL_ACTIVITIES;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('ah_assignments', JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem('ah_submissions', JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    localStorage.setItem('ah_activities', JSON.stringify(activities));
  }, [activities]);

  // --- Search & Toast State ---
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(prev => (prev?.message === message ? null : prev));
    }, 3500);
  };

  // --- Auth & Persona Actions ---
  const loginAs = (role, userObject) => {
    setCurrentRole(role);
    setCurrentUser(userObject);
    showToast(`Logged in as ${userObject.name} (${role === 'admin' ? 'Professor' : 'Student'})`);
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentRole(null);
    showToast('Logged out to Role Portal', 'info');
  };

  const switchStudentPersona = (studentId) => {
    const targetStudent = students.find(s => s.id === studentId);
    if (targetStudent) {
      setCurrentRole('student');
      setCurrentUser(targetStudent);
      showToast(`Switched account to ${targetStudent.name} (Student)`);
    }
  };

  const switchAdminPersona = (adminId) => {
    const targetAdmin = admins.find(a => a.id === adminId);
    if (targetAdmin) {
      setCurrentRole('admin');
      setCurrentUser(targetAdmin);
      showToast(`Switched account to ${targetAdmin.name} (Admin)`);
    }
  };

  const switchToAdmin = (adminId = 'admin-1') => {
    switchAdminPersona(adminId);
  };

  // --- Assignment CRUD (Admin) ---
  const createAssignment = (assignmentData) => {
    const newId = `asg-${Date.now()}`;
    const creatorId = currentUser?.id || 'admin-1';
    
    // Determine assigned student IDs
    const assignedIds = assignmentData.assignedTo === 'ALL'
      ? students.map(s => s.id)
      : (assignmentData.assignedStudentIds || []);

    const newAssignment = {
      ...assignmentData,
      id: newId,
      createdBy: creatorId,
      assignedStudentIds: assignedIds,
      createdAt: new Date().toISOString()
    };

    // Initialize submission records only for allocated students
    const newSubmissions = assignedIds.map(stId => ({
      id: `sub-${Date.now()}-${stId}`,
      assignmentId: newId,
      studentId: stId,
      status: 'Pending',
      submittedAt: null,
      submittedBy: null
    }));

    setAssignments(prev => [newAssignment, ...prev]);
    setSubmissions(prev => [...prev, ...newSubmissions]);

    // Activity log
    const newActivity = {
      id: `act-${Date.now()}`,
      type: 'create',
      title: `${newAssignment.title} created`,
      description: `Assigned to ${assignedIds.length} student(s) • Due ${newAssignment.dueDate}`,
      timestamp: 'Just now',
      adminId: creatorId,
      author: currentUser?.name || 'Professor',
      tag: newAssignment.course,
      badgeColor: 'purple'
    };
    setActivities(prev => [newActivity, ...prev]);
    showToast(`Assignment "${newAssignment.title}" created successfully!`);
  };

  const updateAssignment = (id, updatedFields) => {
    const assignedIds = updatedFields.assignedTo === 'ALL'
      ? students.map(s => s.id)
      : (updatedFields.assignedStudentIds || []);

    setAssignments(prev =>
      prev.map(a => {
        if (a.id === id) {
          return {
            ...a,
            ...updatedFields,
            assignedStudentIds: assignedIds
          };
        }
        return a;
      })
    );

    // Ensure newly allocated students have a submission record
    setSubmissions(prev => {
      const existingStudentIds = prev.filter(s => s.assignmentId === id).map(s => s.studentId);
      const missingStudentIds = assignedIds.filter(stId => !existingStudentIds.includes(stId));
      
      if (missingStudentIds.length === 0) return prev;

      const createdSubs = missingStudentIds.map(stId => ({
        id: `sub-${Date.now()}-${stId}`,
        assignmentId: id,
        studentId: stId,
        status: 'Pending',
        submittedAt: null,
        submittedBy: null
      }));

      return [...prev, ...createdSubs];
    });

    const target = assignments.find(a => a.id === id);
    const newActivity = {
      id: `act-${Date.now()}`,
      type: 'edit',
      title: `${updatedFields.title || target?.title} updated`,
      description: 'Assignment specifications or student allocation updated',
      timestamp: 'Just now',
      adminId: currentUser?.id || 'admin-1',
      author: currentUser?.name || 'Professor',
      tag: target?.course || 'Admin',
      badgeColor: 'amber'
    };
    setActivities(prev => [newActivity, ...prev]);
    showToast('Assignment updated successfully.');
  };

  const deleteAssignment = (id) => {
    const target = assignments.find(a => a.id === id);
    setAssignments(prev => prev.filter(a => a.id !== id));
    setSubmissions(prev => prev.filter(s => s.assignmentId !== id));

    const newActivity = {
      id: `act-${Date.now()}`,
      type: 'delete',
      title: `${target?.title || 'Assignment'} deleted`,
      description: 'Assignment and associated student submissions removed',
      timestamp: 'Just now',
      adminId: currentUser?.id || 'admin-1',
      author: currentUser?.name || 'Professor',
      tag: target?.course || 'Admin',
      badgeColor: 'rose'
    };
    setActivities(prev => [newActivity, ...prev]);
    showToast('Assignment deleted.', 'info');
  };

  // --- Student Two-Step Submission Confirmation ---
  const acknowledgeSubmission = (assignmentId, studentId) => {
    const assignment = assignments.find(a => a.id === assignmentId);
    const student = students.find(s => s.id === studentId);
    if (!assignment || !student) return;

    const nowIso = new Date().toISOString();

    setSubmissions(prev =>
      prev.map(sub => {
        if (sub.assignmentId === assignmentId && sub.studentId === studentId) {
          return {
            ...sub,
            status: 'Submitted',
            submittedAt: nowIso,
            submittedBy: student.name
          };
        }
        return sub;
      })
    );

    const newActivity = {
      id: `act-${Date.now()}`,
      type: 'submission',
      title: `${student.name} submitted ${assignment.title}`,
      description: `Submitted for ${assignment.course} • Google Drive link verified`,
      timestamp: 'Just now',
      adminId: assignment.createdBy,
      author: student.name,
      tag: assignment.course,
      badgeColor: 'emerald'
    };
    setActivities(prev => [newActivity, ...prev]);
    showToast(`Assignment "${assignment.title}" submitted successfully!`);
  };

  // --- Reset to Default Seed Data ---
  const resetToDefaultData = () => {
    localStorage.removeItem('ah_assignments');
    localStorage.removeItem('ah_submissions');
    localStorage.removeItem('ah_activities');
    localStorage.removeItem('ah_current_user');
    localStorage.removeItem('ah_current_role');
    
    // Also clear old legacy keys if present
    localStorage.removeItem('je_assignments');
    localStorage.removeItem('je_submissions');
    localStorage.removeItem('je_activities');
    localStorage.removeItem('je_current_user');
    localStorage.removeItem('je_current_role');

    setAssignments(INITIAL_ASSIGNMENTS);
    setSubmissions(INITIAL_SUBMISSIONS);
    setActivities(INITIAL_ACTIVITIES);
    setCurrentUser(INITIAL_STUDENTS[0]);
    setCurrentRole('student');
    showToast('Reset all data to default demo state.', 'info');
  };

  // --- Student-Specific Helpers ---
  const getStudentAssignments = (studentId) => {
    return assignments.filter(asg => asg.assignedStudentIds?.includes(studentId));
  };

  const getStudentStats = (studentId) => {
    const studentAssigned = getStudentAssignments(studentId);
    const studentSubs = submissions.filter(s => s.studentId === studentId);
    const totalAssigned = studentAssigned.length;
    
    let submitted = 0;
    let pending = 0;
    let overdue = 0;

    studentAssigned.forEach(asg => {
      const sub = studentSubs.find(s => s.assignmentId === asg.id);
      const isPastDue = new Date(asg.dueDate) < new Date('2026-11-03T00:00:00.000Z');

      if (sub?.status === 'Submitted') {
        submitted++;
      } else if (sub?.status === 'Overdue' || (isPastDue && sub?.status !== 'Submitted')) {
        overdue++;
      } else {
        pending++;
      }
    });

    const completionRate = totalAssigned > 0 ? Math.round((submitted / totalAssigned) * 100) : 0;
    return { totalAssigned, submitted, pending, overdue, completionRate };
  };

  // --- Admin-Specific Helpers (Admins see only their created assignments) ---
  const getAdminAssignments = (adminId) => {
    return assignments.filter(asg => asg.createdBy === adminId);
  };

  const getAdminStats = (adminId) => {
    const adminAsgs = getAdminAssignments(adminId);
    const totalAssignments = adminAsgs.length;
    
    let totalAllocations = 0;
    let submittedCount = 0;
    let pendingCount = 0;
    let overdueCount = 0;

    adminAsgs.forEach(asg => {
      const assignedIds = asg.assignedStudentIds || [];
      totalAllocations += assignedIds.length;
      const isPastDue = new Date(asg.dueDate) < new Date('2026-11-03T00:00:00.000Z');

      assignedIds.forEach(stId => {
        const sub = submissions.find(s => s.assignmentId === asg.id && s.studentId === stId);
        if (sub?.status === 'Submitted') {
          submittedCount++;
        } else if (sub?.status === 'Overdue' || (isPastDue && sub?.status !== 'Submitted')) {
          overdueCount++;
        } else {
          pendingCount++;
        }
      });
    });

    const completionRate = totalAllocations > 0
      ? Math.round((submittedCount / totalAllocations) * 100)
      : 0;

    return {
      totalAssignments,
      totalAllocations,
      submittedCount,
      pendingCount,
      overdueCount,
      completionRate
    };
  };

  const getAssignmentSubmissionSummary = (assignmentId) => {
    const asg = assignments.find(a => a.id === assignmentId);
    if (!asg) {
      return { total: 0, submitted: 0, pending: 0, overdue: 0, percentage: 0 };
    }

    const assignedIds = asg.assignedStudentIds || [];
    const total = assignedIds.length;
    const isPastDue = new Date(asg.dueDate) < new Date('2026-11-03T00:00:00.000Z');

    let submitted = 0;
    let pending = 0;
    let overdue = 0;

    assignedIds.forEach(stId => {
      const sub = submissions.find(s => s.assignmentId === assignmentId && s.studentId === stId);
      if (sub?.status === 'Submitted') {
        submitted++;
      } else if (sub?.status === 'Overdue' || (isPastDue && sub?.status !== 'Submitted')) {
        overdue++;
      } else {
        pending++;
      }
    });

    const percentage = total > 0 ? Math.round((submitted / total) * 100) : 0;

    return {
      total,
      submitted,
      pending,
      overdue,
      percentage
    };
  };

  return (
    <AppContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
        currentUser,
        currentRole,
        setCurrentUser,
        setCurrentRole,
        admins,
        students,
        assignments,
        submissions,
        activities,
        searchQuery,
        setSearchQuery,
        toastMessage,
        showToast,
        loginAs,
        logout,
        switchStudentPersona,
        switchAdminPersona,
        switchToAdmin,
        createAssignment,
        updateAssignment,
        deleteAssignment,
        acknowledgeSubmission,
        resetToDefaultData,
        getStudentAssignments,
        getStudentStats,
        getAdminAssignments,
        getAdminStats,
        getAssignmentSubmissionSummary
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
