
import React from 'react';
import { UserRole, UserProfile, ChatChannel } from '../types';

interface SidebarProps {
  currentRole: UserRole;
  profile: UserProfile;
  activeView: string;
  onViewChange: (view: string) => void;
  onOpenChat: (channel?: ChatChannel) => void;
  onLogout?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentRole, profile, activeView, onViewChange, onOpenChat, onLogout }) => {
  const hasAccessToCRExclusive = [UserRole.TEACHER, UserRole.CR, UserRole.ADMIN].includes(currentRole);
  const showAnalytics = currentRole !== UserRole.STUDENT;

  const menuItems = [
    { id: 'dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', label: 'Dashboard' },
    { id: 'notices', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9', label: 'Notices' },
    { id: 'chat', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z', label: 'General Chat', action: () => onOpenChat(ChatChannel.GENERAL) },
    ...(hasAccessToCRExclusive ? [{ id: 'exclusive-chat', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', label: 'CR Exclusive Chat', action: () => onOpenChat(ChatChannel.CR_TEACHER) }] : []),
    ...(showAnalytics ? [{ id: 'analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', label: 'Analytics' }] : []),
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-gray-900 border-r border-gray-800 transition-all">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">Smart<span className="text-indigo-600">Hub</span></h1>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {menuItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.action) {
                  item.action();
                } else {
                  onViewChange(item.id);
                }
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-semibold rounded-lg transition-colors ${
                isActive 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-gray-400 hover:bg-gray-800'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-gray-800 space-y-4">
        <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-2xl">
           <img src={profile.avatar} alt="User" className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500" />
           <div className="flex-1 min-w-0">
             <p className="text-xs font-bold text-white truncate">{profile.name}</p>
             <p className="text-[10px] text-gray-400 truncate uppercase tracking-widest font-bold">{currentRole}</p>
           </div>
        </div>

        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-3 text-sm font-bold text-red-500 hover:bg-red-900/10 rounded-xl transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
