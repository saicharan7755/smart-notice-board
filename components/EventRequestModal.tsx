
import React, { useState } from 'react';

interface EventRequestModalProps {
  onClose: () => void;
  onSave: (title: string, description: string) => void;
}

const EventRequestModal: React.FC<EventRequestModalProps> = ({ onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    if (!title || !description) return;
    onSave(title, description);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="glass w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="px-8 py-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Request Event/Trip</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Event Title</label>
            <input 
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              placeholder="e.g. Annual Class Picnic 2024"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Description & Logistics</label>
            <textarea 
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-5 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
              placeholder="Detail the purpose, proposed dates, and approximate head count..."
            />
          </div>

          <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800">
            <p className="text-xs text-indigo-700 dark:text-indigo-300 leading-relaxed">
              <strong>Note:</strong> Your request will be sent to the Admin Hub for review. Ensure you have gathered preliminary interest from your classmates before submitting.
            </p>
          </div>
        </div>

        <div className="px-8 py-6 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-2.5 font-bold text-gray-500 hover:text-gray-700 transition-colors">Cancel</button>
          <button 
            onClick={handleSave}
            disabled={!title || !description}
            className="px-8 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-none transition-all active:scale-95"
          >
            Submit Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventRequestModal;
