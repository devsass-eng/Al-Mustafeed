import { type FC } from 'react';
import {
  ArrowLeft,
  Phone,
  Layers,
  ShieldCheck,
  ShieldOff,
  CalendarDays,
  UserCheck,
  Pencil,
  ArrowRightLeft,
  UserX,
  Users,
  Hash,
  BarChart2,
} from 'lucide-react';
import type { Student } from '../../types/student';

interface StudentDetailsViewProps {
  student: Student;
  onBack: () => void;
  onEdit: () => void;
  onChangeClass: () => void;
  onToggleSuspend: () => void;
}

export const StudentDetailsView: FC<StudentDetailsViewProps> = ({
  student,
  onBack,
  onEdit,
  onChangeClass,
  onToggleSuspend,
}) => {
  const isActive = student.status === 'active';
  const isSuspended = student.status === 'suspended';

  const initials = student.name
    .split(' ')
    .map((n: string) => n[0])
    .slice(0, 2)
    .join('');

  const attendanceColor =
    student.attendanceRate >= 95
      ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
      : student.attendanceRate >= 80
      ? 'text-amber-700 bg-amber-50 border-amber-200'
      : 'text-red-700 bg-red-50 border-red-200';

  const actions = [
    {
      label: 'Edit Information',
      icon: Pencil,
      onClick: onEdit,
      style: 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-emerald-300 hover:text-emerald-900',
    },
    {
      label: 'Change Class',
      icon: ArrowRightLeft,
      onClick: onChangeClass,
      style: 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-emerald-300 hover:text-emerald-900',
    },
    isSuspended
      ? {
          label: 'Reactivate Account',
          icon: ShieldCheck,
          onClick: onToggleSuspend,
          style: 'bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100',
        }
      : {
          label: 'Suspend Account',
          icon: UserX,
          onClick: onToggleSuspend,
          style: 'bg-red-50 border border-red-200 text-red-700 hover:bg-red-100',
        },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Back button + breadcrumb */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <button
          onClick={onBack}
          type="button"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:text-emerald-900 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Students
        </button>
        <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
          Admin Portal • Students • {student.name}
        </span>
      </div>

      {/* Hero banner */}
      <div className="relative rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 text-white p-6 sm:p-8 shadow-md overflow-hidden">
        <div className="absolute inset-0 bg-islamic-pattern opacity-25 pointer-events-none" />
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-emerald-600/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-5">
          {/* Avatar */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-emerald-800 border-2 border-emerald-700 text-amber-300 font-extrabold text-2xl flex items-center justify-center shrink-0 shadow-lg">
            {initials}
          </div>

          {/* Name + meta */}
          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                {student.name}
              </h1>
              <span
                className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                  isActive
                    ? 'bg-emerald-900/80 border-emerald-700 text-emerald-300'
                    : 'bg-red-900/80 border-red-700 text-red-300'
                }`}
              >
                {isActive ? <ShieldCheck className="w-3 h-3" /> : <ShieldOff className="w-3 h-3" />}
                {isActive ? 'Active' : 'Suspended'}
              </span>
            </div>

            <div className="flex flex-wrap gap-4 text-xs text-emerald-200">
              <span className="flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-mono font-bold text-amber-300">{student.studentCode}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                {student.assignedClass}
              </span>
              <span className="flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5" />
                {student.assignedTeacherName}
              </span>
            </div>

            {/* Attendance pill */}
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold ${attendanceColor}`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              {student.attendanceRate > 0
                ? `${student.attendanceRate}% Attendance Rate`
                : 'Attendance not yet recorded'}
            </div>
          </div>
        </div>
      </div>

      {/* Info cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Guardian name */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
            <Users className="w-4.5 h-4.5 text-emerald-700" />
          </div>
          <div>
            <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Guardian / Parent</p>
            <p className="text-sm font-bold text-slate-900 mt-0.5">{student.guardianName}</p>
          </div>
        </div>

        {/* Guardian phone */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
            <Phone className="w-4.5 h-4.5 text-emerald-700" />
          </div>
          <div>
            <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Guardian Phone</p>
            <p className="text-sm font-bold text-slate-900 mt-0.5">{student.guardianPhone}</p>
          </div>
        </div>

        {/* Assigned class */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
            <Layers className="w-4.5 h-4.5 text-emerald-700" />
          </div>
          <div>
            <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Assigned Class</p>
            <p className="text-sm font-bold text-slate-900 mt-0.5">{student.assignedClass}</p>
            <p className="text-xs text-slate-500">{student.assignedTeacherName}</p>
          </div>
        </div>

        {/* Account status */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 flex items-start gap-3">
          <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${isActive ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}>
            {isActive ? <ShieldCheck className="w-4.5 h-4.5 text-emerald-700" /> : <ShieldOff className="w-4.5 h-4.5 text-red-600" />}
          </div>
          <div>
            <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Account Status</p>
            <p className={`text-sm font-bold mt-0.5 ${isActive ? 'text-emerald-700' : 'text-red-600'}`}>
              {isActive ? 'Active' : 'Suspended'}
            </p>
          </div>
        </div>

        {/* Enrollment date */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
            <CalendarDays className="w-4.5 h-4.5 text-emerald-700" />
          </div>
          <div>
            <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Enrolment Date</p>
            <p className="text-sm font-bold text-slate-900 mt-0.5">{student.enrollmentDate}</p>
          </div>
        </div>

        {/* Account creation date */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
            <CalendarDays className="w-4.5 h-4.5 text-emerald-700" />
          </div>
          <div>
            <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Record Created</p>
            <p className="text-sm font-bold text-slate-900 mt-0.5">{student.accountCreationDate}</p>
          </div>
        </div>
      </div>

      {/* Actions panel */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs p-5 sm:p-6">
        <h2 className="text-sm font-extrabold text-slate-800 mb-4 flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-emerald-700" />
          Student Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                onClick={action.onClick}
                type="button"
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${action.style}`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {action.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
