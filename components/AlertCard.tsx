
import React from 'react';
import { Alert } from '../types';

interface AlertCardProps {
  alert: Alert;
}

const AlertCard: React.FC<AlertCardProps> = ({ alert }) => {
  const severityColors = {
    high: 'border-red-600 bg-red-100 dark:bg-red-900/10 text-red-900 dark:text-red-400 shadow-sm',
    medium: 'border-orange-600 bg-orange-100 dark:bg-orange-900/10 text-orange-900 dark:text-orange-400 shadow-sm',
    low: 'border-blue-600 bg-blue-100 dark:bg-blue-900/10 text-blue-900 dark:text-blue-400 shadow-sm',
  };

  const icons = {
    attendance: <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />,
    deadline: <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
    engagement: <path d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
  };

  return (
    <div className={`p-4 rounded-2xl border-l-4 transition-all hover:scale-[1.02] ${severityColors[alert.severity]}`}>
      <div className="flex gap-3">
        <div className="mt-0.5">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            {icons[alert.type]}
          </svg>
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest mb-0.5 opacity-90">{alert.type}</p>
          <p className="text-sm font-bold leading-snug">{alert.message}</p>
          <button className="mt-2 text-xs font-black underline hover:opacity-80 decoration-2">Take Action &rarr;</button>
        </div>
      </div>
    </div>
  );
};

export default AlertCard;
