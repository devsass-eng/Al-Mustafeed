import { useState, useEffect, type FC } from 'react';
import { X, Layers, Check } from 'lucide-react';
import { AVAILABLE_CLASSES } from '../../data/teachersDemoData';
import type { Teacher } from '../../types/teacher';

interface AssignClassModalProps {
  teacher: Teacher | null;
  isOpen: boolean;
  onClose: () => void;
  onAssignClasses: (teacherId: string, classes: string[]) => void;
}

export const AssignClassModal: FC<AssignClassModalProps> = ({
  teacher,
  isOpen,
  onClose,
  onAssignClasses,
}) => {
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);

  useEffect(() => {
    if (teacher) {
      setSelectedClasses(teacher.assignedClasses);
    }
  }, [teacher]);

  if (!isOpen || !teacher) return null;

  const toggleClass = (className: string) => {
    setSelectedClasses((prev) =>
      prev.includes(className)
        ? prev.filter((c) => c !== className)
        : [...prev, className]
    );
  };

  const handleSave = () => {
    onAssignClasses(teacher.id, selectedClasses);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-md bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-emerald-800 via-emerald-600 to-amber-500" />

        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Assign Classes</h3>
                <p className="text-xs text-slate-500">
                  Assign halaqahs to <span className="font-semibold text-slate-800">{teacher.name}</span>
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

          <div className="mt-5 space-y-2.5">
            <p className="text-xs text-slate-600">
              Select one or more classes to assign to this instructor:
            </p>

            <div className="space-y-2 mt-3">
              {AVAILABLE_CLASSES.map((cls) => {
                const isSelected = selectedClasses.includes(cls);
                return (
                  <button
                    key={cls}
                    type="button"
                    onClick={() => toggleClass(cls)}
                    className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-950 shadow-2xs font-semibold'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Layers className={`w-4 h-4 ${isSelected ? 'text-emerald-700' : 'text-slate-400'}`} />
                      <span className="text-xs sm:text-sm">{cls}</span>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                        isSelected
                          ? 'bg-emerald-700 border-emerald-700 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-5 mt-4 flex items-center justify-end gap-2.5 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Update Classes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

