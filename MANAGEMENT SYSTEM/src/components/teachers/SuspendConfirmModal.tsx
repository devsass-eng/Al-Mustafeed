import type { FC } from 'react';
import { X, AlertTriangle, ShieldCheck, Check } from 'lucide-react';
import type { Teacher } from '../../types/teacher';

interface SuspendConfirmModalProps {
  teacher: Teacher | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const SuspendConfirmModal: FC<SuspendConfirmModalProps> = ({
  teacher,
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen || !teacher) return null;

  const isSuspending = teacher.status === 'active';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-md bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        <div
          className={`h-2 ${
            isSuspending
              ? 'bg-gradient-to-r from-red-600 via-rose-600 to-amber-500'
              : 'bg-gradient-to-r from-emerald-600 to-teal-500'
          }`}
        />

        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
                  isSuspending
                    ? 'bg-red-50 border-red-200 text-red-700'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                }`}
              >
                {isSuspending ? (
                  <AlertTriangle className="w-5 h-5" />
                ) : (
                  <ShieldCheck className="w-5 h-5" />
                )}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {isSuspending ? 'Suspend Teacher Account' : 'Reactivate Teacher Account'}
                </h3>
                <p className="text-xs text-slate-500">Al-Mustafeed Faculty Access Control</p>
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

          <div className="mt-4 text-xs text-slate-600 space-y-3 leading-relaxed">
            {isSuspending ? (
              <>
                <p>
                  Are you sure you want to suspend the account of{' '}
                  <span className="font-bold text-slate-900">{teacher.name}</span>?
                </p>
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl space-y-1.5 text-red-900">
                  <p className="font-bold">Impact of suspension:</p>
                  <ul className="list-disc list-inside space-y-1 text-[11px] text-red-800">
                    <li>The teacher will be blocked from logging into the Tahfeez portal.</li>
                    <li>They will not be able to record student attendance.</li>
                    <li>
                      Their {teacher.studentCount} assigned students should be transferred to an active teacher.
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <p>
                  Are you sure you want to reactivate the account of{' '}
                  <span className="font-bold text-slate-900">{teacher.name}</span>?
                </p>
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1 text-emerald-900">
                  <p className="font-bold">Benefits of reactivation:</p>
                  <p className="text-[11px] text-emerald-800">
                    Portal access will be immediately restored, and classes can be reallocated to this instructor.
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="pt-5 mt-5 flex items-center justify-end gap-2.5 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`px-5 py-2 text-xs font-bold text-white rounded-xl transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer ${
                isSuspending
                  ? 'bg-red-700 hover:bg-red-800'
                  : 'bg-emerald-800 hover:bg-emerald-900'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>{isSuspending ? 'Yes, Suspend Account' : 'Yes, Reactivate Account'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

