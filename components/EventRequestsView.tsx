
import React from 'react';
import { EventRequest, UserRole } from '../types';

interface EventRequestsViewProps {
  requests: EventRequest[];
  onAction: (id: string, status: 'approved' | 'rejected') => void;
}

const EventRequestsView: React.FC<EventRequestsViewProps> = ({ requests, onAction }) => {
  return (
    <div className="glass p-8 rounded-3xl space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
          Event & Trip Approvals
        </h2>
        <span className="text-xs bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400 px-3 py-1 rounded-full font-bold">
          {requests.filter(r => r.status === 'pending').length} Pending
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {requests.length === 0 ? (
          <p className="text-gray-500 text-sm italic">No pending requests at this time.</p>
        ) : (
          requests.map((request) => (
            <div key={request.id} className="p-5 border border-gray-100 dark:border-gray-800 rounded-2xl bg-white/50 dark:bg-gray-900/50 hover:shadow-lg transition-all group">
              <div className="flex justify-between items-start mb-3">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                  request.status === 'pending' ? 'bg-orange-100 text-orange-700' : 
                  request.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                }`}>
                  {request.status}
                </span>
                <span className="text-xs text-gray-400">{request.createdAt}</span>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">{request.title}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{request.description}</p>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-[10px] font-bold text-indigo-600">
                  {request.requester.charAt(0)}
                </div>
                <div className="text-[10px]">
                  <p className="font-bold text-gray-800 dark:text-gray-200">{request.requester}</p>
                  <p className="text-gray-500">{request.requesterRole}</p>
                </div>
              </div>

              {request.status === 'pending' && (
                <div className="flex gap-2">
                  <button 
                    onClick={() => onAction(request.id, 'approved')}
                    className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all"
                  >
                    Approve
                  </button>
                  <button 
                    onClick={() => onAction(request.id, 'rejected')}
                    className="flex-1 py-2 border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold rounded-xl transition-all"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EventRequestsView;
