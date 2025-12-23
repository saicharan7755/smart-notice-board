
import React from 'react';

interface StatsCardProps {
  label: string;
  value: string | number;
  trend?: string;
  subtext?: string;
  icon?: string;
  color?: 'indigo' | 'orange' | 'emerald' | 'red';
}

const StatsCard: React.FC<StatsCardProps> = ({ label, value, trend, subtext, color = 'indigo' }) => {
  const colorMap = {
    indigo: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20',
    orange: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20',
    emerald: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20',
    red: 'text-red-600 bg-red-50 dark:bg-red-900/20',
  };

  return (
    <div className="glass p-6 rounded-3xl transition-all hover:shadow-xl hover:-translate-y-1">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400">{label}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-2xl ${colorMap[color]}`}>
          <div className="w-6 h-6 flex items-center justify-center font-bold">#</div>
        </div>
      </div>
      {(trend || subtext) && (
        <div className="mt-4 flex items-center gap-2">
          {trend && (
            <span className={`text-xs font-bold px-2 py-1 rounded-full bg-green-900/30 text-green-400`}>
              {trend}
            </span>
          )}
          {subtext && <span className="text-xs text-gray-400">{subtext}</span>}
        </div>
      )}
    </div>
  );
};

export default StatsCard;
