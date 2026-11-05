import React, { useState, useMemo } from 'react';
import {
  ClipboardList,
  Search,
  ExternalLink,
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import StatusPill from '../common/StatusPill';

const StudentSubmissionsView = ({ defaultAssignmentId = null }) => {
  const {
    currentUser,
    students,
    submissions,
    getAdminAssignments,
    getAssignmentSubmissionSummary
  } = useApp();

  const adminAssignments = useMemo(() => {
    return getAdminAssignments(currentUser?.id);
  }, [currentUser?.id, getAdminAssignments]);

  const [selectedAsgId, setSelectedAsgId] = useState(() => {
    if (defaultAssignmentId && adminAssignments.some(a => a.id === defaultAssignmentId)) {
      return defaultAssignmentId;
    }
    return adminAssignments[0]?.id || null;
  });

  const [studentSearch, setStudentSearch] = useState('');

  // Keep selectedAsgId valid if assignments change
  const currentAssignment = useMemo(() => {
    return adminAssignments.find(a => a.id === selectedAsgId) || adminAssignments[0] || null;
  }, [adminAssignments, selectedAsgId]);

  const summary = useMemo(() => {
    if (!currentAssignment) return null;
    return getAssignmentSubmissionSummary(currentAssignment.id);
  }, [currentAssignment, getAssignmentSubmissionSummary]);

  // List of students assigned to this assignment
  const assignedStudents = useMemo(() => {
    if (!currentAssignment) return [];
    const assignedIds = currentAssignment.assignedStudentIds || [];
    return students.filter(st => assignedIds.includes(st.id));
  }, [currentAssignment, students]);

  // Filter students based on search input
  const filteredStudents = useMemo(() => {
    if (!studentSearch.trim()) return assignedStudents;
    const q = studentSearch.toLowerCase();
    return assignedStudents.filter(
      st => st.name.toLowerCase().includes(q) || st.email.toLowerCase().includes(q)
    );
  }, [assignedStudents, studentSearch]);

  const formatTimestamp = (isoString) => {
    if (!isoString) return '-';
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return isoString;
    }
  };

  if (adminAssignments.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-12 text-center border border-slate-200/80 dark:border-white/10 shadow-soft-card animate-in fade-in duration-200">
        <ClipboardList className="w-12 h-12 text-slate-400 mx-auto mb-3" />
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
          No assignments created yet
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1">
          Create an assignment from the Manage Assignments tab to start tracking student submissions.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header & Assignment Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Student Submissions
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Student-wise submission status and class completion progress.
          </p>
        </div>

        {/* Dropdown to switch inspected assignment */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider shrink-0">
            Assignment:
          </label>
          <select
            value={currentAssignment?.id || ''}
            onChange={(e) => setSelectedAsgId(e.target.value)}
            className="text-xs font-semibold px-3 py-2 rounded-xl bg-white dark:bg-gray-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-sm max-w-xs truncate"
          >
            {adminAssignments.map(asg => (
              <option key={asg.id} value={asg.id}>
                {asg.course} — {asg.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {currentAssignment && summary && (
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-soft-card overflow-hidden space-y-0">
          {/* Top Assignment Metadata & Progress Strip */}
          <div className="p-6 bg-slate-50/60 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                  {currentAssignment.course}
                </span>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                  {currentAssignment.title}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2 max-w-2xl">
                  {currentAssignment.description}
                </p>
              </div>

              <a
                href={currentAssignment.driveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-blue-50 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-500/25 transition-colors border border-blue-200/80 dark:border-blue-800/40 shrink-0 self-start sm:self-auto"
              >
                <span>Open Google Drive</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Class Completion Progress Bar */}
            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-600 dark:text-slate-300">
                  Class Completion Rate
                </span>
                <span className="text-blue-600 dark:text-blue-400 font-bold">
                  {summary.submitted} of {summary.total} Students Submitted • {summary.percentage}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-500"
                  style={{ width: `${summary.percentage}%` }}
                />
              </div>
            </div>

            {/* Sub-search */}
            <div className="pt-2 flex items-center justify-between gap-3">
              <div className="relative max-w-xs w-full">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  placeholder="Filter student by name or email..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-gray-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <span className="text-xs text-slate-400">
                Due: {currentAssignment.dueDate}
              </span>
            </div>
          </div>

          {/* Student Status Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-white dark:bg-gray-900">
                  <th className="py-3.5 pl-6">Student</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 pr-6">Submission Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                {filteredStudents.map((st) => {
                  const sub = submissions.find(
                    s => s.assignmentId === currentAssignment.id && s.studentId === st.id
                  );
                  const isPastDue = new Date(currentAssignment.dueDate) < new Date('2026-11-03T00:00:00.000Z');
                  let effectiveStatus = sub?.status || 'Pending';
                  if (effectiveStatus !== 'Submitted' && isPastDue) {
                    effectiveStatus = 'Overdue';
                  }

                  return (
                    <tr
                      key={st.id}
                      className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      {/* Student Profile */}
                      <td className="py-3.5 pl-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 font-bold flex items-center justify-center text-xs shrink-0">
                            {st.avatar}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white block">
                              {st.name}
                            </span>
                            <span className="text-[11px] text-slate-400">
                              {st.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <StatusPill status={effectiveStatus} size="sm" />
                      </td>

                      {/* Timestamp */}
                      <td className="py-3.5 pr-6 whitespace-nowrap">
                        {sub?.submittedAt ? (
                          <span className="font-medium text-slate-800 dark:text-slate-200">
                            {formatTimestamp(sub.submittedAt)}
                          </span>
                        ) : (
                          <span className="text-slate-400 italic">
                            Not submitted yet
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentSubmissionsView;

