import React, { useState, useMemo } from 'react';
import {
  Layers,
  Plus,
  Search,
  Calendar,
  ExternalLink,
  Edit3,
  Trash2,
  Users,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import CreateAssignmentModal from './CreateAssignmentModal';

const ManageAssignmentsView = ({ onNavigateToSubmissions }) => {
  const {
    currentUser,
    searchQuery,
    getAdminAssignments,
    getAssignmentSubmissionSummary,
    deleteAssignment
  } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);

  const adminAssignments = useMemo(() => {
    return getAdminAssignments(currentUser?.id);
  }, [currentUser?.id, getAdminAssignments]);

  const filteredAssignments = useMemo(() => {
    if (!searchQuery.trim()) return adminAssignments;
    const q = searchQuery.toLowerCase();
    return adminAssignments.filter(
      a =>
        a.title.toLowerCase().includes(q) ||
        a.course.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q)
    );
  }, [adminAssignments, searchQuery]);

  const handleOpenCreate = () => {
    setEditingAssignment(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (asg) => {
    setEditingAssignment(asg);
    setIsModalOpen(true);
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete assignment "${title}"?`)) {
      deleteAssignment(id);
    }
  };

  const formatDueDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Manage Course Assignments
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Create, edit, allocate to students, and monitor coursework published by {currentUser?.name}.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/25 hover:shadow-lg transition-all shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create Assignment</span>
        </button>
      </div>

      {/* Assignments Table */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-soft-card overflow-hidden">
        {filteredAssignments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-4 pl-6">Course & Title</th>
                  <th className="py-4 px-4">Due Date</th>
                  <th className="py-4 px-4">Student Allocation</th>
                  <th className="py-4 px-4">Class Progress</th>
                  <th className="py-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                {filteredAssignments.map((asg) => {
                  const summary = getAssignmentSubmissionSummary(asg.id);
                  const isAll = asg.assignedTo === 'ALL' || asg.assignedStudentIds?.length === 5;

                  return (
                    <tr
                      key={asg.id}
                      className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                    >
                      {/* Title & Description */}
                      <td className="py-4 pl-6 max-w-sm">
                        <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 block">
                          {asg.course}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5 truncate">
                          {asg.title}
                        </h3>
                        <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                          {asg.description}
                        </p>
                      </td>

                      {/* Due Date */}
                      <td className="py-4 px-4 whitespace-nowrap text-slate-600 dark:text-slate-300 font-medium">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {formatDueDate(asg.dueDate)}
                        </span>
                      </td>

                      {/* Allocation */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                          <Users className="w-3 h-3 text-slate-400" />
                          {isAll ? 'All 5 Students' : `${asg.assignedStudentIds?.length || 0} Selected`}
                        </span>
                      </td>

                      {/* Progress Bar */}
                      <td className="py-4 px-4 min-w-[170px]">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-[11px] font-semibold">
                            <span className="text-slate-600 dark:text-slate-400">
                              {summary.submitted} of {summary.total}
                            </span>
                            <span className="text-blue-600 dark:text-blue-400 font-bold">
                              {summary.percentage}%
                            </span>
                          </div>
                          <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-600 rounded-full transition-all duration-300"
                              style={{ width: `${summary.percentage}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 pr-6 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => onNavigateToSubmissions && onNavigateToSubmissions(asg.id)}
                            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-50 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-500/25 transition-colors border border-blue-200/80 dark:border-blue-800/40"
                          >
                            Submissions
                          </button>
                          <a
                            href={asg.driveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Open Google Drive folder"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                          <button
                            onClick={() => handleOpenEdit(asg)}
                            title="Edit assignment"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(asg.id, asg.title)}
                            title="Delete assignment"
                            className="p-1.5 rounded-lg text-rose-400 hover:text-rose-600 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-3">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
              No assignments found
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1 mb-4">
              Click the button below to publish your first assignment for this cohort.
            </p>
            <button
              onClick={handleOpenCreate}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm"
            >
              + Create Assignment
            </button>
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      <CreateAssignmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={editingAssignment}
      />
    </div>
  );
};

export default ManageAssignmentsView;

