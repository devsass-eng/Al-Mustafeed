import type { FC } from 'react';
import type { OverviewMetrics } from '../../types/admin';
import {
  GraduationCap,
  UserCheck,
  Layers,
  CalendarCheck,
  TrendingUp,
  Clock,
  CheckCircle2,
} from 'lucide-react';

interface OverviewCardsProps {
  metrics: OverviewMetrics;
  onNavigateTab: (tab: any) => void;
}

export const OverviewCards: FC<OverviewCardsProps> = ({
  metrics,
  onNavigateTab,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      
      {/* 1. Total Students */}
      <div
        onClick={() => onNavigateTab('students')}
        className="group relative bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer hover:border-emerald-300 overflow-hidden"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Students
            </p>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-1 tracking-tight">
              {metrics.totalStudents}
            </h3>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-800 group-hover:scale-110 transition-transform">
            <GraduationCap className="w-6 h-6" />
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
            <TrendingUp className="w-3 h-3" />
            Active Enrolments
          </span>
          <span className="text-[11px] text-slate-400">Across 6 classes</span>
        </div>
      </div>

      {/* 2. Total Teachers */}
      <div
        onClick={() => onNavigateTab('teachers')}
        className="group relative bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer hover:border-emerald-300 overflow-hidden"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Teachers
            </p>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-1 tracking-tight">
              {metrics.totalTeachers}
            </h3>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700 group-hover:scale-110 transition-transform">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="inline-flex items-center gap-1 font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
            <CheckCircle2 className="w-3 h-3" />
            100% On Duty Today
          </span>
          <span className="text-[11px] text-slate-400">Qualified Huffaz</span>
        </div>
      </div>

      {/* 3. Total Classes */}
      <div
        onClick={() => onNavigateTab('classes')}
        className="group relative bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer hover:border-emerald-300 overflow-hidden"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Classes
            </p>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-1 tracking-tight">
              {metrics.totalClasses}
            </h3>
          </div>
          <div className="w-11 h-11 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-800 group-hover:scale-110 transition-transform">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="inline-flex items-center gap-1 font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">
            Levels 1 to 6
          </span>
          <span className="text-[11px] text-slate-400">Avg 55 / class</span>
        </div>
      </div>

      {/* 4. Demonstration Attendance Rate */}
      <div
        onClick={() => onNavigateTab('attendance')}
        className="group relative bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer hover:border-emerald-300 overflow-hidden"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Today's Attendance
            </p>
            <div className="flex items-baseline gap-2 mt-1">
              <h3 className="text-3xl font-extrabold text-emerald-800 tracking-tight">
                {metrics.attendanceToday.percentage}%
              </h3>
              <span className="text-xs font-bold text-slate-500">
                ({metrics.attendanceToday.presentStudents}/{metrics.totalStudents})
              </span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-800 group-hover:scale-110 transition-transform">
            <CalendarCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="text-emerald-700 font-medium">
            {metrics.attendanceToday.absentStudents} absent • {metrics.attendanceToday.excusedStudents} excused
          </span>
          <span className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
            <Clock className="w-3 h-3" />
            08:30 AM
          </span>
        </div>
      </div>

    </div>
  );
};
