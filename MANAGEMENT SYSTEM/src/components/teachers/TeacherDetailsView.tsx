import { useRef, type FC } from 'react';
import type { Teacher, DemoStudentAssignment } from '../../types/teacher';
import { DEMO_CLASS_STUDENTS } from '../../data/teachersDemoData';
import {
  ArrowLeft,
  Phone,
  Layers,
  Users,
  ShieldCheck,
  Calendar,
  Edit,
  ArrowRightLeft,
  Ban,
  RotateCcw,
  GraduationCap,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface TeacherDetailsViewProps {
  teacher: Teacher;
  onBack: () => void;
  onEdit: () => void;
  onChangeClass: () => void;
  onTransferStudents: () => void;
  onToggleSuspend: () => void;
}

export const TeacherDetailsView: FC<TeacherDetailsViewProps> = ({
  teacher,
  onBack,
  onEdit,
  onChangeClass,
  onTransferStudents,
  onToggleSuspend,
}) => {
  const studentsSectionRef = useRef<HTMLDivElement>(null);
  const isActive = teacher.status === 'active';

  // Gather assigned students from demo data
  const assignedStudents: DemoStudentAssignment[] = [];
  teacher.assignedClasses.forEach((cls) => {
    if (DEMO_CLASS_STUDENTS[cls]) {
      assignedStudents.push(...DEMO_CLASS_STUDENTS[cls]);
    }
  });

  const initials = teacher.name
    .split(' ')
    .map((n: string) => n[0])
    .slice(0, 2)
    .join('');

  const scrollToStudents = () => {
    studentsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-6 animate-fadeIn select-none">
      
      {/* 1. Top Breadcrumb & Clear Back to Teachers Button */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <button
          onClick={onBack}
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 hover:text-emerald-900 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-700"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-800" />
          <span>Back to Teachers</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>Faculty Directory</span>
          <span>/</span>
          <span className="text-slate-800 font-bold truncate max-w-xs">{teacher.name}</span>
        </div>
      </div>

      {/* 2. Teacher Profile Summary Card (Islamic Design Identity) */}
      <div className="relative rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 text-white p-6 sm:p-8 shadow-md overflow-hidden">
        {/* Subtle Geometric Overlay */}
        <div className="absolute inset-0 bg-islamic-pattern opacity-25 pointer-events-none" />
        
        {/* Ambient Glows */}
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-emerald-600/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-emerald-800 border-2 border-amber-400/30 text-amber-300 font-extrabold text-xl sm:text-2xl flex items-center justify-center shadow-lg shrink-0">
              {initials}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white">
                  {teacher.name}
                </h1>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${
                    isActive
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
                      : 'bg-red-500/25 text-red-300 border-red-400/40'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-400' : 'bg-red-400'}`} />
                  {isActive ? 'Active Account' : 'Suspended'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-200/90 font-light">
                {teacher.qualification}
              </p>
              <div className="flex items-center gap-3 pt-1 text-xs text-emerald-300/80">
                <span>Faculty ID: #{teacher.id.toUpperCase()}</span>
                <span>•</span>
                <span>Al-Mustafeed Tahfeez Instructor</span>
              </div>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1.5 bg-emerald-900/60 border border-emerald-700/50 p-4 rounded-2xl shrink-0">
            <span className="text-[11px] uppercase font-bold text-emerald-300/80 tracking-wider">
              Assigned Students
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-300">
              {teacher.studentCount}
            </span>
            <span className="text-[10px] text-emerald-200/70 hidden sm:block">
              Across {teacher.assignedClasses.length} Halaqah(s)
            </span>
          </div>
        </div>
      </div>

      {/* 3. Detailed Information Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Phone Number */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Phone Number
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <Phone className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-1">
            <a
              href={`tel:${teacher.phone}`}
              className="text-base font-bold text-slate-900 hover:text-emerald-800 hover:underline block"
            >
              {teacher.phone}
            </a>
            <span className="text-[11px] text-slate-400 mt-0.5 block">Direct contact line</span>
          </div>
        </div>

        {/* Assigned Classes */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Assigned Classes
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-1">
            {teacher.assignedClasses.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {teacher.assignedClasses.map((cls: string) => (
                  <span
                    key={cls}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-bold"
                  >
                    {cls}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-sm font-semibold text-slate-400 italic">None (Unassigned)</span>
            )}
            <span className="text-[11px] text-slate-400 mt-1 block">Active Tahfeez halaqahs</span>
          </div>
        </div>

        {/* Account Status */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Account Status
            </span>
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                isActive ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'
              }`}
            >
              {isActive ? <ShieldCheck className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            </div>
          </div>
          <div className="mt-1">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold ${
                isActive
                  ? 'bg-emerald-100 text-emerald-900'
                  : 'bg-red-100 text-red-900'
              }`}
            >
              {isActive ? 'Active (Full Access)' : 'Suspended (Access Revoked)'}
            </span>
            <span className="text-[11px] text-slate-400 mt-1 block">
              {isActive ? 'Portal login permitted' : 'Login disabled by Admin'}
            </span>
          </div>
        </div>

        {/* Account Creation Date */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Account Creation Date
            </span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-1">
            <p className="text-sm sm:text-base font-bold text-slate-900 font-mono">
              {teacher.accountCreationDate}
            </p>
            <span className="text-[11px] text-slate-400 mt-0.5 block">Official registration record</span>
          </div>
        </div>

      </div>

      {/* 4. Action Buttons Bar (All 6 Actions Required) */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Teacher Administrative Actions
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {/* Action 1: Edit Teacher Information */}
          <button
            onClick={onEdit}
            type="button"
            className="flex items-center justify-center gap-2 p-2.5 sm:py-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold transition-all shadow-2xs cursor-pointer"
          >
            <Edit className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>Edit Information</span>
          </button>

          {/* Action 2: Change Assigned Class */}
          <button
            onClick={onChangeClass}
            type="button"
            className="flex items-center justify-center gap-2 p-2.5 sm:py-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold transition-all shadow-2xs cursor-pointer"
          >
            <Layers className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Change Class</span>
          </button>

          {/* Action 3: View Assigned Students (scrolls to list) */}
          <button
            onClick={scrollToStudents}
            type="button"
            className="flex items-center justify-center gap-2 p-2.5 sm:py-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold transition-all shadow-2xs cursor-pointer"
          >
            <Users className="w-4 h-4 text-blue-700 shrink-0" />
            <span>View Students</span>
          </button>

          {/* Action 4: Transfer Students to Another Teacher */}
          <button
            onClick={onTransferStudents}
            disabled={teacher.studentCount === 0}
            type="button"
            className="flex items-center justify-center gap-2 p-2.5 sm:py-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-bold transition-all shadow-2xs cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ArrowRightLeft className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Transfer Students</span>
          </button>

          {/* Action 5 & 6: Suspend or Reactivate Account */}
          {isActive ? (
            <button
              onClick={onToggleSuspend}
              type="button"
              className="col-span-2 sm:col-span-1 flex items-center justify-center gap-2 p-2.5 sm:py-3 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-red-800 text-xs font-bold transition-all shadow-2xs cursor-pointer"
            >
              <Ban className="w-4 h-4 text-red-600 shrink-0" />
              <span>Suspend Account</span>
            </button>
          ) : (
            <button
              onClick={onToggleSuspend}
              type="button"
              className="col-span-2 sm:col-span-1 flex items-center justify-center gap-2 p-2.5 sm:py-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 text-xs font-bold transition-all shadow-2xs cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Reactivate Account</span>
            </button>
          )}
        </div>
      </div>

      {/* 5. List of Assigned Students */}
      <div
        ref={studentsSectionRef}
        className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden p-5 sm:p-7"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-slate-100 gap-2">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-emerald-800" />
              <span>List of Students Assigned to {teacher.name}</span>
            </h3>
            <p className="text-xs text-slate-500">
              Active student roster for assigned classes: {teacher.assignedClasses.join(', ') || 'None'}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-slate-600">Total Enrolled:</span>
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold">
              {teacher.studentCount} Students
            </span>
          </div>
        </div>

        {/* Students Table */}
        <div className="mt-4">
          {assignedStudents.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200">
                    <th className="py-3 px-4">Student ID Code</th>
                    <th className="py-3 px-4">Student Full Name</th>
                    <th className="py-3 px-4">Assigned Halaqah</th>
                    <th className="py-3 px-4 text-right">Attendance Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {assignedStudents.map((std) => (
                    <tr key={std.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-slate-600">
                        {std.studentCode}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-[10px]">
                            {std.name[0]}
                          </div>
                          <span className="font-bold text-slate-900">{std.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-semibold border border-slate-200">
                          {std.className}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="inline-flex items-center gap-1 font-bold text-emerald-700">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {std.attendanceRate}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-12 px-4 text-center text-slate-400 bg-slate-50 border border-dashed border-slate-200 rounded-2xl">
              <Users className="w-10 h-10 mx-auto text-slate-300 mb-2" />
              <p className="text-sm font-bold text-slate-700">No students currently assigned</p>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                This teacher currently does not have an active class assignment. Use the "Change Class" button above to allocate a halaqah.
              </p>
              <button
                onClick={onChangeClass}
                type="button"
                className="mt-4 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Assign Halaqah Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
