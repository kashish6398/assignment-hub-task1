import React from 'react';
import {
  Calendar,
  ExternalLink,
  Code2,
  Palette,
  Server,
  Network,
  Presentation,
  CheckCircle2,
  FileCheck2,
  AlertCircle
} from 'lucide-react';
import StatusPill from '../common/StatusPill';

const categoryIcons = {
  React: { icon: Code2, bg: 'bg-blue-50 dark:bg-blue-500/15', text: 'text-blue-600 dark:text-blue-400' },
  'UI/UX': { icon: Palette, bg: 'bg-pink-50 dark:bg-pink-500/15', text: 'text-pink-600 dark:text-pink-400' },
  Testing: { icon: FileCheck2, bg: 'bg-emerald-50 dark:bg-emerald-500/15', text: 'text-emerald-600 dark:text-emerald-400' },
  Cloud: { icon: Network, bg: 'bg-purple-50 dark:bg-purple-500/15', text: 'text-purple-600 dark:text-purple-400' },
  API: { icon: Server, bg: 'bg-indigo-50 dark:bg-indigo-500/15', text: 'text-indigo-600 dark:text-indigo-400' },
  Presentation: { icon: Presentation, bg: 'bg-amber-50 dark:bg-amber-500/15', text: 'text-amber-600 dark:text-amber-400' },
};

const AssignmentRowItem = ({
  assignment,
  submission,
  student,
  onOpenSubmitModal
}) => {
  const categoryConfig = categoryIcons[assignment.category] || categoryIcons.React;
  const CategoryIcon = categoryConfig.icon;

  // Determine effective status
  const isPastDue = new Date(assignment.dueDate) < new Date('2026-11-03T00:00:00.000Z');
  let effectiveStatus = submission?.status || 'Pending';
  if (effectiveStatus !== 'Submitted' && isPastDue) {
    effectiveStatus = 'Overdue';
  }

  const isSubmitted = effectiveStatus === 'Submitted';

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
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-white/10 hover:border-blue-400/60 dark:hover:border-blue-500/40 shadow-soft-card transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
      {/* Left: Icon + Title + Description */}
      <div className="flex items-start gap-3.5 flex-1 min-w-0">
        <div className={`w-11 h-11 rounded-xl ${categoryConfig.bg} ${categoryConfig.text} flex items-center justify-center shrink-0 shadow-sm`}>
          <CategoryIcon className="w-5 h-5" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400">
              {assignment.course}
            </span>
          </div>

          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug truncate">
            {assignment.title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
            {assignment.description}
          </p>

          {isSubmitted && submission?.submittedAt && (
            <div className="mt-1.5 flex items-center gap-1.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>
                Submitted on {new Date(submission.submittedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Right: Due Date + Status Pill + Action Buttons */}
      <div className="flex flex-wrap items-center justify-between md:justify-end gap-3 sm:gap-4 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
        {/* Due Date */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span className={effectiveStatus === 'Overdue' ? 'text-rose-600 dark:text-rose-400 font-semibold' : ''}>
            {formatDueDate(assignment.dueDate)}
          </span>
        </div>

        {/* Status Pill */}
        <StatusPill status={effectiveStatus} />

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* External Google Drive Link */}
          <a
            href={assignment.driveUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Open submission folder in Google Drive"
            className="p-2 rounded-xl text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors border border-slate-200 dark:border-slate-800"
          >
            <ExternalLink className="w-4 h-4" />
          </a>

          {/* Submission Action */}
          {isSubmitted ? (
            <button
              onClick={() => onOpenSubmitModal(assignment)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <FileCheck2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Details</span>
            </button>
          ) : (
            <button
              onClick={() => onOpenSubmitModal(assignment)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 hover:shadow-lg transition-all"
            >
              <span>Submit</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignmentRowItem;
