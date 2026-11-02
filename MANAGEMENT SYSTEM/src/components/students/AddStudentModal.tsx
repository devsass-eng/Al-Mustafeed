import { useState, type FC } from 'react';
import { X, UserPlus, Layers } from 'lucide-react';
import { STUDENT_CLASSES, CLASS_TEACHER_MAP } from '../../data/studentsDemoData';
import type { Student } from '../../types/student';

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStudent: (student: Student) => void;
}

export const AddStudentModal: FC<AddStudentModalProps> = ({ isOpen, onClose, onAddStudent }) => {
  const [form, setForm] = useState({
    name: '',
    guardianName: '',
    guardianPhone: '',
    assignedClass: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Full name is required.';
    if (!form.guardianName.trim()) e.guardianName = 'Guardian name is required.';
    if (!form.guardianPhone.trim()) e.guardianPhone = 'Guardian phone number is required.';
    if (!form.assignedClass) e.assignedClass = 'Please assign a class.';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }

    const teacher = CLASS_TEACHER_MAP[form.assignedClass];
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    const id = `s-new-${Date.now()}`;
    const code = `AM-2026-${900 + Math.floor(Math.random() * 99)}`;

    const newStudent: Student = {
      id,
      studentCode: code,
      name: form.name.trim(),
      guardianName: form.guardianName.trim(),
      guardianPhone: form.guardianPhone.trim(),
      assignedClass: form.assignedClass,
      assignedTeacherId: teacher?.id ?? '',
      assignedTeacherName: teacher?.name ?? 'Unassigned',
      enrollmentDate: dateStr,
      accountCreationDate: `${dateStr}, ${timeStr}`,
      status: 'active',
      attendanceRate: 0,
      gender: 'male',
    };

    onAddStudent(newStudent);
    setForm({ name: '', guardianName: '', guardianPhone: '', assignedClass: '' });
    setErrors({});
    onClose();
  };

  const field = (label: string, key: keyof typeof form, placeholder: string, type = 'text') => (
    <div className="space-y-1.5">
      <label className="block text-xs font-bold text-slate-700">{label}</label>
      <input
        type={type}
        value={form[key]}
        onChange={(e) => { setForm(p => ({ ...p, [key]: e.target.value })); setErrors(p => ({ ...p, [key]: '' })); }}
        placeholder={placeholder}
        className={`w-full px-3.5 py-2.5 border rounded-xl text-sm text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${errors[key] ? 'border-red-400 focus:ring-red-200' : 'border-slate-300 focus:ring-emerald-200 focus:border-emerald-700'}`}
      />
      {errors[key] && <p className="text-xs text-red-500">{errors[key]}</p>}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 to-emerald-900 p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-800 border border-emerald-700 flex items-center justify-center">
              <UserPlus className="w-4.5 h-4.5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">Register New Student</h3>
              <p className="text-xs text-emerald-300">Add to Al-Mustafeed Tahfeez programme</p>
            </div>
          </div>
          <button onClick={onClose} className="text-emerald-400 hover:text-white transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          {field("Student's Full Name", 'name', 'e.g. Zayd Ibn Thabit')}
          {field("Guardian / Parent Full Name", 'guardianName', 'e.g. Thabit Ibn Qays')}
          {field("Guardian Phone Number", 'guardianPhone', 'e.g. +234 803 000 0000', 'tel')}

          {/* Class Assignment */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5"><Layers className="w-3.5 h-3.5 text-emerald-700" />Assign to Class</span>
            </label>
            <select
              value={form.assignedClass}
              onChange={(e) => { setForm(p => ({ ...p, assignedClass: e.target.value })); setErrors(p => ({ ...p, assignedClass: '' })); }}
              className={`w-full px-3.5 py-2.5 border rounded-xl text-sm text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 cursor-pointer transition-all ${errors.assignedClass ? 'border-red-400 focus:ring-red-200' : 'border-slate-300 focus:ring-emerald-200 focus:border-emerald-700'}`}
            >
              <option value="">— Select a Halaqah Class —</option>
              {STUDENT_CLASSES.map(cls => <option key={cls} value={cls}>{cls}</option>)}
            </select>
            {errors.assignedClass && <p className="text-xs text-red-500">{errors.assignedClass}</p>}
            {form.assignedClass && (
              <p className="text-[11px] text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
                Assigned Teacher: <strong>{CLASS_TEACHER_MAP[form.assignedClass]?.name ?? 'N/A'}</strong>
              </p>
            )}
          </div>

          {/* Info note */}
          <div className="text-[11px] text-slate-500 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 leading-relaxed">
            The student will be automatically assigned to the class teacher. A student code will be generated upon registration.
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 pb-5 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            type="button"
            className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-bold hover:bg-slate-50 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            type="button"
            className="px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            Register Student
          </button>
        </div>
      </div>
    </div>
  );
};

