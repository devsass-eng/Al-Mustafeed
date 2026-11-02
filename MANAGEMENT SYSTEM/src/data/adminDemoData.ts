import type { OverviewMetrics, ActivityItem, AdminNotification } from '../types/admin';

export const ADMIN_METRICS: OverviewMetrics = {
  totalStudents: 330,
  totalTeachers: 9,
  totalClasses: 6,
  attendanceToday: {
    percentage: 96.4,
    presentStudents: 318,
    absentStudents: 8,
    excusedStudents: 4,
    presentTeachers: 9,
    totalTeachers: 9,
    lastUpdated: 'Today at 08:30 AM',
  },
};

export const RECENT_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act-01',
    title: 'Daily Attendance Recorded',
    description: 'Qari Abdul Rahman submitted attendance for Class Hifz-1 (55/55 present).',
    timestamp: '15 minutes ago',
    category: 'attendance',
    actor: 'Qari Abdul Rahman',
    actorRole: 'Tahfeez Teacher',
  },
  {
    id: 'act-02',
    title: 'Student Profile Enrolled',
    description: 'New student registration approved: Zayd Ibn Thabit (#AM-2026-330).',
    timestamp: '45 minutes ago',
    category: 'students',
    actor: 'Ustadh Muhammad Farooq',
    actorRole: 'Admin',
  },
  {
    id: 'act-03',
    title: 'ID Card Batch Generated',
    description: 'Digital ID cards exported for Class Hifz-4 (55 students ready for printing).',
    timestamp: '2 hours ago',
    category: 'classes',
    actor: 'Ustadh Muhammad Farooq',
    actorRole: 'Admin',
  },
  {
    id: 'act-04',
    title: 'Teacher Duty Attendance',
    description: 'All 9 Tahfeez instructors checked in for the morning session on time.',
    timestamp: '3 hours ago',
    category: 'teachers',
    actor: 'System Auto-Log',
    actorRole: 'Automated Check',
  },
  {
    id: 'act-05',
    title: 'Internal Notice Published',
    description: 'Staff briefing on upcoming monthly recitation review guidelines.',
    timestamp: 'Yesterday',
    category: 'announcements',
    actor: 'Ustadh Muhammad Farooq',
    actorRole: 'Admin',
  },
  {
    id: 'act-06',
    title: 'Scheduled System Backup',
    description: 'Full automated snapshot of student, teacher & class tables securely verified.',
    timestamp: '2 days ago',
    category: 'system',
    actor: 'Zubair Abdullah',
    actorRole: 'System Developer',
  },
];

export const ADMIN_NOTIFICATIONS: AdminNotification[] = [
  {
    id: 'notif-01',
    title: 'All Classes Attendance Complete',
    message: 'Attendance for all 6 classes today has been filed by respective instructors.',
    timestamp: '10m ago',
    isUnread: true,
    type: 'success',
  },
  {
    id: 'notif-02',
    title: 'Student Medical Leave Notice',
    message: 'Parent excused absence note received for student Bilal Ahmad (Class 3).',
    timestamp: '1h ago',
    isUnread: true,
    type: 'info',
  },
  {
    id: 'notif-03',
    title: 'System Security Sync',
    message: 'Weekly institutional data encryption integrity checks completed with 0 errors.',
    timestamp: '1d ago',
    isUnread: false,
    type: 'info',
  },
];

export const NAV_ITEMS = [
  { id: 'teachers', label: 'Teachers', icon: 'UserCheck', description: 'Faculty profiles & class assignments' },
  { id: 'students', label: 'Students', icon: 'GraduationCap', description: 'Enrolment directory & student records' },
  { id: 'classes', label: 'Classes', icon: 'Layers', description: 'Tahfeez halaqahs & class allocations' },
  { id: 'attendance', label: 'Attendance', icon: 'CalendarCheck', description: 'Daily attendance logs & history' },
  { id: 'reports', label: 'Reports', icon: 'FileText', description: 'Institutional data & ID card exports' },
  { id: 'announcements', label: 'Announcements', icon: 'Megaphone', description: 'Staff notices & internal circulars' },
  { id: 'public-site', label: 'Public Site', icon: 'Globe', description: 'Public content & admissions portal' },
  { id: 'settings', label: 'Settings', icon: 'Settings', description: 'System preferences & admin tools' },
] as const;

