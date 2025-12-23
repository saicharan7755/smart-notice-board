
import React, { useState, useEffect } from 'react';
import { UserRole, Notice, Alert, ChatMessage, EventRequest, UserProfile, ChatChannel, ClassSection } from './types';
import { INITIAL_NOTICES, INITIAL_ALERTS, INITIAL_CHATS, INITIAL_REQUESTS } from './constants';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import NoticesView from './components/NoticesView';
import AnalyticsView from './components/AnalyticsView';
import LoginPage from './components/LoginPage';
import ChatWindow from './components/ChatWindow';
import ProfileModal from './components/ProfileModal';
import NoticeModal from './components/NoticeModal';
import EventRequestModal from './components/EventRequestModal';
import { getDailyInsight, rankNotice } from './services/geminiService';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<UserRole>(UserRole.STUDENT);
  const [activeView, setActiveView] = useState('dashboard');
  const [activeClass, setActiveClass] = useState<ClassSection>('CSE-A');
  const [profile, setProfile] = useState<UserProfile>({ name: 'User', avatar: 'https://picsum.photos/seed/user/100/100' });
  const [notices, setNotices] = useState<Notice[]>(INITIAL_NOTICES);
  const [insight, setInsight] = useState("Loading campus insights...");
  
  // State for search and UI components
  const [filteredNoticeIds, setFilteredNoticeIds] = useState<string[] | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeChatChannel, setActiveChatChannel] = useState<ChatChannel>(ChatChannel.GENERAL);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHATS);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [eventRequests, setEventRequests] = useState<EventRequest[]>(INITIAL_REQUESTS);

  useEffect(() => {
    if (isLoggedIn) {
      getDailyInsight(role).then(setInsight);
      notices.forEach(async n => {
        const score = await rankNotice(n);
        setNotices(prev => prev.map(item => item.id === n.id ? { ...item, rankingScore: score } : item));
      });
    }
  }, [isLoggedIn, role]);

  // Handle opening chat from Sidebar/Header
  const handleOpenChat = (channel?: ChatChannel) => {
    if (channel) setActiveChatChannel(channel);
    setIsChatOpen(true);
  };

  // Chat message management
  const handleSendMessage = (content: string, channel: ChatChannel) => {
    const newMessage: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      sender: profile.name,
      senderRole: role,
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      channel
    };
    setMessages(prev => [...prev, newMessage]);
  };

  // Notice creation logic
  const handleNoticeSave = (newNotice: Notice) => {
    setNotices(prev => [newNotice, ...prev]);
    setIsNoticeModalOpen(false);
    rankNotice(newNotice).then(score => {
      setNotices(prev => prev.map(item => item.id === newNotice.id ? { ...item, rankingScore: score } : item));
    });
  };

  // Event request logic
  const handleEventRequestSave = (title: string, description: string) => {
    const newRequest: EventRequest = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      description,
      requester: profile.name,
      requesterRole: role,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setEventRequests(prev => [newRequest, ...prev]);
    setIsEventModalOpen(false);
  };

  // Admin action for event requests
  const handleRequestAction = (id: string, status: 'approved' | 'rejected') => {
    setEventRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  if (!isLoggedIn) return <LoginPage onLogin={(r) => { setRole(r); setProfile({ ...profile, name: r === UserRole.STUDENT ? 'Charan' : 'Prof. David' }); setIsLoggedIn(true); }} />;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-950">
      <Sidebar 
        currentRole={role} 
        profile={profile} 
        activeView={activeView} 
        onViewChange={setActiveView} 
        onLogout={() => setIsLoggedIn(false)} 
        // Fix: Added missing onOpenChat prop
        onOpenChat={handleOpenChat}
      />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header 
          role={role} 
          profile={profile} 
          insight={insight} 
          // Fix: Added missing props and search integration
          onSearch={setFilteredNoticeIds} 
          notices={notices} 
          onOpenProfile={() => setIsProfileModalOpen(true)}
          onOpenChat={handleOpenChat}
        />
        <div className="flex-1 overflow-y-auto p-8 text-white">
          {activeView === 'dashboard' && (
            <Dashboard 
              role={role} 
              profile={profile} 
              notices={notices} 
              alerts={INITIAL_ALERTS} 
              requests={eventRequests} 
              activeClass={activeClass} 
              onClassChange={setActiveClass} 
              onRequestAction={handleRequestAction} 
              onOpenEventModal={() => setIsEventModalOpen(true)} 
            />
          )}
          {activeView === 'notices' && (
            <div className="space-y-6">
              {(role === UserRole.TEACHER || role === UserRole.ADMIN || role === UserRole.CR) && (
                <div className="flex justify-end">
                  <button 
                    onClick={() => setIsNoticeModalOpen(true)}
                    className="px-6 py-3 bg-indigo-600 rounded-2xl font-bold text-sm shadow-xl hover:scale-105 transition-all"
                  >
                    + Create Notice
                  </button>
                </div>
              )}
              <NoticesView notices={notices} filteredNoticeIds={filteredNoticeIds} />
            </div>
          )}
          {activeView === 'analytics' && <AnalyticsView role={role} />}
        </div>
        
        {/* Chat Toggle Button */}
        <button onClick={() => setIsChatOpen(!isChatOpen)} className="fixed bottom-8 right-8 w-14 h-14 bg-indigo-600 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all text-2xl z-40">
          💬
        </button>

        {/* Floating Windows and Modals */}
        {isChatOpen && (
          <ChatWindow 
            currentRole={role} 
            profile={profile} 
            messages={messages} 
            onSendMessage={handleSendMessage} 
            onClose={() => setIsChatOpen(false)} 
            initialChannel={activeChatChannel}
          />
        )}

        {isProfileModalOpen && (
          <ProfileModal 
            profile={profile} 
            onClose={() => setIsProfileModalOpen(false)} 
            onSave={(p) => { setProfile(p); setIsProfileModalOpen(false); }} 
          />
        )}

        {isNoticeModalOpen && (
          <NoticeModal 
            author={profile.name} 
            onClose={() => setIsNoticeModalOpen(false)} 
            onSave={handleNoticeSave} 
          />
        )}

        {isEventModalOpen && (
          <EventRequestModal 
            onClose={() => setIsEventModalOpen(false)} 
            onSave={handleEventRequestSave} 
          />
        )}
      </main>
    </div>
  );
};

export default App;
