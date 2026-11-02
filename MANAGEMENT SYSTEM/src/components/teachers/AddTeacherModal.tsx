import { useState, type FC, type FormEvent } from 'react';
import { X, UserPlus, Phone, User, Check, AlertCircle } from 'lucide-react';
import { AVAILABLE_CLASSES } from '../../data/teachersDemoData';
import type { Teacher } from '../../types/teacher';

interface AddTeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTeacher: (teacher: Teacher) => void;
}

export const AddTeacherModal: FC<AddTeacherModalProps> = ({
  isOpen,
  onClose,
  onAddTeacher,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [assignedClass, setAssignedClass] = useState<string>('Class Hifz-1');
  const [qualification, setQualification] = useState('');
  const [createAccount, setCreateAccount] = useState(true);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; phone?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Full name is required.';
    }
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newTeacher: Teacher = {
      id: `tch-${Date.now()}`,
      name: name.trim(),
      phone: phone.trim(),
      email: `${name.trim().toLowerCase().replace(/\s+/g, '.')}@al-mustafeed.edu`,
      assignedClasses: assignedClass === 'unassigned' ? [] : [assignedClass],
      status: 'active',
      joinedDate: 'Nov 2026',
      accountCreationDate: '02 Nov 2026, 09:00 AM',
      studentCount: assignedClass === 'unassigned' ? 0 : 35,
      qualification: qualification.trim() || 'Tahfeez & Recitation Instructor',
      accountCreated: createAccount,
    };

    onAddTeacher(newTeacher);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Top Header Bar with Emerald Gradient */}
        <div className="h-2 bg-gradient-to-r from-emerald-800 via-emerald-600 to-amber-500" />

        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800">
                <UserPlus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Add New Teacher</h3>
                <p className="text-xs text-slate-500">Register and assign a new Tahfeez faculty member</p>
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

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            {/* 1. Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Full Name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  placeholder="e.g. Qari Mansur Al-Ghamidi"
                  className={`w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 ${
                    errors.name
                      ? 'border-red-400 focus:ring-red-200'
                      : 'border-slate-300 focus:ring-emerald-200 focus:border-emerald-700'
                  }`}
                />
              </div>
              {errors.name && (
                <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* 2. Phone Number */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Phone Number *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                  }}
                  placeholder="e.g. +234 803 000 0000"
                  className={`w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 ${
                    errors.phone
                      ? 'border-red-400 focus:ring-red-200'
                      : 'border-slate-300 focus:ring-emerald-200 focus:border-emerald-700'
                  }`}
                />
              </div>
              {errors.phone && (
                <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.phone}
                </p>
              )}
            </div>

            {/* 3. Assign Class */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Assign Class
              </label>
              <select
                value={assignedClass}
                onChange={(e) => setAssignedClass(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-700"
              >
                <option value="unassigned">-- Unassigned (Allocate Later) --</option>
                {AVAILABLE_CLASSES.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls} (Tahfeez Halaqah)
                  </option>
                ))}
              </select>
            </div>

            {/* Qualification / Title */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Qualification / Specialization (Optional)
              </label>
              <input
                type="text"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                placeholder="e.g. Ijazah in Hafs, Tajweed Specialist"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-700"
              />
            </div>

            {/* 4. Create Teacher Account */}
            <div className="pt-2 p-3 bg-emerald-50/60 border border-emerald-100 rounded-xl">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={createAccount}
                  onChange={(e) => setCreateAccount(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-emerald-800 bg-white border-slate-300 rounded focus:ring-emerald-700 cursor-pointer accent-emerald-800"
                />
                <div>
                  <span className="text-xs font-bold text-emerald-950 block">
                    Create Teacher Account
                  </span>
                  <span className="text-[11px] text-emerald-800 leading-tight block mt-0.5">
                    Generate portal access credentials and PIN for attendance recording
                  </span>
                </div>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex items-center justify-end gap-2.5 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 rounded-xl transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Save Teacher</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

