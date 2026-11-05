import React, { useState, useMemo } from 'react';
import {
  X,
  Search,
  ExternalLink,
  Users
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import StatusPill from '../common/StatusPill';

const StudentSubmissionsModal = ({ isOpen, onClose, assignment }) => {
  const { students, submissions, getAssignmentSubmissionSummary } = useApp();
  const [filterQuery, setFilterQuery] = useState('');

  if (!isOpen || !assignment) return null;

  const summary = getAssignmentSubmissionSummary(assignment.id);
  const assignedIds = assignment.assignedStudentIds || [];
  const assignedStudents = students.filter(st => assignedIds.includes(st.id));

  const filteredStudents = assignedStudents.filter(st => {
    if (!filterQuery.trim()) return true;
    const q = filterQuery.toLowerCase();
    return st.name.toLowerCase().includes(q) || st.email.toLowerCase().includes(q);
  });

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden flex flex-col max-h-[88vh]"
        role="dialog"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
              {assignment.course}
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
              {assignment.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Student Submissions Roster
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Strip */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-600 dark:text-slate-300">
              Class Completion Progress
            </span>
            <span className="text-blue-600 dark:text-blue-400 font-bold">
              {summary.submitted} of {summary.total} Students • {summary.percentage}%
            </span>
          </div>

          <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${summary.percentage}%` }}
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="relative flex-1 max-w-xs">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder="Search student..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-gray-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <a
              href={assignment.driveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              Open Google Drive <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="pb-3 pl-2">Student</th>
                <th className="pb-3 px-3">Status</th>
                <th className="pb-3 pr-2">Submission Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {filteredStudents.map((st) => {
                const sub = submissions.find(
                  s => s.assignmentId === assignment.id && s.studentId === st.id
                );
                const isPastDue = new Date(assignment.dueDate) < new Date('2026-11-03T00:00:00.000Z');
                let effectiveStatus = sub?.status || 'Pending';
                if (effectiveStatus !== 'Submitted' && isPastDue) {
                  effectiveStatus = 'Overdue';
                }

                return (
                  <tr key={st.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 pl-2">
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

                    <td className="py-3 px-3">
                      <StatusPill status={effectiveStatus} size="sm" />
                    </td>

                    <td className="py-3 pr-2">
                      {sub?.submittedAt ? (
                        <span className="font-medium text-slate-800 dark:text-slate-200">
                          {formatTimestamp(sub.submittedAt)}
                        </span>
                      ) : (
                        <span className="text-slate-400 italic">Not submitted yet</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-gray-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            Close Roster
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentSubmissionsModal;
