import type { FC } from 'react';
import { X, Users, GraduationCap, CheckCircle2 } from 'lucide-react';
import { DEMO_CLASS_STUDENTS } from '../../data/teachersDemoData';
import type { Teacher, DemoStudentAssignment } from '../../types/teacher';

interface ViewStudentsModalProps {
  teacher: Teacher | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenTransfer: () => void;
}

export const ViewStudentsModal: FC<ViewStudentsModalProps> = ({
  teacher,
  isOpen,
  onClose,
  onOpenTransfer,
}) => {
  if (!isOpen || !teacher) return null;

  // Gather students from all assigned classes
  const assignedStudents: DemoStudentAssignment[] = [];
  teacher.assignedClasses.forEach((cls) => {
    if (DEMO_CLASS_STUDENTS[cls]) {
      assignedStudents.push(...DEMO_CLASS_STUDENTS[cls]);
    }
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-emerald-800 via-emerald-600 to-amber-500" />

        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-800">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Assigned Students</h3>
                <p className="text-xs text-slate-500">
                  Roster for <span className="font-semibold text-slate-800">{teacher.name}</span>
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              type="button"
              className="text-slate-400 hover:text-slate-600 rounded-lg p-1 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Header Stats */}
          <div className="mt-4 p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-700">Assigned Classes:</span>
              <span className="font-semibold text-emerald-800">
                {teacher.assignedClasses.length > 0 ? teacher.assignedClasses.join(', ') : 'None'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-700">Total in Care:</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                {teacher.studentCount} Students
              </span>
            </div>
          </div>

          {/* Student Roster Table */}
          <div className="mt-4">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Halaqah Student Sample Directory
            </h4>

            {assignedStudents.length > 0 ? (
              <div className="max-h-60 overflow-y-auto divide-y divide-slate-100 border border-slate-200 rounded-xl">
                {assignedStudents.map((std) => (
                  <div
                    key={std.id}
                    className="p-3 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-[10px]">
                        <GraduationCap className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{std.name}</p>
                        <p className="text-[10px] text-slate-400 font-mono">{std.studentCode}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[11px] font-semibold text-slate-700 block">{std.className}</span>
                      <span className="text-[10px] text-emerald-700 font-medium flex items-center gap-0.5 justify-end">
                        <CheckCircle2 className="w-3 h-3" />
                        {std.attendanceRate}% Attendance
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-slate-400 bg-slate-50 border border-dashed border-slate-200 rounded-xl">
                <Users className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                <p className="text-xs font-medium">No students currently assigned to this teacher.</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Assign a class halaqah to allocate students.</p>
              </div>
            )}
          </div>

          {/* Actions Footer */}
          <div className="pt-5 mt-4 flex items-center justify-between border-t border-slate-100">
            {teacher.studentCount > 0 ? (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenTransfer();
                }}
                className="text-xs font-semibold text-amber-800 hover:text-amber-950 hover:underline cursor-pointer"
              >
                Transfer Students to Another Teacher →
              </button>
            ) : <div />}

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-colors shadow-xs cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

