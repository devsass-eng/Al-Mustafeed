import { useState, type FC, type FormEvent } from 'react';
import { X, ArrowRightLeft, AlertTriangle, Check } from 'lucide-react';
import type { Teacher } from '../../types/teacher';

interface TransferStudentsModalProps {
  sourceTeacher: Teacher | null;
  allTeachers: Teacher[];
  isOpen: boolean;
  onClose: () => void;
  onTransfer: (sourceTeacherId: string, targetTeacherId: string, count: number) => void;
}

export const TransferStudentsModal: FC<TransferStudentsModalProps> = ({
  sourceTeacher,
  allTeachers,
  isOpen,
  onClose,
  onTransfer,
}) => {
  const [targetTeacherId, setTargetTeacherId] = useState<string>('');
  const [transferCount, setTransferCount] = useState<number>(10);
  const [reason, setReason] = useState<string>('Class redistribution & teacher workload rebalancing');

  if (!isOpen || !sourceTeacher) return null;

  // Filter available target teachers (must be active and not the source teacher)
  const availableTargetTeachers = allTeachers.filter(
    (t) => t.id !== sourceTeacher.id && t.status === 'active'
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!targetTeacherId) return;

    onTransfer(sourceTeacher.id, targetTeacherId, Math.min(transferCount, sourceTeacher.studentCount));
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-amber-500 via-amber-600 to-emerald-700" />

        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800">
                <ArrowRightLeft className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Transfer Students</h3>
                <p className="text-xs text-slate-500">Reallocate students between Tahfeez instructors</p>
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
            {/* Source Teacher Card */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Transferring From:</span>
              <p className="font-bold text-slate-900 text-sm mt-0.5">{sourceTeacher.name}</p>
              <p className="text-slate-500">
                Current Students: <span className="font-bold text-emerald-800">{sourceTeacher.studentCount}</span> • Classes: {sourceTeacher.assignedClasses.join(', ') || 'Unassigned'}
              </p>
            </div>

            {/* Target Teacher Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Select Receiving Teacher *
              </label>
              <select
                required
                value={targetTeacherId}
                onChange={(e) => setTargetTeacherId(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-700"
              >
                <option value="">-- Choose Target Teacher --</option>
                {availableTargetTeachers.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} (Currently has {t.studentCount} students • {t.assignedClasses.join(', ') || 'Unassigned'})
                  </option>
                ))}
              </select>
            </div>

            {/* Number of students to transfer */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Number of Students to Transfer (Max: {sourceTeacher.studentCount})
              </label>
              <input
                type="number"
                min={1}
                max={sourceTeacher.studentCount || 1}
                value={transferCount}
                onChange={(e) => setTransferCount(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-700"
              />
            </div>

            {/* Transfer Reason */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Administrative Reason
              </label>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-700"
              />
            </div>

            {/* Notice */}
            <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl flex items-start gap-2 text-xs text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>
                Attendance histories and student records will automatically reflect this teacher transfer in administration reports.
              </span>
            </div>

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
                disabled={!targetTeacherId || sourceTeacher.studentCount === 0}
                className="px-5 py-2 text-xs font-bold text-white bg-amber-800 hover:bg-amber-900 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Confirm Transfer</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

