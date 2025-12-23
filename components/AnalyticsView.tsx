
import React from 'react';
import { UserRole } from '../types';
// Add AreaChart to the imported components from recharts
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Cell, PieChart, Pie, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ComposedChart, Area, AreaChart } from 'recharts';

interface AnalyticsViewProps {
  role: UserRole;
}

const AnalyticsView: React.FC<AnalyticsViewProps> = ({ role }) => {
  const performanceData = [
    { subject: 'Computer Networks', score: 85, fullMark: 100 },
    { subject: 'Database Systems', score: 72, fullMark: 100 },
    { subject: 'Algorithms', score: 90, fullMark: 100 },
    { subject: 'AI/ML', score: 78, fullMark: 100 },
    { subject: 'Software Eng', score: 88, fullMark: 100 },
    { subject: 'Cybersecurity', score: 65, fullMark: 100 },
  ];

  const attendanceData = [
    { name: 'Jan', attendance: 92, target: 85 },
    { name: 'Feb', attendance: 88, target: 85 },
    { name: 'Mar', attendance: 75, target: 85 },
    { name: 'Apr', attendance: 95, target: 85 },
    { name: 'May', attendance: 91, target: 85 },
  ];

  const gradeDistribution = [
    { grade: 'A+', count: 12 },
    { grade: 'A', count: 25 },
    { grade: 'B', count: 30 },
    { grade: 'C', count: 15 },
    { grade: 'D', count: 8 },
    { grade: 'F', count: 2 },
  ];

  const engagementHeatmap = [
    { time: '8am', activity: 20 },
    { time: '10am', activity: 55 },
    { time: '12pm', activity: 85 },
    { time: '2pm', activity: 70 },
    { time: '4pm', activity: 40 },
    { time: '6pm', activity: 30 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Campus Analytics Hub</h1>
          <p className="text-gray-400 mt-1">Deep analysis of class performance, engagement, and trends for {role}s.</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-lg hover:bg-indigo-700 transition-all">Export Detailed CSV</button>
           <button className="px-4 py-2 bg-gray-800 text-gray-300 border border-gray-700 rounded-xl text-xs font-bold hover:bg-gray-700 transition-all">Print Report</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Radar: Subject Mastery */}
        <div className="glass p-8 rounded-[2.5rem] flex flex-col h-96">
          <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
            <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
            Class Mastery Radar
          </h2>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={performanceData}>
                <PolarGrid stroke="#374151" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#4b5563', fontSize: 8 }} />
                <Radar
                  name="Class Average"
                  dataKey="score"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.6}
                />
                <Tooltip contentStyle={{ backgroundColor: '#111827', border: 'none', borderRadius: '12px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Composed: Attendance Trends */}
        <div className="glass p-8 rounded-[2.5rem] flex flex-col h-96">
          <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
            <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
            Monthly Attendance Analytics
          </h2>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1f2937" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} stroke="#94a3b8" />
                <YAxis axisLine={false} tickLine={false} stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#111827', border: 'none', borderRadius: '12px' }} />
                <Legend />
                <Bar dataKey="attendance" fill="#10b981" radius={[10, 10, 0, 0]} />
                <Line type="monotone" dataKey="target" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar: Grade Distribution */}
        <div className="glass p-8 rounded-[2.5rem] flex flex-col h-96">
          <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
            <span className="w-1.5 h-6 bg-orange-500 rounded-full"></span>
            Grade Distribution
          </h2>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={gradeDistribution}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1f2937" />
                <XAxis dataKey="grade" axisLine={false} tickLine={false} stroke="#94a3b8" />
                <YAxis axisLine={false} tickLine={false} stroke="#94a3b8" />
                <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ backgroundColor: '#111827', border: 'none', borderRadius: '12px' }} />
                <Bar dataKey="count" radius={[10, 10, 0, 0]}>
                  {gradeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#4f46e5' : '#818cf8'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Area: Resource Engagement Heatmap */}
        <div className="glass p-8 rounded-[2.5rem] flex flex-col h-96">
          <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
            <span className="w-1.5 h-6 bg-pink-500 rounded-full"></span>
            Portal Engagement Heatmap
          </h2>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={engagementHeatmap}>
                <defs>
                  <linearGradient id="colorAct" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1f2937" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} stroke="#94a3b8" />
                <YAxis axisLine={false} tickLine={false} stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#111827', border: 'none', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="activity" stroke="#ec4899" strokeWidth={3} fillOpacity={1} fill="url(#colorAct)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="glass p-10 rounded-[2.5rem]">
         <h2 className="text-2xl font-bold mb-6">Automated Insight Report</h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-800/50 rounded-2xl border border-gray-700">
               <p className="text-xs font-bold text-emerald-400 uppercase mb-2">Trend Strength</p>
               <h4 className="text-xl font-bold mb-1">High Momentum</h4>
               <p className="text-sm text-gray-400">Class scores in Algorithms have increased by 15% this month.</p>
            </div>
            <div className="p-6 bg-gray-800/50 rounded-2xl border border-gray-700">
               <p className="text-xs font-bold text-orange-400 uppercase mb-2">Critical Risk</p>
               <h4 className="text-xl font-bold mb-1">Attendance Drop</h4>
               <p className="text-sm text-gray-400">Section B shows a 12% decline in Monday morning attendance.</p>
            </div>
            <div className="p-6 bg-gray-800/50 rounded-2xl border border-gray-700">
               <p className="text-xs font-bold text-indigo-400 uppercase mb-2">Engagement Peak</p>
               <h4 className="text-xl font-bold mb-1">Exam Prep</h4>
               <p className="text-sm text-gray-400">Portal activity peaks consistently between 12pm and 2pm.</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
