import { type FC } from 'react';
import { X, AlertTriangle, ShieldOff, ShieldCheck } from 'lucide-react';
import type { Student } from '../../types/student';

interface SuspendStudentModalProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const SuspendStudentModal: FC<SuspendStudentModalProps> = ({ student, isOpen, onClose, onConfirm }) => {
  if (!isOpen || !student) return null;

  const isSuspended = student.status === 'suspended';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className={`p-5 flex items-center justify-between ${isSuspended ? 'bg-gradient-to-r from-emerald-950 to-emerald-900' : 'bg-gradient-to-r from-red-950 to-red-900'}`}>
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${isSuspended ? 'bg-emerald-800 border-emerald-700' : 'bg-red-800 border-red-700'}`}>
              {isSuspended ? <ShieldCheck className="w-4 h-4 text-amber-300" /> : <ShieldOff className="w-4 h-4 text-red-300" />}
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">{isSuspended ? 'Reactivate Account' : 'Suspend Account'}</h3>
              <p className="text-xs text-white/70 truncate max-w-[200px]">{student.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white transition-colors cursor-pointer"><X className="w-5 h-5" /></button>
        </div>

        <div className="p-5 space-y-4">
          {!isSuspended ? (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div className="text-sm text-red-800 leading-relaxed">
                <p className="font-bold mb-1">This will suspend the student's account.</p>
                <ul className="text-xs space-y-1 text-red-700 list-disc list-inside">
                  <li>Student will lose system access immediately.</li>
                  <li>Attendance records will be preserved.</li>
                  <li>Class assignment will remain unchanged.</li>
                  <li>Account can be reactivated at any time.</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-sm text-emerald-800 leading-relaxed">
                <p className="font-bold mb-1">Reactivating this student's account.</p>
                <p className="text-xs text-emerald-700">The student will regain full access and attendance can be recorded again.</p>
              </div>
            </div>
          )}

          <div className="text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
            <span className="text-xs text-slate-500 block mb-1">Student</span>
            <span className="font-bold">{student.name}</span>
            <span className="text-xs text-slate-400 ml-2">({student.studentCode})</span>
            <div className="text-xs text-slate-500 mt-0.5">Class: <strong>{student.assignedClass}</strong></div>
          </div>
        </div>

        <div className="px-5 pb-5 flex items-center justify-end gap-3">
          <button onClick={onClose} type="button" className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-bold hover:bg-slate-50 transition-all cursor-pointer">Cancel</button>
          <button
            onClick={() => { onConfirm(); onClose(); }}
            type="button"
            className={`px-6 py-2.5 rounded-xl text-white text-xs font-bold transition-all shadow-xs cursor-pointer ${isSuspended ? 'bg-emerald-800 hover:bg-emerald-900' : 'bg-red-700 hover:bg-red-800'}`}
          >
            {isSuspended ? 'Yes, Reactivate Account' : 'Yes, Suspend Account'}
          </button>
        </div>
      </div>
    </div>
  );
};
