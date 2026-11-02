export type AdminTab =
  | 'overview'
  | 'teachers'
  | 'students'
  | 'classes'
  | 'attendance'
  | 'reports'
  | 'announcements'
  | 'public-site'
  | 'settings';

export interface OverviewMetrics {
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  attendanceToday: {
    percentage: number;
    presentStudents: number;
    absentStudents: number;
    excusedStudents: number;
    presentTeachers: number;
    totalTeachers: number;
    lastUpdated: string;
  };
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  category: 'attendance' | 'students' | 'teachers' | 'classes' | 'announcements' | 'system';
  actor: string;
  actorRole: string;
}

export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isUnread: boolean;
  type: 'info' | 'success' | 'alert';
}
