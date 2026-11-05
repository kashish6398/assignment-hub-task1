import React from 'react';
import { CheckCircle2, Clock, AlertCircle, CircleDashed } from 'lucide-react';

const StatusPill = ({ status, size = 'md', showIcon = true }) => {
  const normalized = status || 'Not Started';

  const config = {
    Submitted: {
      bg: 'bg-emerald-50 dark:bg-emerald-500/15',
      text: 'text-emerald-700 dark:text-emerald-300',
      border: 'border-emerald-200/80 dark:border-emerald-800/40',
      dot: 'bg-emerald-500',
      icon: CheckCircle2,
      label: 'Submitted'
    },
    Pending: {
      bg: 'bg-amber-50 dark:bg-amber-500/15',
      text: 'text-amber-700 dark:text-amber-300',
      border: 'border-amber-200/80 dark:border-amber-800/40',
      dot: 'bg-amber-500',
      icon: Clock,
      label: 'Pending'
    },
    Overdue: {
      bg: 'bg-rose-50 dark:bg-rose-500/15',
      text: 'text-rose-700 dark:text-rose-300',
      border: 'border-rose-200/80 dark:border-rose-800/40',
      dot: 'bg-rose-500',
      icon: AlertCircle,
      label: 'Overdue'
    },
    'Not Started': {
      bg: 'bg-slate-100 dark:bg-slate-800',
      text: 'text-slate-600 dark:text-slate-400',
      border: 'border-slate-200 dark:border-slate-700',
      dot: 'bg-slate-400',
      icon: CircleDashed,
      label: 'Not Started'
    }
  };

  const current = config[normalized] || config['Not Started'];
  const Icon = current.icon;

  const sizeClasses = size === 'sm' 
    ? 'px-2 py-0.5 text-xs gap-1' 
    : 'px-2.5 py-1 text-xs font-medium gap-1.5';

  return (
    <span
      className={`inline-flex items-center rounded-full border ${current.bg} ${current.text} ${current.border} ${sizeClasses} font-medium transition-all shadow-sm`}
    >
      {showIcon && <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />}
      <span>{current.label}</span>
    </span>
  );
};

export default StatusPill;

