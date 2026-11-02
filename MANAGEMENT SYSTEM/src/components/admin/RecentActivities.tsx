import type { FC } from 'react';
import type { ActivityItem } from '../../types/admin';
import {
  CalendarCheck,
  GraduationCap,
  UserCheck,
  Layers,
  Megaphone,
  ShieldCheck,
  Clock,
} from 'lucide-react';

interface RecentActivitiesProps {
  activities: ActivityItem[];
}

export const RecentActivities: FC<RecentActivitiesProps> = ({ activities }) => {
  const getCategoryBadge = (category: ActivityItem['category']) => {
    switch (category) {
      case 'attendance':
        return {
          icon: CalendarCheck,
          label: 'Attendance',
          style: 'bg-teal-50 text-teal-800 border-teal-200',
        };
      case 'students':
        return {
          icon: GraduationCap,
          label: 'Students',
          style: 'bg-blue-50 text-blue-800 border-blue-200',
        };
      case 'teachers':
        return {
          icon: UserCheck,
          label: 'Teachers',
          style: 'bg-amber-50 text-amber-800 border-amber-200',
        };
      case 'classes':
        return {
          icon: Layers,
          label: 'Classes & IDs',
          style: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        };
      case 'announcements':
        return {
          icon: Megaphone,
          label: 'Circular',
          style: 'bg-rose-50 text-rose-800 border-rose-200',
        };
      default:
        return {
          icon: ShieldCheck,
          label: 'System Log',
          style: 'bg-slate-100 text-slate-800 border-slate-200',
        };
    }
  };

  return (
    <div className="mt-8 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
            Recent Institutional Activities
          </h2>
          <p className="text-xs text-slate-500">
            Real-time administrative feed across classes, staff and student operations
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
          <Clock className="w-3.5 h-3.5" />
          <span>Live Log</span>
        </div>
      </div>

      <div className="mt-4 divide-y divide-slate-100">
        {activities.map((act) => {
          const badge = getCategoryBadge(act.category);
          const Icon = badge.icon;
          return (
            <div
              key={act.id}
              className="py-3.5 first:pt-0 last:pb-0 flex items-start gap-3.5 group hover:bg-slate-50/60 rounded-xl px-2.5 transition-colors -mx-2.5"
            >
              <div
                className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 ${badge.style}`}
              >
                <Icon className="w-4 h-4" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-slate-900">{act.title}</span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badge.style}`}
                    >
                      {badge.label}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 shrink-0 font-medium">
                    {act.timestamp}
                  </span>
                </div>

                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {act.description}
                </p>

                <div className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span className="font-semibold text-slate-700">{act.actor}</span>
                  <span className="text-slate-400">({act.actorRole})</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

