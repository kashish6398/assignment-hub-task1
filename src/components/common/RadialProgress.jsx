import React from 'react';

const RadialProgress = ({
  percentage = 0,
  size = 72,
  strokeWidth = 6.5,
  color = '#2563EB',
  trackColor = null,
  showValue = true,
  valueText = null,
  label = null
}) => {
  const validPercentage = Math.min(100, Math.max(0, percentage));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (validPercentage / 100) * circumference;

  return (
    <div className="inline-flex flex-col items-center justify-center">
      <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={trackColor || 'currentColor'}
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-slate-200/80 dark:text-slate-800 transition-colors"
          />
          {/* Animated Value Ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Center Text */}
        {showValue && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 tracking-tight">
              {valueText !== null ? valueText : `${validPercentage}%`}
            </span>
          </div>
        )}
      </div>
      {label && (
        <span className="mt-1 text-[11px] font-medium text-slate-500 dark:text-slate-400">
          {label}
        </span>
      )}
    </div>
  );
};

export default RadialProgress;

