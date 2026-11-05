import React, { useState, useMemo } from 'react';
import {
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowRight,
  BookOpen,
  Calendar,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import RadialProgress from '../common/RadialProgress';
import ConfirmationModal from '../common/ConfirmationModal';
import StatusPill from '../common/StatusPill';

const StudentDashboard = ({ onNavigateToAssignments }) => {
  const {
    currentUser,
    submissions,
    getStudentAssignments,
    getStudentStats
  } = useApp();

  const [activeModalAssignment, setActiveModalAssignment] = useState(null);

  const student = currentUser;
  const stats = useMemo(() => {
    return getStudentStats(student?.id);
  }, [student?.id, getStudentStats]);

  const assignedList = useMemo(() => {
    return getStudentAssignments(student?.id);
  }, [student?.id, getStudentAssignments]);

  // Compact preview of pending/upcoming assignments
  const pendingOrUpcoming = useMemo(() => {
    return assignedList
      .filter(asg => {
        const sub = submissions.find(
          s => s.assignmentId === asg.id && s.studentId === student?.id
        );
        return sub?.status !== 'Submitted';
      })
      .slice(0, 3);
  }, [assignedList, submissions, student?.id]);

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
    <div className="space-y-6 sm:space-y-8 pb-12 animate-in fade-in duration-200">
      {/* 1. Welcome Section & Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-blue-500/5 dark:from-blue-900/25 dark:via-indigo-900/20 dark:to-blue-950/30 border border-blue-200/70 dark:border-blue-500/20 shadow-soft-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Student Academic Workspace</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Hello, {student?.name}! 👋
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
              Track your coursework deadlines, review submission requirements via Google Drive, and monitor your personal completion milestones.
            </p>
          </div>

          {/* Overall Progress Indicator */}
          <div className="flex items-center gap-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-sm shrink-0">
            <RadialProgress
              percentage={stats.completionRate}
              size={76}
              strokeWidth={7}
              color="#2563EB"
            />
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Progress Status
              </p>
              <p className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {stats.submitted} of {stats.totalAssigned} submitted
              </p>
              <p className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold">
                {stats.completionRate}% Completed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 4-Column KPI Metric Row */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {/* Total Assigned */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-white/10 shadow-soft-card flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Total Assigned
            </p>
            <p className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              {stats.totalAssigned}
            </p>
          </div>
        </div>

        {/* Submitted */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-white/10 shadow-soft-card flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Submitted
            </p>
            <p className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              {stats.submitted}
            </p>
          </div>
        </div>

        {/* Pending */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-white/10 shadow-soft-card flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-amber-50 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Pending
            </p>
            <p className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              {stats.pending}
            </p>
          </div>
        </div>

        {/* Overdue */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-white/10 shadow-soft-card flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-rose-50 dark:bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Overdue
            </p>
            <p className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              {stats.overdue}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Compact Preview of Pending / Upcoming Assignments */}
      <section className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-slate-200/80 dark:border-white/10 shadow-soft-card space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500" />
              Pending Assignments Preview
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Assignments requiring your review or submission
            </p>
          </div>

          <button
            onClick={onNavigateToAssignments}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors"
          >
            <span>View All ({assignedList.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {pendingOrUpcoming.length > 0 ? (
          <div className="space-y-3">
            {pendingOrUpcoming.map(asg => {
              const sub = submissions.find(
                s => s.assignmentId === asg.id && s.studentId === student?.id
              );
              const isPastDue = new Date(asg.dueDate) < new Date('2026-11-03T00:00:00.000Z');
              const status = isPastDue ? 'Overdue' : 'Pending';

              return (
                <div
                  key={asg.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-blue-400/50 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400">
                      {asg.course}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                      {asg.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        Due: {formatDueDate(asg.dueDate)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <StatusPill status={status} size="sm" />
                    <button
                      onClick={() => setActiveModalAssignment(asg)}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-8 text-center">
            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
              All caught up!
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              You have submitted all assigned coursework.
            </p>
          </div>
        )}
      </section>

      {/* Confirmation Modal */}
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

export default StudentDashboard;
