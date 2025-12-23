
import React, { useState } from 'react';
import { Notice, NoticePriority } from '../types';
import { PRIORITY_COLORS } from '../constants';

interface NoticeCardProps {
  notice: Notice;
  compact?: boolean;
}

const NoticeCard: React.FC<NoticeCardProps> = ({ notice, compact }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Score color calculation
  const getScoreColor = (score: number) => {
    if (score > 80) return 'text-red-500 bg-red-500/10 border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.2)]';
    if (score > 50) return 'text-orange-500 bg-orange-500/10 border-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.2)]';
    return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]';
  };

  return (
    <div className={`glass border-l-4 p-5 rounded-3xl transition-all hover:shadow-xl ${isExpanded ? 'scale-[1.01]' : ''} ${notice.priority === NoticePriority.CRITICAL ? 'border-l-red-600' : notice.priority === NoticePriority.HIGH ? 'border-l-orange-500' : 'border-l-indigo-600 shadow-sm'}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest border ${PRIORITY_COLORS[notice.priority]}`}>
              {notice.priority}
            </span>
            {notice.targetClass && (
              <span className="text-[10px] font-bold px-2 py-1 bg-gray-800 text-gray-400 rounded-full border border-gray-700 uppercase">
                {notice.targetClass}
              </span>
            )}
            <span className="text-xs text-slate-500 dark:text-gray-400 font-bold uppercase tracking-tight">{notice.createdAt}</span>
          </div>
          <h3 className={`font-extrabold text-slate-900 dark:text-white leading-tight ${compact ? 'text-sm' : 'text-xl'}`}>{notice.title}</h3>
          
          {!compact && (
            <div className="mt-3">
              <p className={`text-sm text-slate-700 dark:text-gray-300 font-medium leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
                {notice.content}
              </p>
              
              {notice.summary && isExpanded && (
                <div className="mt-4 p-5 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-2xl border border-indigo-200 dark:border-indigo-800 shadow-inner">
                  <p className="text-xs font-black text-indigo-900 dark:text-indigo-400 mb-2 flex items-center gap-1 uppercase tracking-widest">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /></svg>
                    AI Executive Summary
                  </p>
                  <p className="text-sm text-indigo-950 dark:text-indigo-200 leading-relaxed italic font-medium">
                    "{notice.summary}"
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="flex flex-col items-end gap-3">
          {notice.rankingScore && (
             <div className={`w-14 h-14 rounded-2xl border flex flex-col items-center justify-center transition-all hover:scale-105 ${getScoreColor(notice.rankingScore)}`}>
               <span className="text-[8px] font-black uppercase opacity-60">AI Rank</span>
               <span className="text-lg font-black tracking-tighter">{notice.rankingScore}</span>
             </div>
          )}
          
          {!compact && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 bg-slate-100 hover:bg-indigo-100 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-xl transition-all flex-shrink-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-slate-600 dark:text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
        </div>
      </div>
      
      {!compact && (
        <div className="mt-4 flex items-center justify-between pt-4 border-t border-slate-200 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <img src={`https://picsum.photos/seed/${notice.author}/40/40`} className="w-8 h-8 rounded-full border border-slate-200 shadow-sm" alt="Author" />
            <span className="text-xs font-bold text-slate-700 dark:text-gray-400">{notice.author}</span>
          </div>
          {notice.deadline && (
            <div className="flex items-center gap-1.5 text-[10px] font-black text-red-600 bg-red-50 dark:bg-red-950/20 px-3 py-1.5 rounded-xl border border-red-100 dark:border-red-900/30 uppercase tracking-wider">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth={3} /></svg>
              DEADLINE: {notice.deadline}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NoticeCard;
