export type UserRole = 'student' | 'admin';

export type DriveStatus = 'upcoming' | 'ongoing' | 'completed' | 'closed';

export type ApplicationStatus = 'registered' | 'applied' | 'shortlisted' | 'interviewing' | 'selected' | 'rejected';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department?: string;
  batch?: string;
  avatar?: string;
}

export interface Company {
  id: string;
  name: string;
  logo?: string;
  location: string;
  role: string;
  ctc: string;
  driveDate: string;
  status: DriveStatus;
  registeredCount: number;
  description?: string;
  eligibility?: EligibilityCriteria;
  selectionProcess?: SelectionStep[];
  applicationStatus?: ApplicationStatus;
}

export interface EligibilityCriteria {
  cgpa: string;
  branches: string[];
  backlogsAllowed: number;
  classRequirement: string;
}

export interface SelectionStep {
  id: number;
  title: string;
  description: string;
  duration?: string;
  isCompleted?: boolean;
  isCurrent?: boolean;
}

export interface Message {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  userAvatar?: string;
  content: string;
  timestamp: Date;
  isPinned?: boolean;
  isAdmin?: boolean;
}

export interface DiscussionThread {
  companyId: string;
  messages: Message[];
}

export interface StatsCard {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
}
