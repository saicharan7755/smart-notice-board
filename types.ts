
export enum UserRole {
  STUDENT = 'Student',
  TEACHER = 'Teacher',
  ADMIN = 'Admin',
  CR = 'CR'
}

export enum NoticePriority {
  CRITICAL = 'Critical',
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low'
}

export enum ChatChannel {
  GENERAL = 'General (Students & Teachers)',
  CR_TEACHER = 'CR & Teacher Exclusive'
}

export type ClassSection = 'CSE-A' | 'CSE-B' | 'CSE-C' | 'All';

export interface Notice {
  id: string;
  title: string;
  content: string;
  summary?: string;
  priority: NoticePriority;
  targetAudience: string;
  targetClass?: ClassSection;
  rankingScore?: number;
  deadline?: string;
  createdAt: string;
  author: string;
}

export interface Alert {
  id: string;
  type: 'attendance' | 'deadline' | 'engagement';
  message: string;
  severity: 'high' | 'medium' | 'low';
}

export interface ChatMessage {
  id: string;
  sender: string;
  senderRole: UserRole;
  content: string;
  timestamp: string;
  channel: ChatChannel;
}

export interface EventRequest {
  id: string;
  title: string;
  description: string;
  requester: string;
  requesterRole: UserRole;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface UserProfile {
  name: string;
  avatar: string;
}
