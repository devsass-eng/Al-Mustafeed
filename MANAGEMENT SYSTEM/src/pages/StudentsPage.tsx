import { useState, useMemo, type FC } from 'react';
import {
  Search,
  UserPlus,
  Filter,
  GraduationCap,
  Layers,
  CheckCircle2,
  X,
  XCircle,
  ChevronRight,
} from 'lucide-react';
import { INITIAL_STUDENTS, STUDENT_CLASSES } from '../data/studentsDemoData';
import type { Student } from '../types/student';
import { AddStudentModal } from '../components/students/AddStudentModal';
import { EditStudentModal } from '../components/students/EditStudentModal';
import { ChangeClassModal } from '../components/students/ChangeClassModal';
import { SuspendStudentModal } from '../components/students/SuspendStudentModal';
import { StudentDetailsView } from '../components/students/StudentDetailsView';

interface StudentsPageProps {
  onBackToDashboard?: () => void;
}

export const StudentsPage: FC<StudentsPageProps> = ({ onBackToDashboard }) => {
  // State: Students List
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);

  // State: Opened student for Details View
  const [activeStudentId, setActiveStudentId] = useState<string | null>(null);

  // State: Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [classFilter, setClassFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'suspended'>('all');

  // State: Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [modalTargetStudent, setModalTargetStudent] = useState<Student | null>(null);
  const [activeModal, setActiveModal] = useState<'edit' | 'changeClass' | 'suspend' | null>(null);

  // State: Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Currently viewed student
  const currentViewedStudent = useMemo(
    () => students.find((s) => s.id === activeStudentId) || null,
    [students, activeStudentId]
  );

  // Filtered students list
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        query === '' ||
        s.name.toLowerCase().includes(query) ||
        s.studentCode.toLowerCase().includes(query) ||
        s.guardianPhone.toLowerCase().includes(query);

      const matchesClass = classFilter === 'all' || s.assignedClass === classFilter;
      const matchesStatus = statusFilter === 'all' || s.status === statusFilter;

      return matchesSearch && matchesClass && matchesStatus;
    });
  }, [students, searchQuery, classFilter, statusFilter]);

  // Handlers
  const handleAddStudent = (newStudent: Student) => {
    setStudents((prev) => [newStudent, ...prev]);
    showToast(`Student ${newStudent.name} successfully registered.`);
  };

  const handleUpdateStudent = (updated: Student) => {
    setStudents((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
    showToast(`Student details updated for ${updated.name}.`);
  };

  const handleChangeClass = (
    studentId: string,
    newClass: string,
    newTeacherId: string,
    newTeacherName: string
  ) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId
          ? { ...s, assignedClass: newClass, assignedTeacherId: newTeacherId, assignedTeacherName: newTeacherName }
          : s
      )
    );
    showToast('Student class changed successfully.');
  };

  const handleToggleStatus = (studentId: string) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          const next = s.status === 'active' ? 'suspended' : 'active';
          showToast(`Account for ${s.name} has been ${next === 'active' ? 'reactivated' : 'suspended'}.`);
          return { ...s, status: next };
        }
        return s;
      })
    );
  };

  const openActionModal = (
    modalType: 'edit' | 'changeClass' | 'suspend',
    student: Student
  ) => {
    setModalTargetStudent(student);
    setActiveModal(modalType);
  };

  const closeActionModal = () => {
    setActiveModal(null);
    setModalTargetStudent(null);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setClassFilter('all');
    setStatusFilter('all');
  };

  // Toast component (shared)
  const Toast = (
    <>
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-emerald-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-emerald-700 flex items-center gap-2.5 text-xs font-semibold animate-slideDown">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-emerald-300 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </>
  );

  // Action modals (shared)
  const ActionModals = (
    <>
      <EditStudentModal
        student={modalTargetStudent}
        isOpen={activeModal === 'edit'}
        onClose={closeActionModal}
        onUpdateStudent={handleUpdateStudent}
      />
      <ChangeClassModal
        student={modalTargetStudent}
        isOpen={activeModal === 'changeClass'}
        onClose={closeActionModal}
        onChangeClass={handleChangeClass}
      />
      <SuspendStudentModal
        student={modalTargetStudent}
        isOpen={activeModal === 'suspend'}
        onClose={closeActionModal}
        onConfirm={() => { if (modalTargetStudent) handleToggleStatus(modalTargetStudent.id); }}
      />
    </>
  );

  // ── IF A STUDENT IS OPENED → SHOW STUDENT DETAILS VIEW ──
  if (currentViewedStudent) {
    return (
      <>
        {Toast}
        <StudentDetailsView
          student={currentViewedStudent}
          onBack={() => setActiveStudentId(null)}
          onEdit={() => openActionModal('edit', currentViewedStudent)}
          onChangeClass={() => openActionModal('changeClass', currentViewedStudent)}
          onToggleSuspend={() => openActionModal('suspend', currentViewedStudent)}
        />
        {ActionModals}
      </>
    );
  }

  // ── MAIN STUDENTS LIST ──
  return (
    <div className="space-y-6 animate-fadeIn select-none">

      {Toast}

      {/* Breadcrumb */}
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
          <span className="text-slate-800 font-bold">Students</span>
        </div>
      )}

      {/* Page Header */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-100 flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">Students</h1>
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 sm:hidden inline-block mt-0.5">
                {students.length} Enrolled
              </span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage and organise Al-Mustafeed Tahfeez students.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs">
            <span className="text-slate-500 font-medium">Total Students:</span>
            <span className="text-emerald-900 font-extrabold text-sm">{students.length}</span>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            type="button"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 text-white text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-700"
          >
            <UserPlus className="w-4 h-4 text-amber-300" />
            <span>Add New Student</span>
          </button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">

          {/* Search */}
          <div className="sm:col-span-6 relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, student code or guardian phone..."
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

          {/* Filter by Class */}
          <div className="sm:col-span-3">
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="w-full px-3 py-2 sm:py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-700 cursor-pointer"
            >
              <option value="all">All Classes</option>
              {STUDENT_CLASSES.map((cls: string) => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>

          {/* Filter by Status */}
          <div className="sm:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'suspended')}
              className="w-full px-3 py-2 sm:py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-700 cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active Only</option>
              <option value="suspended">Suspended Only</option>
            </select>
          </div>
        </div>

        {/* Filter summary pill */}
        {(searchQuery || classFilter !== 'all' || statusFilter !== 'all') && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-emerald-700" />
              <span>
                Showing <strong>{filteredStudents.length}</strong> of {students.length} students
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

      {/* Students List */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">

        {/* DESKTOP TABLE */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold text-xs">
                <th className="py-3.5 px-6">1. Student's Full Name</th>
                <th className="py-3.5 px-6">2. Student Code</th>
                <th className="py-3.5 px-6">3. Assigned Class</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => {
                  const initials = student.name
                    .split(' ')
                    .map((n: string) => n[0])
                    .slice(0, 2)
                    .join('');

                  const isActive = student.status === 'active';

                  return (
                    <tr
                      key={student.id}
                      onClick={() => setActiveStudentId(student.id)}
                      className="hover:bg-emerald-50/50 transition-colors group cursor-pointer"
                      title="Click to view full student details"
                    >
                      {/* 1. Full Name */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3.5">
                          <div className={`w-10 h-10 rounded-xl font-extrabold text-xs flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform ${isActive ? 'bg-emerald-800 text-amber-300' : 'bg-slate-400 text-white'}`}>
                            {initials}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 group-hover:text-emerald-900 transition-colors block text-sm sm:text-base">
                              {student.name}
                            </span>
                            <span className="text-[11px] text-slate-400 group-hover:text-emerald-700 transition-colors">
                              {isActive ? 'Click to view full profile & actions →' : '⚠ Account Suspended'}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* 2. Student Code */}
                      <td className="py-4 px-6">
                        <span className="font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-lg text-xs">
                          {student.studentCode}
                        </span>
                      </td>

                      {/* 3. Assigned Class */}
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-between gap-3">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 font-bold text-xs">
                            <Layers className="w-3.5 h-3.5 text-emerald-700" />
                            {student.assignedClass}
                          </span>
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
                    <p className="text-sm font-semibold text-slate-600">No students found</p>
                    <p className="text-xs text-slate-400 mt-1">Try adjusting your search query or class filter.</p>
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

        {/* MOBILE CARDS */}
        <div className="sm:hidden divide-y divide-slate-100">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => {
              const initials = student.name
                .split(' ')
                .map((n: string) => n[0])
                .slice(0, 2)
                .join('');
              const isActive = student.status === 'active';

              return (
                <div
                  key={student.id}
                  onClick={() => setActiveStudentId(student.id)}
                  className="p-4 space-y-2.5 active:bg-emerald-50/60 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl font-extrabold text-xs flex items-center justify-center shrink-0 ${isActive ? 'bg-emerald-800 text-amber-300' : 'bg-slate-400 text-white'}`}>
                        {initials}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm">{student.name}</h3>
                        <p className="text-[11px] font-mono text-emerald-800">{student.studentCode}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-400 text-[11px]">Class:</span>
                      <span className="font-bold text-emerald-900">{student.assignedClass}</span>
                    </div>
                    {!isActive && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                        Suspended
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 px-4 text-center text-slate-400">
              <XCircle className="w-8 h-8 mx-auto text-slate-300 mb-2" />
              <p className="text-sm font-semibold text-slate-600">No students found</p>
              <button
                onClick={resetFilters}
                className="mt-2 text-xs font-bold text-emerald-800 hover:underline cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50/90 border-t border-slate-200/80 text-xs text-slate-500 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <span>
            Total: <strong>{students.length}</strong> Enrolled Students • Click any record to view full profile & actions.
          </span>
          <span className="text-[11px] text-slate-400 font-mono">Al-Mustafeed Student Registry</span>
        </div>
      </div>

      {/* Add Student Modal */}
      <AddStudentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddStudent={handleAddStudent}
      />

      {ActionModals}
    </div>
  );
};
