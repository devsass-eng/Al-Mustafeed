import type { FC } from 'react';
import type { AdminTab } from '../../types/admin';
import {
  UserCheck,
  GraduationCap,
  Layers,
  CalendarCheck,
  FileText,
  Megaphone,
  Globe,
  Settings,
  ArrowRight,
} from 'lucide-react';

interface QuickNavGridProps {
  onSelectTab: (tab: AdminTab) => void;
}

export const QuickNavGrid: FC<QuickNavGridProps> = ({ onSelectTab }) => {
  const actions: {
    id: AdminTab;
    title: string;
    description: string;
    icon: typeof UserCheck;
    badge: string;
    color: string;
    bgIcon: string;
  }[] = [
    {
      id: 'teachers',
      title: 'Teachers',
      description: 'Faculty profiles, assignments & teacher attendance',
      icon: UserCheck,
      badge: '9 Faculty',
      color: 'text-emerald-800',
      bgIcon: 'bg-emerald-50 text-emerald-800 border-emerald-100',
    },
    {
      id: 'students',
      title: 'Students',
      description: 'Enrolment registry, admissions & student directory',
      icon: GraduationCap,
      badge: '330 Enrolled',
      color: 'text-blue-800',
      bgIcon: 'bg-blue-50 text-blue-800 border-blue-100',
    },
    {
      id: 'classes',
      title: 'Classes',
      description: 'Tahfeez halaqahs, allocations & level organisation',
      icon: Layers,
      badge: '6 Halaqahs',
      color: 'text-amber-800',
      bgIcon: 'bg-amber-50 text-amber-800 border-amber-100',
    },
    {
      id: 'attendance',
      title: 'Attendance',
      description: 'Daily attendance monitoring & historical records',
      icon: CalendarCheck,
      badge: '96.4% Today',
      color: 'text-teal-800',
      bgIcon: 'bg-teal-50 text-teal-800 border-teal-100',
    },
    {
      id: 'reports',
      title: 'Reports',
      description: 'Generate institutional reports & student ID cards',
      icon: FileText,
      badge: 'ID Cards & Data',
      color: 'text-indigo-800',
      bgIcon: 'bg-indigo-50 text-indigo-800 border-indigo-100',
    },
    {
      id: 'announcements',
      title: 'Announcements',
      description: 'Publish administrative notices to teaching faculty',
      icon: Megaphone,
      badge: 'Staff Notices',
      color: 'text-rose-800',
      bgIcon: 'bg-rose-50 text-rose-800 border-rose-100',
    },
    {
      id: 'public-site',
      title: 'Public Site',
      description: 'Manage admissions notice, fees schedule & web content',
      icon: Globe,
      badge: 'Public Gateway',
      color: 'text-sky-800',
      bgIcon: 'bg-sky-50 text-sky-800 border-sky-100',
    },
    {
      id: 'settings',
      title: 'Settings',
      description: 'Backups, institutional profile & system preferences',
      icon: Settings,
      badge: 'Configuration',
      color: 'text-slate-800',
      bgIcon: 'bg-slate-100 text-slate-800 border-slate-200',
    },
  ];

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
            Administrative Management Modules
          </h2>
          <p className="text-xs text-slate-500">
            Select a management module to view records or perform administrative operations
          </p>
        </div>
        <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
          8 Primary Controls
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              onClick={() => onSelectTab(act.id)}
              type="button"
              className="group text-left p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all hover:border-emerald-300 hover:translate-y-[-2px] flex flex-col justify-between cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-700"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-105 ${act.bgIcon}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/60">
                    {act.badge}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-900 transition-colors">
                  {act.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {act.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-800">
                <span>Access Module</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

