import type { DemoUser } from '../types/auth';

/**
 * DEMONSTRATION ACCOUNTS
 * Used strictly for frontend authentication simulation during initial development phase.
 * Note: Password for all demonstration accounts is: admin123 (or teacher123 for teacher)
 */
export const DEMO_USERS: (DemoUser & { passwords: string[] })[] = [
  {
    id: 'user-dev-01',
    name: 'Zubair Abdullah (Lead Engineer)',
    username: 'dev',
    email: 'dev@al-mustafeed.edu',
    role: 'dev',
    roleTitle: 'System Developer',
    avatarInitials: 'ZA',
    passwords: ['admin123', 'dev123', 'password'],
    responsibilities: [
      'Creates & manages Admin accounts',
      'Monitors system status, security logs & uptime',
      'Technical oversight (no student/teacher operational records)'
    ]
  },
  {
    id: 'user-admin-01',
    name: 'Ustadh Muhammad Farooq (Principal Admin)',
    username: 'admin',
    email: 'admin@al-mustafeed.edu',
    role: 'admin',
    roleTitle: 'Institution Administrator',
    avatarInitials: 'MF',
    passwords: ['admin123', 'password'],
    responsibilities: [
      'Manages students, teachers & class allocations',
      'Oversees attendance records & generates reports',
      'Generates student ID cards & publishes announcements',
      'Manages public website content & backups'
    ]
  },
  {
    id: 'user-teacher-01',
    name: 'Qari Abdul Rahman (Hifz Instructor)',
    username: 'teacher',
    email: 'teacher@al-mustafeed.edu',
    role: 'teacher',
    roleTitle: 'Tahfeez Teacher',
    avatarInitials: 'AR',
    passwords: ['teacher123', 'admin123', 'password'],
    responsibilities: [
      'Views assigned students and classes',
      'Records daily student attendance',
      'Reviews attendance history & student reports',
      'Reads administration announcements'
    ]
  }
];

export const DEMO_CREDENTIALS_HINT = [
  { role: 'Dev', username: 'dev', email: 'dev@al-mustafeed.edu', pass: 'admin123', badgeColor: 'bg-purple-100 text-purple-800 border-purple-200' },
  { role: 'Admin', username: 'admin', email: 'admin@al-mustafeed.edu', pass: 'admin123', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  { role: 'Teacher', username: 'teacher', email: 'teacher@al-mustafeed.edu', pass: 'teacher123', badgeColor: 'bg-amber-100 text-amber-800 border-amber-200' },
];
