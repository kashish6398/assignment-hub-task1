import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  ArrowUpDown,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import AssignmentRowItem from './AssignmentRowItem';
import ConfirmationModal from '../common/ConfirmationModal';

const MyAssignmentsView = () => {
  const {
    currentUser,
    submissions,
    searchQuery,
    getStudentAssignments
  } = useApp();

  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortOrder, setSortOrder] = useState('DUE_ASC'); // 'DUE_ASC' | 'DUE_DESC' | 'TITLE_ASC'
  const [activeModalAssignment, setActiveModalAssignment] = useState(null);

  const student = currentUser;
  const assignedList = useMemo(() => {
    return getStudentAssignments(student?.id);
  }, [student?.id, getStudentAssignments]);

  // Filter and sort
  const filteredAndSortedAssignments = useMemo(() => {
    let result = assignedList.filter(asg => {
      // 1. Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = asg.title.toLowerCase().includes(q);
        const matchCourse = asg.course.toLowerCase().includes(q);
        const matchDesc = asg.description.toLowerCase().includes(q);
        if (!matchTitle && !matchCourse && !matchDesc) return false;
      }

      // Find submission status
      const sub = submissions.find(
        s => s.assignmentId === asg.id && s.studentId === student?.id
      );
      const isPastDue = new Date(asg.dueDate) < new Date('2026-11-03T00:00:00.000Z');
      let effectiveStatus = sub?.status || 'Pending';
      if (effectiveStatus !== 'Submitted' && isPastDue) {
        effectiveStatus = 'Overdue';
      }

      // 2. Status filter
      if (statusFilter === 'SUBMITTED') return effectiveStatus === 'Submitted';
      if (statusFilter === 'PENDING') return effectiveStatus === 'Pending';
      if (statusFilter === 'OVERDUE') return effectiveStatus === 'Overdue';

      return true;
    });

    // Sort order
    result.sort((a, b) => {
      if (sortOrder === 'DUE_ASC') {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      if (sortOrder === 'DUE_DESC') {
        return new Date(b.dueDate) - new Date(a.dueDate);
      }
      if (sortOrder === 'TITLE_ASC') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    return result;
  }, [assignedList, submissions, student?.id, searchQuery, statusFilter, sortOrder]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            My Coursework & Assignments
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            View all assigned tasks, review submission instructions, and submit completed work.
          </p>
        </div>
      </div>

      {/* Filter & Sort Toolbar */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-slate-200/80 dark:border-white/10 shadow-soft-card flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs font-semibold px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="ALL">All Statuses ({assignedList.length})</option>
            <option value="SUBMITTED">Submitted</option>
            <option value="PENDING">Pending</option>
            <option value="OVERDUE">Overdue</option>
          </select>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5" /> Sort:
          </span>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="text-xs font-semibold px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="DUE_ASC">Due Date: Soonest First</option>
            <option value="DUE_DESC">Due Date: Latest First</option>
            <option value="TITLE_ASC">Title: A to Z</option>
          </select>
        </div>
      </div>

      {/* Assignment List */}
      {filteredAndSortedAssignments.length > 0 ? (
        <div className="space-y-3">
          {filteredAndSortedAssignments.map((asg) => {
            const submission = submissions.find(
              (s) => s.assignmentId === asg.id && s.studentId === student?.id
            );
            return (
              <AssignmentRowItem
                key={asg.id}
                assignment={asg}
                submission={submission}
                student={student}
                onOpenSubmitModal={(targetAsg) => setActiveModalAssignment(targetAsg)}
              />
            );
          })}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-10 text-center border border-slate-200/80 dark:border-white/10 shadow-soft-card">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-3">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
            No assignments match your filters
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1">
            Try resetting your status filter or clearing your search term to see all assigned coursework.
          </p>
        </div>
      )}

      {/* Two-Step Confirmation Modal */}
      {activeModalAssignment && (
        <ConfirmationModal
          isOpen={!!activeModalAssignment}
          onClose={() => setActiveModalAssignment(null)}
          assignment={activeModalAssignment}
          student={student}
        />
      )}
    </div>
  );
};

export default MyAssignmentsView;

