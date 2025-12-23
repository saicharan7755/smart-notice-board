
import { NoticePriority, UserRole, Notice, Alert, ChatMessage, EventRequest, ChatChannel } from './types';

// Helper to get date strings relative to today
const getRelativeDate = (daysAgo: number) => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
};

const getFutureDate = (daysAhead: number) => {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return d.toISOString().split('T')[0];
};

export const INITIAL_NOTICES: Notice[] = [
  {
    id: '1',
    title: 'Mid-Term Examination Schedule Released',
    content: 'The mid-term examinations for the current semester will commence shortly. Please check the portal for your individual schedules and venue assignments.',
    summary: 'Mid-term exams schedule released. Check portal for individual details.',
    priority: NoticePriority.CRITICAL,
    targetAudience: 'All Students',
    deadline: getFutureDate(15),
    createdAt: getRelativeDate(1),
    author: 'Registrar Office'
  },
  {
    id: '2',
    title: 'Smart Hub Hackathon: Registration Closing',
    content: 'Final call for the Smart Academic Hackathon registrations! Teams must submit their project abstracts by the end of this week.',
    summary: 'Hackathon registration deadline is approaching fast.',
    priority: NoticePriority.HIGH,
    targetAudience: 'Engineering Students',
    deadline: getFutureDate(3),
    createdAt: getRelativeDate(0),
    author: 'Innovation Hub'
  },
  {
    id: '3',
    title: 'Scheduled Campus Maintenance: Library',
    content: 'Maintenance will occur in the central library this weekend. Access to the digital lab will be limited during the morning hours.',
    summary: 'Library maintenance this weekend; digital lab access limited.',
    priority: NoticePriority.MEDIUM,
    targetAudience: 'All Staff and Students',
    deadline: getFutureDate(2),
    createdAt: getRelativeDate(2),
    author: 'Facilities Dept'
  }
];

export const INITIAL_ALERTS: Alert[] = [
  { id: 'a1', type: 'attendance', message: 'Attendance dropped below 75% in Computer Networks.', severity: 'high' },
  { id: 'a2', type: 'deadline', message: 'Assignment "Database Schema Design" is due in 12 hours.', severity: 'medium' },
  { id: 'a3', type: 'engagement', message: 'Low engagement detected in extra-curricular forum.', severity: 'low' }
];

export const INITIAL_CHATS: ChatMessage[] = [
  { 
    id: 'm1', 
    sender: 'Prof. David', 
    senderRole: UserRole.TEACHER, 
    content: 'Has everyone submitted the draft for the network project?', 
    timestamp: '10:30 AM',
    channel: ChatChannel.GENERAL
  },
  { 
    id: 'm2', 
    sender: 'Prakash (CR)', 
    senderRole: UserRole.CR, 
    content: 'Most students have, Professor. I will follow up with the rest.', 
    timestamp: '10:35 AM',
    channel: ChatChannel.GENERAL
  },
  {
    id: 'm3',
    sender: 'Prof. David',
    senderRole: UserRole.TEACHER,
    content: 'Prakash, can you meet at 4 PM to discuss the picnic logistics?',
    timestamp: '11:00 AM',
    channel: ChatChannel.CR_TEACHER
  }
];

export const INITIAL_REQUESTS: EventRequest[] = [
  {
    id: 'r1',
    title: 'Annual Departmental Picnic',
    description: 'A request for a day trip to Green Valley for the Computer Science department.',
    requester: 'Prakash',
    requesterRole: UserRole.CR,
    status: 'pending',
    createdAt: getRelativeDate(3)
  },
  {
    id: 'r2',
    title: 'Tech Symposium 2024',
    description: 'Student-led conference on Emerging AI Trends.',
    requester: 'Charan',
    requesterRole: UserRole.STUDENT,
    status: 'pending',
    createdAt: getRelativeDate(5)
  }
];

export const PRIORITY_COLORS = {
  [NoticePriority.CRITICAL]: 'bg-red-100 text-red-900 border-red-300 dark:bg-red-900/30 dark:text-red-400 dark:border-red-900/50',
  [NoticePriority.HIGH]: 'bg-orange-100 text-orange-900 border-orange-300 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-900/50',
  [NoticePriority.MEDIUM]: 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-900/50',
  [NoticePriority.LOW]: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-900/50',
};
