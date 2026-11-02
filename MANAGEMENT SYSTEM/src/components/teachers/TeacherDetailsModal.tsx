import type { FC } from 'react';
import { X, Phone, Mail, BookOpen, Users, Calendar, Award, Shield } from 'lucide-react';
import type { Teacher } from '../../types/teacher';

interface TeacherDetailsModalProps {
  teacher: Teacher | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
}

export const TeacherDetailsModal: FC<TeacherDetailsModalProps> = ({
  teacher,
  isOpen,
  onClose,
  onEdit,
}) => {
  if (!isOpen || !teacher) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header Banner */}
        <div className="bg-emerald-950 text-white p-6 relative">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-13 h-13 rounded-2xl bg-emerald-800 text-amber-300 font-bold text-lg flex items-center justify-center shadow-md">
                {teacher.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white">{teacher.name}</h3>
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      teacher.status === 'active'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                        : 'bg-red-500/20 text-red-300 border border-red-400/30'
                    }`}
                  >
                    {teacher.status}
                  </span>
                </div>
                <p className="text-xs text-emerald-200/80 mt-0.5">{teacher.qualification}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              type="button"
              className="text-emerald-300 hover:text-white rounded-lg p-1 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Phone Number</span>
                <a href={`tel:${teacher.phone}`} className="font-semibold text-slate-900 hover:text-emerald-800">
                  {teacher.phone}
                </a>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-emerald-700 shrink-0" />
              <div className="min-w-0">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Email Address</span>
                <span className="font-semibold text-slate-900 truncate block">{teacher.email}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center gap-2.5">
              <BookOpen className="w-4 h-4 text-emerald-700 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Assigned Class</span>
                <span className="font-semibold text-slate-900">
                  {teacher.assignedClasses.length > 0 ? teacher.assignedClasses.join(', ') : 'None (Unassigned)'}
                </span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center gap-2.5">
              <Users className="w-4 h-4 text-emerald-700 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Students Under Care</span>
                <span className="font-semibold text-slate-900">{teacher.studentCount} Students</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-emerald-700 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Joined Faculty</span>
                <span className="font-semibold text-slate-900">{teacher.joinedDate}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center gap-2.5">
              <Shield className="w-4 h-4 text-emerald-700 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Portal Access</span>
                <span className="font-semibold text-slate-900">
                  {teacher.accountCreated ? 'Active Login Account' : 'Account Pending'}
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-amber-50/70 border border-amber-200/60 rounded-xl flex items-start gap-2.5 text-xs text-amber-900">
            <Award className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Faculty Qualification:</span>
              <p className="mt-0.5 text-amber-800">{teacher.qualification}</p>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-2.5 border-t border-slate-100">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onEdit();
              }}
              type="button"
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-colors shadow-xs cursor-pointer"
            >
              Edit Teacher
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
