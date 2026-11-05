import React, { useState, useMemo } from 'react';
import {
  Layers,
  Users,
  CheckCircle2,
  Clock,
  Plus,
  ArrowRight,
  ExternalLink,
  BarChart2,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import RadialProgress from '../common/RadialProgress';
import CreateAssignmentModal from './CreateAssignmentModal';

const AdminDashboard = ({ onNavigateToManage, onNavigateToSubmissions }) => {
  const {
    currentUser,
    activities,
    getAdminAssignments,
    getAdminStats,
    getAssignmentSubmissionSummary
  } = useApp();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedDonutAsgId, setSelectedDonutAsgId] = useState('ALL');

  const adminAssignments = useMemo(() => {
    return getAdminAssignments(currentUser?.id);
  }, [currentUser?.id, getAdminAssignments]);

  const stats = useMemo(() => {
    return getAdminStats(currentUser?.id);
  }, [currentUser?.id, getAdminStats]);

  // Donut chart stats
  const donutStats = useMemo(() => {
    if (selectedDonutAsgId === 'ALL') {
      return {
        total: stats.totalAllocations,
        submitted: stats.submittedCount,
        pending: stats.pendingCount,
        overdue: stats.overdueCount,
        percentage: stats.completionRate
      };
    } else {
      return getAssignmentSubmissionSummary(selectedDonutAsgId);
    }
  }, [selectedDonutAsgId, stats, getAssignmentSubmissionSummary]);

  // Filter activities relevant to this admin
  const adminActivities = useMemo(() => {
    return activities.filter(act => act.adminId === currentUser?.id);
  }, [activities, currentUser?.id]);

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
      {/* 1. Greeting & Action Strip */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Good Morning, {currentUser?.name}! 🎓
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Overview of coursework created and student submissions for {currentUser?.department}.
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/25 hover:shadow-lg transition-all shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create Assignment</span>
        </button>
      </section>

      {/* 2. 5-Column Metric & Progress Strip */}
      <section className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        {/* Total Assignments Created */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-white/10 shadow-soft-card flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Assignments
            </p>
            <p className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              {stats.totalAssignments}
            </p>
          </div>
        </div>

        {/* Total Student Allocations */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-white/10 shadow-soft-card flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Allocations
            </p>
            <p className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              {stats.totalAllocations}
            </p>
          </div>
        </div>

        {/* Submissions Received */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-white/10 shadow-soft-card flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Submitted
            </p>
            <p className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              {stats.submittedCount}
            </p>
          </div>
        </div>

        {/* Pending Submissions */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-white/10 shadow-soft-card flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Pending
            </p>
            <p className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              {stats.pendingCount}
            </p>
          </div>
        </div>

        {/* Class Completion Rate */}
        <div className="col-span-2 lg:col-span-1 bg-white dark:bg-gray-900 rounded-2xl p-3 sm:p-4 border border-slate-200/80 dark:border-white/10 shadow-soft-card flex items-center justify-between sm:justify-around">
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Completion
            </p>
            <p className="text-xl font-black text-slate-900 dark:text-white">
              {stats.completionRate}%
            </p>
            <p className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold">
              Class Rate
            </p>
          </div>
          <RadialProgress
            percentage={stats.completionRate}
            size={58}
            strokeWidth={5.5}
            color="#2563EB"
          />
        </div>
      </section>

      {/* 3. Split Analytics & Recent Activity Row */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Submission Progress Donut Panel (7 Cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-gray-900 rounded-3xl p-6 border border-slate-200/80 dark:border-white/10 shadow-soft-card flex flex-col justify-between space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Submission Progress Analytics
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Detailed breakdown for assignments published by {currentUser?.name}
              </p>
            </div>

            {/* Inspect Specific Assignment */}
            <select
              value={selectedDonutAsgId}
              onChange={(e) => setSelectedDonutAsgId(e.target.value)}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none max-w-xs truncate"
            >
              <option value="ALL">All My Assignments ({adminAssignments.length})</option>
              {adminAssignments.map(a => (
                <option key={a.id} value={a.id}>
                  {a.title}
                </option>
              ))}
            </select>
          </div>

          {/* Donut Graphic & Legend */}
          <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-4">
            <div className="flex flex-col items-center">
              <RadialProgress
                percentage={donutStats.percentage}
                size={130}
                strokeWidth={12}
                color="#2563EB"
              />
              <span className="mt-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                {donutStats.submitted} of {donutStats.total} Completed
              </span>
            </div>

            {/* Legend */}
            <div className="space-y-3 w-full sm:w-auto">
              <div className="flex items-center justify-between sm:justify-start gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-600 shrink-0" />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Submitted
                  </span>
                </div>
                <span className="font-bold text-slate-900 dark:text-white">
                  {donutStats.submitted} ({donutStats.percentage}%)
                </span>
              </div>

              <div className="flex items-center justify-between sm:justify-start gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-500 shrink-0" />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Pending
                  </span>
                </div>
                <span className="font-bold text-slate-900 dark:text-white">
                  {donutStats.pending}
                </span>
              </div>

              <div className="flex items-center justify-between sm:justify-start gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500 shrink-0" />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Overdue
                  </span>
                </div>
                <span className="font-bold text-slate-900 dark:text-white">
                  {donutStats.overdue || 0}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Recent Activity Card (5 Cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-gray-900 rounded-3xl p-6 border border-slate-200/80 dark:border-white/10 shadow-soft-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Recent Activity
              </h2>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
                Live
              </span>
            </div>

            {/* Timeline */}
            <div className="space-y-3.5 max-h-72 overflow-y-auto pr-1">
              {adminActivities.length > 0 ? (
                adminActivities.slice(0, 4).map(act => (
                  <div key={act.id} className="flex items-start gap-3 text-xs">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-800 dark:text-slate-200 truncate">
                        {act.title}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                        {act.description}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                        <span>{act.timestamp}</span>
                        <span>•</span>
                        <span className="font-semibold text-blue-600 dark:text-blue-400">{act.tag}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 py-6 text-center">
                  No submissions recorded yet for your assignments.
                </p>
              )}
            </div>
          </div>

          <p className="pt-3 text-[11px] text-slate-400 border-t border-slate-100 dark:border-slate-800">
            Real-time feed updates automatically as students submit coursework.
          </p>
        </div>
      </section>

      {/* 4. Compact Assignments Summary Section */}
      <section className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-slate-200/80 dark:border-white/10 shadow-soft-card space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Coursework Published by You
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Quick view of your created assignments and submission rates
            </p>
          </div>

          <button
            onClick={onNavigateToManage}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors"
          >
            <span>Manage All ({adminAssignments.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {adminAssignments.length > 0 ? (
          <div className="space-y-3">
            {adminAssignments.slice(0, 3).map(asg => {
              const summary = getAssignmentSubmissionSummary(asg.id);
              return (
                <div
                  key={asg.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400">
                      {asg.course}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                      {asg.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Due: {formatDueDate(asg.dueDate)} • {asg.assignedStudentIds?.length || 0} Students Allocated
                    </p>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                        {summary.submitted} of {summary.total}
                      </span>
                      <span className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold">
                        {summary.percentage}% submitted
                      </span>
                    </div>

                    <button
                      onClick={() => onNavigateToSubmissions && onNavigateToSubmissions(asg.id)}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-gray-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                    >
                      View Roster
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-6 text-center text-xs text-slate-400">
            No assignments created yet.
          </div>
        )}
      </section>

      {/* Create Modal */}
      <CreateAssignmentModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </div>
  );
};

export default AdminDashboard;
