import { useState, useMemo, type FC } from 'react';
import {
  Search,
  UserPlus,
  Filter,
  UserCheck,
  Layers,
  CheckCircle2,
  X,
  XCircle,
  ChevronRight,
} from 'lucide-react';
import { INITIAL_TEACHERS, AVAILABLE_CLASSES } from '../data/teachersDemoData';
import type { Teacher } from '../types/teacher';
import { AddTeacherModal } from '../components/teachers/AddTeacherModal';
import { EditTeacherModal } from '../components/teachers/EditTeacherModal';
import { AssignClassModal } from '../components/teachers/AssignClassModal';
import { TransferStudentsModal } from '../components/teachers/TransferStudentsModal';
import { SuspendConfirmModal } from '../components/teachers/SuspendConfirmModal';
import { TeacherDetailsView } from '../components/teachers/TeacherDetailsView';

interface TeachersPageProps {
  onBackToDashboard?: () => void;
}

export const TeachersPage: FC<TeachersPageProps> = ({ onBackToDashboard }) => {
  // State: Teachers List
  const [teachers, setTeachers] = useState<Teacher[]>(INITIAL_TEACHERS);

  // State: Active Selected Teacher for Dedicated Teacher Details View
  const [activeTeacherId, setActiveTeacherId] = useState<string | null>(null);

  // State: Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [classFilter, setClassFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'suspended'>('all');

  // State: Action Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [modalTargetTeacher, setModalTargetTeacher] = useState<Teacher | null>(null);
  const [activeModal, setActiveModal] = useState<'edit' | 'assign' | 'transfer' | 'suspend' | null>(null);

  // State: Toast Feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Currently viewed teacher for Details View
  const currentViewedTeacher = useMemo(() => {
    return teachers.find((t) => t.id === activeTeacherId) || null;
  }, [teachers, activeTeacherId]);

  // Filtered teachers list (searches name or phone; filters by class or status)
  const filteredTeachers = useMemo(() => {
    return teachers.filter((t) => {
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        query === '' ||
        t.name.toLowerCase().includes(query) ||
        t.phone.toLowerCase().includes(query);

      const matchesClass =
        classFilter === 'all' ||
        (classFilter === 'unassigned'
          ? t.assignedClasses.length === 0
          : t.assignedClasses.includes(classFilter));

      const matchesStatus =
        statusFilter === 'all' || t.status === statusFilter;

      return matchesSearch && matchesClass && matchesStatus;
    });
  }, [teachers, searchQuery, classFilter, statusFilter]);

  // Handlers
  const handleAddTeacher = (newTeacher: Teacher) => {
    setTeachers((prev) => [newTeacher, ...prev]);
    showToast(`Teacher ${newTeacher.name} successfully registered.`);
  };

  const handleUpdateTeacher = (updatedTeacher: Teacher) => {
    setTeachers((prev) =>
      prev.map((t) => (t.id === updatedTeacher.id ? updatedTeacher : t))
    );
    showToast(`Teacher details updated for ${updatedTeacher.name}.`);
  };

  const handleAssignClasses = (teacherId: string, assignedClasses: string[]) => {
    setTeachers((prev) =>
      prev.map((t) =>
        t.id === teacherId
          ? {
              ...t,
              assignedClasses,
              studentCount: assignedClasses.length > 0 ? 55 * assignedClasses.length : 0,
            }
          : t
      )
    );
    showToast('Assigned classes updated successfully.');
  };

  const handleTransferStudents = (
    sourceTeacherId: string,
    targetTeacherId: string,
    count: number
  ) => {
    setTeachers((prev) =>
      prev.map((t) => {
        if (t.id === sourceTeacherId) {
          return { ...t, studentCount: Math.max(0, t.studentCount - count) };
        }
        if (t.id === targetTeacherId) {
          return { ...t, studentCount: t.studentCount + count };
        }
        return t;
      })
    );
    showToast(`Successfully transferred ${count} students.`);
  };

  const handleToggleStatus = (teacherId: string) => {
    setTeachers((prev) =>
      prev.map((t) => {
        if (t.id === teacherId) {
          const nextStatus = t.status === 'active' ? 'suspended' : 'active';
          showToast(
            `Account for ${t.name} has been ${nextStatus === 'active' ? 'reactivated' : 'suspended'}.`
          );
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  const openActionModal = (
    modalType: 'edit' | 'assign' | 'transfer' | 'suspend',
    teacher: Teacher
  ) => {
    setModalTargetTeacher(teacher);
    setActiveModal(modalType);
  };

  const closeActionModal = () => {
    setActiveModal(null);
    setModalTargetTeacher(null);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setClassFilter('all');
    setStatusFilter('all');
  };

  // IF AN INDIVIDUAL TEACHER IS OPENED -> RENDER THE TEACHER DETAILS VIEW
  if (currentViewedTeacher) {
    return (
      <>
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 right-4 z-50 bg-emerald-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-emerald-700 flex items-center gap-2.5 text-xs font-semibold animate-slideDown">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
            <button
              onClick={() => setToastMessage(null)}
              className="ml-2 text-emerald-300 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <TeacherDetailsView
          teacher={currentViewedTeacher}
          onBack={() => setActiveTeacherId(null)}
          onEdit={() => openActionModal('edit', currentViewedTeacher)}
          onChangeClass={() => openActionModal('assign', currentViewedTeacher)}
          onTransferStudents={() => openActionModal('transfer', currentViewedTeacher)}
          onToggleSuspend={() => openActionModal('suspend', currentViewedTeacher)}
        />

        {/* Action Modals */}
        <EditTeacherModal
          teacher={modalTargetTeacher}
          isOpen={activeModal === 'edit'}
          onClose={closeActionModal}
          onUpdateTeacher={handleUpdateTeacher}
        />

        <AssignClassModal
          teacher={modalTargetTeacher}
          isOpen={activeModal === 'assign'}
          onClose={closeActionModal}
          onAssignClasses={handleAssignClasses}
        />

        <TransferStudentsModal
          sourceTeacher={modalTargetTeacher}
          allTeachers={teachers}
          isOpen={activeModal === 'transfer'}
          onClose={closeActionModal}
          onTransfer={handleTransferStudents}
        />

        <SuspendConfirmModal
          teacher={modalTargetTeacher}
          isOpen={activeModal === 'suspend'}
          onClose={closeActionModal}
          onConfirm={() => {
            if (modalTargetTeacher) {
              handleToggleStatus(modalTargetTeacher.id);
            }
          }}
        />
      </>
    );
  }

  // OTHERWISE -> RENDER THE REVISED MAIN TEACHERS LIST
  return (
    <div className="space-y-6 animate-fadeIn select-none">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-emerald-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-emerald-700 flex items-center gap-2.5 text-xs font-semibold animate-slideDown">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-emerald-300 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Breadcrumb Navigation */}
      {onBackToDashboard && (
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <button
            onClick={onBackToDashboard}
            type="button"
            className="text-slate-500 hover:text-emerald-900 font-semibold cursor-pointer transition-colors"
          >
            Dashboard
          </button>
          <span>/</span>
          <span className="text-slate-800 font-bold">Teachers</span>
        </div>
      )}

      {/* 1. Page Header & Add Teacher Button */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-100 flex items-center justify-center shrink-0">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Teachers
              </h1>
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 sm:hidden inline-block mt-0.5">
                {teachers.length} Faculty
              </span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage and organise Al-Mustafeed teachers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs">
            <span className="text-slate-500 font-medium">Total Teachers:</span>
            <span className="text-emerald-900 font-extrabold text-sm">{teachers.length}</span>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            type="button"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 text-white text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-700"
          >
            <UserPlus className="w-4 h-4 text-amber-300" />
            <span>Add New Teacher</span>
          </button>
        </div>
      </div>

      {/* 4. Search and Filtering Controls */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          
          {/* Search bar: Full Name or Phone Number */}
          <div className="sm:col-span-6 relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search teachers by full name or phone number..."
              className="w-full pl-10 pr-9 py-2 sm:py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-700"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filter by Assigned Class */}
          <div className="sm:col-span-3">
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="w-full px-3 py-2 sm:py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-700 cursor-pointer"
            >
              <option value="all">All Assigned Classes</option>
              {AVAILABLE_CLASSES.map((cls: string) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
              <option value="unassigned">Unassigned (0 Classes)</option>
            </select>
          </div>

          {/* Filter by Status */}
          <div className="sm:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'suspended')}
              className="w-full px-3 py-2 sm:py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-700 cursor-pointer"
            >
              <option value="all">All Account Statuses</option>
              <option value="active">Active Only</option>
              <option value="suspended">Suspended Only</option>
            </select>
          </div>
        </div>

        {/* Filter Summary & Reset pill */}
        {(searchQuery || classFilter !== 'all' || statusFilter !== 'all') && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-emerald-700" />
              <span>
                Showing <strong>{filteredTeachers.length}</strong> of {teachers.length} teachers
              </span>
            </div>
            <button
              onClick={resetFilters}
              type="button"
              className="text-emerald-700 hover:text-emerald-900 font-semibold cursor-pointer hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* REVISED TEACHERS LIST (Displays ONLY: 1. Full Name, 2. Assigned Class, 3. Total Students) */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        
        {/* DESKTOP TABLE VIEW */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold text-xs">
                <th className="py-3.5 px-6">1. Teacher's Full Name</th>
                <th className="py-3.5 px-6">2. Assigned Class or Classes</th>
                <th className="py-3.5 px-6 text-right">3. Total Assigned Students</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTeachers.length > 0 ? (
                filteredTeachers.map((teacher) => {
                  const initials = teacher.name
                    .split(' ')
                    .map((n: string) => n[0])
                    .slice(0, 2)
                    .join('');

                  return (
                    <tr
                      key={teacher.id}
                      onClick={() => setActiveTeacherId(teacher.id)}
                      className="hover:bg-emerald-50/50 transition-colors group cursor-pointer"
                      title="Click to view full teacher details"
                    >
                      {/* 1. Teacher's Full Name */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3.5">
                          <div className="w-10 h-10 rounded-xl font-extrabold flex items-center justify-center shrink-0 bg-emerald-800 text-amber-300 shadow-2xs group-hover:scale-105 transition-transform">
                            {initials}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 group-hover:text-emerald-900 transition-colors block text-sm sm:text-base">
                              {teacher.name}
                            </span>
                            <span className="text-[11px] text-slate-400 group-hover:text-emerald-700 transition-colors">
                              Click to view full profile & actions →
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* 2. Assigned Class or Classes */}
                      <td className="py-4 px-6">
                        {teacher.assignedClasses.length > 0 ? (
                          <div className="flex flex-wrap gap-1.5">
                            {teacher.assignedClasses.map((cls: string) => (
                              <span
                                key={cls}
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 font-bold text-xs"
                              >
                                <Layers className="w-3.5 h-3.5 text-emerald-700" />
                                {cls}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 italic">None (Unassigned)</span>
                        )}
                      </td>

                      {/* 3. Total Number of Students Assigned */}
                      <td className="py-4 px-6 text-right">
                        <div className="inline-flex items-center gap-2">
                          <span className="font-extrabold text-slate-900 text-sm sm:text-base">
                            {teacher.studentCount}
                          </span>
                          <span className="text-xs text-slate-500 font-medium">Students</span>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-1 transition-all" />
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={3} className="py-12 text-center text-slate-400">
                    <XCircle className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                    <p className="text-sm font-semibold text-slate-600">No teachers found</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Try adjusting your search query or class filter.
                    </p>
                    <button
                      onClick={resetFilters}
                      className="mt-3 text-xs font-bold text-emerald-800 hover:underline cursor-pointer"
                    >
                      Clear all filters
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* MOBILE RESPONSIVE CARDS VIEW (Entire card clickable) */}
        <div className="sm:hidden divide-y divide-slate-100">
          {filteredTeachers.length > 0 ? (
            filteredTeachers.map((teacher) => {
              const initials = teacher.name
                .split(' ')
                .map((n: string) => n[0])
                .slice(0, 2)
                .join('');

              return (
                <div
                  key={teacher.id}
                  onClick={() => setActiveTeacherId(teacher.id)}
                  className="p-4 space-y-2.5 active:bg-emerald-50/60 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-3">
                    {/* 1. Full Name */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-800 text-amber-300 font-extrabold text-xs flex items-center justify-center shrink-0">
                        {initials}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm">{teacher.name}</h3>
                        <p className="text-[11px] text-emerald-800">Tap to view details →</p>
                      </div>
                    </div>

                    <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
                  </div>

                  {/* 2. Assigned Class & 3. Total Students */}
                  <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-400 text-[11px]">Class:</span>
                      <span className="font-bold text-emerald-900">
                        {teacher.assignedClasses.join(', ') || 'Unassigned'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-400 text-[11px]">Students:</span>
                      <span className="font-extrabold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-full">
                        {teacher.studentCount}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 px-4 text-center text-slate-400">
              <XCircle className="w-8 h-8 mx-auto text-slate-300 mb-2" />
              <p className="text-sm font-semibold text-slate-600">No teachers found</p>
              <button
                onClick={resetFilters}
                className="mt-2 text-xs font-bold text-emerald-800 hover:underline cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

        {/* Footer Roster Summary */}
        <div className="p-4 bg-slate-50/90 border-t border-slate-200/80 text-xs text-slate-500 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <span>
            Total: <strong>{teachers.length}</strong> Registered Teachers • Click any teacher record to view full profile & actions.
          </span>
          <span className="text-[11px] text-slate-400 font-mono">
            Al-Mustafeed Faculty Registry
          </span>
        </div>
      </div>

      {/* 3. Add New Teacher Modal */}
      <AddTeacherModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddTeacher={handleAddTeacher}
      />

      {/* Action Modals */}
      <EditTeacherModal
        teacher={modalTargetTeacher}
        isOpen={activeModal === 'edit'}
        onClose={closeActionModal}
        onUpdateTeacher={handleUpdateTeacher}
      />

      <AssignClassModal
        teacher={modalTargetTeacher}
        isOpen={activeModal === 'assign'}
        onClose={closeActionModal}
        onAssignClasses={handleAssignClasses}
      />

      <TransferStudentsModal
        sourceTeacher={modalTargetTeacher}
        allTeachers={teachers}
        isOpen={activeModal === 'transfer'}
        onClose={closeActionModal}
        onTransfer={handleTransferStudents}
      />

      <SuspendConfirmModal
        teacher={modalTargetTeacher}
        isOpen={activeModal === 'suspend'}
        onClose={closeActionModal}
        onConfirm={() => {
          if (modalTargetTeacher) {
            handleToggleStatus(modalTargetTeacher.id);
          }
        }}
      />
    </div>
  );
};
