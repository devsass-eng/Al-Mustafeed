import { useState, useEffect, type FC } from 'react';
import { X, Pencil } from 'lucide-react';
import type { Student } from '../../types/student';

interface EditStudentModalProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStudent: (student: Student) => void;
}

export const EditStudentModal: FC<EditStudentModalProps> = ({ student, isOpen, onClose, onUpdateStudent }) => {
  const [form, setForm] = useState({ name: '', guardianName: '', guardianPhone: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (student) {
      setForm({ name: student.name, guardianName: student.guardianName, guardianPhone: student.guardianPhone });
      setErrors({});
    }
  }, [student]);

  if (!isOpen || !student) return null;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Full name is required.';
    if (!form.guardianName.trim()) e.guardianName = 'Guardian name is required.';
    if (!form.guardianPhone.trim()) e.guardianPhone = 'Guardian phone is required.';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    onUpdateStudent({ ...student, name: form.name.trim(), guardianName: form.guardianName.trim(), guardianPhone: form.guardianPhone.trim() });
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
        <div className="bg-gradient-to-r from-emerald-950 to-emerald-900 p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-800 border border-emerald-700 flex items-center justify-center">
              <Pencil className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">Edit Student Information</h3>
              <p className="text-xs text-emerald-300 truncate max-w-[200px]">{student.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-emerald-400 hover:text-white transition-colors cursor-pointer"><X className="w-5 h-5" /></button>
        </div>

        <div className="p-5 space-y-4">
          {field("Student's Full Name", 'name', 'Enter full name')}
          {field("Guardian / Parent Name", 'guardianName', 'Enter guardian name')}
          {field("Guardian Phone Number", 'guardianPhone', 'Enter phone number', 'tel')}
          <div className="text-[11px] text-slate-500 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
            Student Code: <strong className="font-mono text-emerald-800">{student.studentCode}</strong> — Class and teacher assignment are managed separately.
          </div>
        </div>

        <div className="px-5 pb-5 flex items-center justify-end gap-3">
          <button onClick={onClose} type="button" className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-bold hover:bg-slate-50 transition-all cursor-pointer">Cancel</button>
          <button onClick={handleSubmit} type="button" className="px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold transition-all shadow-xs cursor-pointer">Save Changes</button>
        </div>
      </div>
    </div>
  );
};
