
import React, { useState, useEffect, useRef } from 'react';
import { UserRole, ChatMessage, UserProfile, ChatChannel } from '../types';

interface ChatWindowProps {
  currentRole: UserRole;
  profile: UserProfile;
  messages: ChatMessage[];
  onSendMessage: (content: string, channel: ChatChannel) => void;
  onClose: () => void;
  initialChannel?: ChatChannel;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ currentRole, profile, messages, onSendMessage, onClose, initialChannel }) => {
  const [inputText, setInputText] = useState('');
  const [activeChannel, setActiveChannel] = useState<ChatChannel>(initialChannel || ChatChannel.GENERAL);
  const scrollRef = useRef<HTMLDivElement>(null);

  const hasAccessToCRChannel = [UserRole.TEACHER, UserRole.CR, UserRole.ADMIN].includes(currentRole);

  useEffect(() => {
    if (initialChannel) {
      setActiveChannel(initialChannel);
    }
  }, [initialChannel]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, activeChannel]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText, activeChannel);
    setInputText('');
  };

  const filteredMessages = messages.filter(m => m.channel === activeChannel);

  return (
    <div className="fixed bottom-24 right-8 w-96 h-[550px] glass rounded-3xl shadow-2xl flex flex-col z-50 animate-in slide-in-from-bottom-5 duration-300 overflow-hidden border border-indigo-100 dark:border-indigo-900">
      {/* Header */}
      <div className={`p-4 transition-colors duration-300 ${activeChannel === ChatChannel.CR_TEACHER ? 'bg-indigo-900' : 'bg-indigo-600'} text-white flex justify-between items-center shadow-md`}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold">C</div>
          <div>
            <h3 className="text-sm font-bold">Campus Connect</h3>
            <p className="text-[10px] opacity-80">{activeChannel}</p>
          </div>
        </div>
        <button onClick={onClose} className="hover:bg-white/10 p-1 rounded-lg">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      {/* Channel Switcher */}
      {hasAccessToCRChannel && (
        <div className="flex bg-gray-100/50 dark:bg-gray-800/50 p-1 border-b border-gray-100 dark:border-gray-800">
          <button 
            onClick={() => setActiveChannel(ChatChannel.GENERAL)}
            className={`flex-1 py-2 text-[10px] font-bold rounded-xl transition-all ${
              activeChannel === ChatChannel.GENERAL 
              ? 'bg-white dark:bg-gray-700 text-indigo-600 shadow-sm' 
              : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            General
          </button>
          <button 
            onClick={() => setActiveChannel(ChatChannel.CR_TEACHER)}
            className={`flex-1 py-2 text-[10px] font-bold rounded-xl transition-all ${
              activeChannel === ChatChannel.CR_TEACHER 
              ? 'bg-white dark:bg-gray-700 text-indigo-600 shadow-sm' 
              : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            CR-Teacher Exclusive
          </button>
        </div>
      )}

      {/* Message List */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/30 dark:bg-gray-900/30">
        {filteredMessages.length === 0 ? (
          <div className="h-full flex items-center justify-center flex-col opacity-40">
             <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>
             <p className="text-xs font-medium">No messages in this channel yet.</p>
          </div>
        ) : (
          filteredMessages.map((msg) => {
            const isOwn = msg.sender === profile.name;
            return (
              <div key={msg.id} className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'} animate-in slide-in-from-bottom-2`}>
                <span className="text-[10px] text-gray-400 mb-1 px-1">{msg.sender} ({msg.senderRole})</span>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  isOwn 
                  ? `${activeChannel === ChatChannel.CR_TEACHER ? 'bg-indigo-900 shadow-indigo-900/40' : 'bg-indigo-600 shadow-indigo-500/40'} text-white rounded-tr-none shadow-lg` 
                  : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-sm border border-gray-100 dark:border-gray-700 rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
                <span className="text-[9px] text-gray-400 mt-1">{msg.timestamp}</span>
              </div>
            );
          })
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="p-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 flex gap-2">
        <input 
          type="text" 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Message ${activeChannel === ChatChannel.GENERAL ? 'everyone' : 'the teacher/CR'}...`}
          className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
        />
        <button className={`p-2 transition-colors ${activeChannel === ChatChannel.CR_TEACHER ? 'bg-indigo-900' : 'bg-indigo-600'} text-white rounded-xl shadow-lg shadow-indigo-500/30`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
