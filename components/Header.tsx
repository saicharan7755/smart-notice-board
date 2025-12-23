
import React, { useState, useEffect } from 'react';
import { UserRole, Notice, UserProfile, ChatChannel } from '../types';
import { searchNotices } from '../services/geminiService';

interface HeaderProps {
  role: UserRole;
  profile: UserProfile;
  onSearch: (ids: string[] | null) => void;
  notices: Notice[];
  insight: string;
  onOpenProfile: () => void;
  onOpenChat: (channel?: ChatChannel) => void;
}

const Header: React.FC<HeaderProps> = ({ role, profile, onSearch, notices, insight, onOpenProfile, onOpenChat }) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const hasAccessToCRExclusive = [UserRole.TEACHER, UserRole.CR, UserRole.ADMIN].includes(role);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      onSearch(null);
      return;
    }
    setIsSearching(true);
    const resultIds = await searchNotices(query, notices);
    onSearch(resultIds);
    setIsSearching(false);
  };

  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  return (
    <header className="sticky top-0 z-30 flex flex-col glass border-b border-gray-800">
      <div className="flex items-center justify-between px-4 md:px-8 h-16">
        <div className="flex items-center flex-1 max-w-lg">
          <form onSubmit={handleSearch} className="relative w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              {isSearching ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-indigo-500 border-t-transparent"></div>
              ) : (
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
            </span>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-xl leading-5 bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm transition-all"
              placeholder='Search notices... (e.g. "show urgent", "exams")'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
        </div>

        <div className="flex items-center gap-2 md:gap-4 ml-4">
          <div className="hidden xl:flex flex-col items-end mr-4 border-r border-gray-800 pr-6">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 leading-none mb-1">System Time</p>
            <p className="text-sm font-mono font-bold text-white tabular-nums">
              {formattedTime}
            </p>
          </div>

          {hasAccessToCRExclusive && (
            <button 
              onClick={() => onOpenChat(ChatChannel.CR_TEACHER)}
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-indigo-900/40 text-indigo-300 rounded-xl text-xs font-bold hover:bg-indigo-900/60 transition-colors border border-indigo-800"
              title="Open CR Exclusive Channel"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              CR Exclusive Chat
            </button>
          )}

          <button 
            onClick={onOpenProfile}
            className="flex items-center gap-3 p-1 hover:bg-gray-800 rounded-2xl transition-all"
          >
            <div className="hidden md:block text-right">
              <p className="text-sm font-bold text-white">{profile.name}</p>
              <p className="text-xs text-gray-400">{role}</p>
            </div>
            <img src={profile.avatar} className="w-10 h-10 rounded-full border-2 border-indigo-500 p-0.5 object-cover shadow-sm" alt="User avatar" />
          </button>
        </div>
      </div>
      
      {/* Daily Insight Banner with Integrated Date */}
      <div className="bg-indigo-500/10 px-4 md:px-8 py-2 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="flex-shrink-0 bg-indigo-600 text-[10px] font-bold text-white px-2 py-0.5 rounded uppercase tracking-wider">AI Insight</span>
          <p className="text-xs md:text-sm text-indigo-400 font-medium truncate italic">
            "{insight}"
          </p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest border-l border-gray-800 pl-4">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          {formattedDate}
        </div>
      </div>
    </header>
  );
};

export default Header;
