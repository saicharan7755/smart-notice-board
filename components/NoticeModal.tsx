
import React, { useState } from 'react';
import { Notice, NoticePriority, ClassSection } from '../types';
import { summarizeNotice } from '../services/geminiService';

interface NoticeModalProps {
  onClose: () => void;
  onSave: (notice: Notice) => void;
  author: string;
}

const NoticeModal: React.FC<NoticeModalProps> = ({ onClose, onSave, author }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState<NoticePriority>(NoticePriority.MEDIUM);
  const [targetClass, setTargetClass] = useState<ClassSection>('All');
  const [audience, setAudience] = useState('All Students');
  const [deadline, setDeadline] = useState('');
  const [summary, setSummary] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);

  const handleSummarize = async () => {
    if (!content.trim()) return;
    setIsSummarizing(true);
    const result = await summarizeNotice(content);
    setSummary(result);
    setIsSummarizing(false);
  };

  const handleSave = () => {
    if (!title || !content) return;
    const newNotice: Notice = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      content,
      summary,
      priority,
      targetAudience: audience,
      targetClass,
      deadline: deadline || undefined,
      createdAt: new Date().toISOString().split('T')[0],
      author
    };
    onSave(newNotice);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="glass w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 border border-white/10">
        <div className="px-8 py-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Compose Smart Notice</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        <div className="p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Notice Title</label>
            <input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-800/60 border border-transparent dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-white transition-all" 
              placeholder="e.g. Laboratory Session Update"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Priority</label>
              <select 
                value={priority}
                onChange={(e) => setPriority(e.target.value as NoticePriority)}
                className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-800/60 border border-transparent dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                {Object.values(NoticePriority).map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Target Class</label>
              <select 
                value={targetClass}
                onChange={(e) => setTargetClass(e.target.value as ClassSection)}
                className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-800/60 border border-transparent dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="All">All Classes</option>
                <option value="CSE-A">CSE-A</option>
                <option value="CSE-B">CSE-B</option>
                <option value="CSE-C">CSE-C</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Deadline</label>
              <input 
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-800/60 border border-transparent dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-end">
               <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Description</label>
               <button 
                  onClick={handleSummarize}
                  disabled={isSummarizing || !content}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500/10 text-indigo-400 rounded-xl text-[10px] font-black uppercase hover:bg-indigo-500/20 transition-all border border-indigo-500/20 disabled:opacity-50"
               >
                 {isSummarizing ? (
                   <div className="w-3 h-3 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                 ) : (
                   <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                 )}
                 Generate AI Insights
               </button>
            </div>
            <textarea 
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-800/60 border border-transparent dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none text-white transition-all"
              placeholder="Provide full details here..."
            />
          </div>

          {summary && (
            <div className="space-y-2 animate-in slide-in-from-top-2">
              <label className="text-xs font-black text-indigo-500 uppercase tracking-widest">AI Generated Summary</label>
              <div className="p-5 bg-indigo-500/5 border border-indigo-500/20 rounded-2xl italic text-sm text-indigo-300 leading-relaxed">
                "{summary}"
              </div>
            </div>
          )}
        </div>

        <div className="px-8 py-6 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-2.5 font-bold text-gray-500 hover:text-gray-700 transition-colors">Cancel</button>
          <button 
            onClick={handleSave}
            className="px-10 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl transition-all transform active:scale-95"
          >
            Publish Notice
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoticeModal;
