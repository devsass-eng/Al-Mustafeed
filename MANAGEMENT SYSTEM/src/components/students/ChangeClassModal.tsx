import { useState, type FC } from 'react';
import { X, Layers } from 'lucide-react';
import { STUDENT_CLASSES, CLASS_TEACHER_MAP } from '../../data/studentsDemoData';
import type { Student } from '../../types/student';

interface ChangeClassModalProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
  onChangeClass: (studentId: string, newClass: string, newTeacherId: string, newTeacherName: string) => void;
}

export const ChangeClassModal: FC<ChangeClassModalProps> = ({ student, isOpen, onClose, onChangeClass }) => {
  const [selectedClass, setSelectedClass] = useState('');
  const [error, setError] = useState('');

  if (!isOpen || !student) return null;

  const handleSubmit = () => {
    if (!selectedClass) { setError('Please select a class.'); return; }
    if (selectedClass === student.assignedClass) { setError('Student is already in this class.'); return; }
    const teacher = CLASS_TEACHER_MAP[selectedClass];
    onChangeClass(student.id, selectedClass, teacher?.id ?? '', teacher?.name ?? 'Unassigned');
    setSelectedClass('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-950 to-emerald-900 p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-800 border border-emerald-700 flex items-center justify-center">
              <Layers className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">Change Student Class</h3>
              <p className="text-xs text-emerald-300 truncate max-w-[200px]">{student.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-emerald-400 hover:text-white transition-colors cursor-pointer"><X className="w-5 h-5" /></button>
        </div>

        <div className="p-5 space-y-4">
          {/* Current class */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sm">
            <span className="text-xs text-slate-500 font-medium block mb-0.5">Current Class</span>
            <span className="font-bold text-emerald-900">{student.assignedClass}</span>
            <span className="text-xs text-slate-400 ml-2">— {student.assignedTeacherName}</span>
          </div>

          {/* New class select */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">Transfer to New Class</label>
            <select
              value={selectedClass}
              onChange={(e) => { setSelectedClass(e.target.value); setError(''); }}
              className={`w-full px-3.5 py-2.5 border rounded-xl text-sm text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 cursor-pointer transition-all ${error ? 'border-red-400 focus:ring-red-200' : 'border-slate-300 focus:ring-emerald-200 focus:border-emerald-700'}`}
            >
              <option value="">— Select a new class —</option>
              {STUDENT_CLASSES.filter(c => c !== student.assignedClass).map(cls => (
                <option key={cls} value={cls}>{cls} — {CLASS_TEACHER_MAP[cls]?.name}</option>
              ))}
            </select>
            {error && <p className="text-xs text-red-500">{error}</p>}
          </div>

          <div className="text-[11px] text-amber-800 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 leading-relaxed">
            Changing the class will automatically reassign the student to the new class teacher.
          </div>
        </div>

        <div className="px-5 pb-5 flex items-center justify-end gap-3">
          <button onClick={onClose} type="button" className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-bold hover:bg-slate-50 transition-all cursor-pointer">Cancel</button>
          <button onClick={handleSubmit} type="button" className="px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold transition-all shadow-xs cursor-pointer">Confirm Transfer</button>
        </div>
      </div>
    </div>
  );
};
