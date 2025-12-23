
import React from 'react';
import { UserRole, Notice, Alert, EventRequest, UserProfile, ClassSection } from '../types';
import StatsCard from './StatsCard';
import NoticeCard from './NoticeCard';
import AlertCard from './AlertCard';
import EventRequestsView from './EventRequestsView';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  role: UserRole;
  profile: UserProfile;
  notices: Notice[];
  alerts: Alert[];
  requests: EventRequest[];
  activeClass: ClassSection;
  onClassChange: (c: ClassSection) => void;
  onRequestAction: (id: string, status: 'approved' | 'rejected') => void;
  onOpenEventModal: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ role, profile, notices, alerts, requests, activeClass, onClassChange, onRequestAction, onOpenEventModal }) => {
  const chartData = [
    { name: 'Sem 1', val: 3.2 }, { name: 'Sem 2', val: 3.4 }, { name: 'Sem 3', val: 3.3 },
    { name: 'Sem 4', val: 3.6 }, { name: 'Sem 5', val: 3.8 }
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-white">Welcome, <span className="text-indigo-500">{profile.name}</span></h1>
          <p className="text-gray-400 mt-1 italic font-medium">Monitoring campus node as: <span className="text-indigo-400 font-bold">{role}</span></p>
        </div>
        <div className="hidden md:flex bg-gray-900/50 p-1 rounded-2xl border border-gray-800">
          {(['CSE-A', 'CSE-B', 'CSE-C'] as ClassSection[]).map(c => (
            <button key={c} onClick={() => onClassChange(c)} className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${activeClass === c ? 'bg-indigo-600 text-white' : 'text-gray-500'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard label="Attendance" value="82%" trend="+2%" />
        <StatsCard label="GPA" value="3.85" color="emerald" />
        <StatsCard label="Alerts" value={alerts.length} color="red" />
        <StatsCard label="Peers" value="64" color="orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="glass p-8 rounded-[2.5rem] h-80">
            <h3 className="text-xl font-bold mb-6">Academic Trajectory</h3>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <XAxis dataKey="name" stroke="#4b5563" fontSize={10} />
                <YAxis hide />
                <Tooltip contentStyle={{ background: '#111827', border: 'none', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="val" stroke="#6366f1" fill="#6366f120" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <h3 className="text-xl font-bold flex items-center gap-2">
            <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
            Critical Notices
          </h3>
          <div className="space-y-4">
            {notices.slice(0, 3).map(n => <NoticeCard key={n.id} notice={n} />)}
          </div>
        </div>

        <div className="space-y-8">
          <div className="glass p-6 rounded-3xl border-2 border-dashed border-indigo-500/30 bg-indigo-500/5">
            <p className="text-sm font-bold text-indigo-400 mb-2 uppercase">Propose Event</p>
            <p className="text-xs text-gray-400 mb-4">Coordinate a class trip or technical seminar.</p>
            <button onClick={onOpenEventModal} className="w-full py-3 bg-indigo-600 rounded-2xl font-bold text-sm shadow-xl hover:scale-105 transition-all">
              Initiate Request
            </button>
          </div>

          <h3 className="text-xl font-bold flex items-center gap-2">
            <span className="w-1.5 h-6 bg-red-600 rounded-full"></span>
            System Alerts
          </h3>
          <div className="space-y-4">
            {alerts.map(a => <AlertCard key={a.id} alert={a} />)}
          </div>
        </div>
      </div>
      
      {role === UserRole.ADMIN && <EventRequestsView requests={requests} onAction={onRequestAction} />}
    </div>
  );
};

export default Dashboard;
