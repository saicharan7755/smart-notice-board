
import React from 'react';
import { Notice } from '../types';
import NoticeCard from './NoticeCard';

interface NoticesViewProps {
  notices: Notice[];
  filteredNoticeIds: string[] | null;
}

const NoticesView: React.FC<NoticesViewProps> = ({ notices, filteredNoticeIds }) => {
  const displayNotices = filteredNoticeIds 
    ? notices.filter(n => filteredNoticeIds.includes(n.id))
    : notices;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Campus Notices</h1>
          <p className="text-gray-400 mt-1">Full overview of official communications from Teachers and Admins.</p>
        </div>
        <div className="flex items-center gap-2">
           <span className="text-xs font-bold text-indigo-400 bg-indigo-900/30 px-3 py-1.5 rounded-full border border-indigo-800">
             {displayNotices.length} Notices Published
           </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 max-w-5xl mx-auto">
        {displayNotices.length === 0 ? (
          <div className="glass p-12 text-center rounded-3xl">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
               <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">No notices found</h2>
            <p className="text-gray-400">Try adjusting your search query or check back later for updates.</p>
          </div>
        ) : (
          displayNotices.map((notice) => (
            <NoticeCard key={notice.id} notice={notice} />
          ))
        )}
      </div>
    </div>
  );
};

export default NoticesView;
