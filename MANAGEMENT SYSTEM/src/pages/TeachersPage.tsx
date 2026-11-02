import { useState, useMemo, type FC } from 'react';
import {
  Search,
  UserPlus,
  Filter,
  UserCheck,
  Eye,
  Edit,
  Layers,
  Users,
  ArrowRightLeft,
  Ban,
  RotateCcw,
  Phone,
  MoreVertical,
  CheckCircle2,
  X,
  XCircle,
} from 'lucide-react';
import { INITIAL_TEACHERS, AVAILABLE_CLASSES } from '../data/teachersDemoData';
import type { Teacher } from '../types/teacher';
import { AddTeacherModal } from '../components/teachers/AddTeacherModal';
import { TeacherDetailsModal } from '../components/teachers/TeacherDetailsModal';
import { EditTeacherModal } from '../components/teachers/EditTeacherModal';
import { AssignClassModal } from '../components/teachers/AssignClassModal';
import { ViewStudentsModal } from '../components/teachers/ViewStudentsModal';
import { TransferStudentsModal } from '../components/teachers/TransferStudentsModal';
import { SuspendConfirmModal } from '../components/teachers/SuspendConfirmModal';

interface TeachersPageProps {
  onBackToDashboard?: () => void;
}

export const TeachersPage: FC<TeachersPageProps> = ({ onBackToDashboard }) => {
  // State: Teachers List
  const [teachers, setTeachers] = useState<Teacher[]>(INITIAL_TEACHERS);

  // State: Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [classFilter, setClassFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'suspended'>('all');

  // State: Modals & Selected Teacher
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [activeModal, setActiveModal] = useState<
    'details' | 'edit' | 'assign' | 'students' | 'transfer' | 'suspend' | null
  >(null);

  // State: Mobile / Desktop Action Dropdown Menu per row
  const [openActionMenuId, setOpenActionMenuId] = useState<string | null>(null);

  // State: Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtered teachers list
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
    showToast(`Successfully transferred ${count} students to new instructor.`);
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

  const openModal = (
    modalType: 'details' | 'edit' | 'assign' | 'students' | 'transfer' | 'suspend',
    teacher: Teacher
  ) => {
    setSelectedTeacher(teacher);
    setActiveModal(modalType);
    setOpenActionMenuId(null);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setClassFilter('all');
    setStatusFilter('all');
  };

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
          <span className="text-slate-800 font-bold">Teachers Management</span>
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

      {/* 5. Search and Filtering Controls */}
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
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
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

      {/* 2. Teachers List */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        
        {/* DESKTOP TABLE VIEW */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold">
                <th className="py-3.5 px-5">Teacher's Full Name</th>
                <th className="py-3.5 px-4">Phone Number</th>
                <th className="py-3.5 px-4">Assigned Class(es)</th>
                <th className="py-3.5 px-4">Students</th>
                <th className="py-3.5 px-4">Account Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTeachers.length > 0 ? (
                filteredTeachers.map((teacher) => {
                  const isActive = teacher.status === 'active';
                  const initials = teacher.name
                    .split(' ')
                    .map((n: string) => n[0])
                    .slice(0, 2)
                    .join('');

                  return (
                    <tr
                      key={teacher.id}
                      className="hover:bg-slate-50/70 transition-colors group"
                    >
                      {/* 1. Name & Qualification */}
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-xl font-bold flex items-center justify-center shrink-0 ${
                              isActive
                                ? 'bg-emerald-100 text-emerald-900'
                                : 'bg-slate-200 text-slate-600'
                            }`}
                          >
                            {initials}
                          </div>
                          <div>
                            <button
                              onClick={() => openModal('details', teacher)}
                              type="button"
                              className="font-bold text-slate-900 hover:text-emerald-800 transition-colors cursor-pointer text-left"
                            >
                              {teacher.name}
                            </button>
                            <p className="text-[11px] text-slate-400 truncate max-w-xs">
                              {teacher.qualification}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* 2. Phone Number */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          <a
                            href={`tel:${teacher.phone}`}
                            className="hover:text-emerald-800 hover:underline"
                          >
                            {teacher.phone}
                          </a>
                        </div>
                      </td>

                      {/* 3. Assigned Classes */}
                      <td className="py-3.5 px-4">
                        {teacher.assignedClasses.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {teacher.assignedClasses.map((cls: string) => (
                              <span
                                key={cls}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100 font-semibold text-[11px]"
                              >
                                <Layers className="w-3 h-3 text-emerald-600" />
                                {cls}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-[11px] text-slate-400 italic">Unassigned</span>
                        )}
                      </td>

                      {/* Students Count */}
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-slate-700">
                          {teacher.studentCount} Students
                        </span>
                      </td>

                      {/* 4. Status Badge */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                            isActive
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : 'bg-red-50 text-red-800 border-red-200'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isActive ? 'bg-emerald-600' : 'bg-red-600'
                            }`}
                          />
                          {isActive ? 'Active' : 'Suspended'}
                        </span>
                      </td>

                      {/* 5. Actions */}
                      <td className="py-3.5 px-5 text-right">
                        <div className="relative inline-block text-left">
                          <button
                            type="button"
                            onClick={() =>
                              setOpenActionMenuId(
                                openActionMenuId === teacher.id ? null : teacher.id
                              )
                            }
                            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                            aria-label="Teacher actions"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          {/* Action Dropdown Menu */}
                          {openActionMenuId === teacher.id && (
                            <div className="absolute right-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-slate-200 z-30 py-1.5 text-xs animate-fadeIn">
                              <button
                                onClick={() => openModal('details', teacher)}
                                className="w-full px-3.5 py-2 text-left hover:bg-slate-50 flex items-center gap-2 text-slate-700 cursor-pointer"
                              >
                                <Eye className="w-3.5 h-3.5 text-slate-400" />
                                <span>View Details</span>
                              </button>

                              <button
                                onClick={() => openModal('edit', teacher)}
                                className="w-full px-3.5 py-2 text-left hover:bg-slate-50 flex items-center gap-2 text-slate-700 cursor-pointer"
                              >
                                <Edit className="w-3.5 h-3.5 text-slate-400" />
                                <span>Edit Information</span>
                              </button>

                              <button
                                onClick={() => openModal('assign', teacher)}
                                className="w-full px-3.5 py-2 text-left hover:bg-slate-50 flex items-center gap-2 text-slate-700 cursor-pointer"
                              >
                                <Layers className="w-3.5 h-3.5 text-slate-400" />
                                <span>Assign / Change Classes</span>
                              </button>

                              <button
                                onClick={() => openModal('students', teacher)}
                                className="w-full px-3.5 py-2 text-left hover:bg-slate-50 flex items-center gap-2 text-slate-700 cursor-pointer"
                              >
                                <Users className="w-3.5 h-3.5 text-slate-400" />
                                <span>View Assigned Students</span>
                              </button>

                              {teacher.studentCount > 0 && (
                                <button
                                  onClick={() => openModal('transfer', teacher)}
                                  className="w-full px-3.5 py-2 text-left hover:bg-slate-50 flex items-center gap-2 text-amber-700 cursor-pointer"
                                >
                                  <ArrowRightLeft className="w-3.5 h-3.5 text-amber-500" />
                                  <span>Transfer Students</span>
                                </button>
                              )}

                              <div className="pt-1 mt-1 border-t border-slate-100">
                                {isActive ? (
                                  <button
                                    onClick={() => openModal('suspend', teacher)}
                                    className="w-full px-3.5 py-2 text-left hover:bg-red-50 flex items-center gap-2 text-red-700 cursor-pointer font-medium"
                                  >
                                    <Ban className="w-3.5 h-3.5" />
                                    <span>Suspend Account</span>
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => openModal('suspend', teacher)}
                                    className="w-full px-3.5 py-2 text-left hover:bg-emerald-50 flex items-center gap-2 text-emerald-800 cursor-pointer font-medium"
                                  >
                                    <RotateCcw className="w-3.5 h-3.5" />
                                    <span>Reactivate Account</span>
                                  </button>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <XCircle className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                    <p className="text-sm font-semibold text-slate-600">No teachers found</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Try adjusting your search query or class filter.
                    </p>
                    <button
                      onClick={resetFilters}
                      className="mt-3 text-xs font-bold text-emerald-800 hover:underline"
                    >
                      Clear all filters
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* MOBILE RESPONSIVE CARDS VIEW (Android & iPhone) */}
        <div className="lg:hidden divide-y divide-slate-100">
          {filteredTeachers.length > 0 ? (
            filteredTeachers.map((teacher) => {
              const isActive = teacher.status === 'active';
                const initials = teacher.name
                  .split(' ')
                  .map((n: string) => n[0])
                  .slice(0, 2)
                  .join('');

              return (
                <div key={teacher.id} className="p-4 sm:p-5 space-y-3">
                  {/* Top card row */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl font-bold flex items-center justify-center shrink-0 ${
                          isActive
                            ? 'bg-emerald-100 text-emerald-900'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {initials}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm">{teacher.name}</h3>
                        <p className="text-[11px] text-slate-400 line-clamp-1">
                          {teacher.qualification}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border shrink-0 ${
                        isActive
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-red-50 text-red-800 border-red-200'
                      }`}
                    >
                      {isActive ? 'Active' : 'Suspended'}
                    </span>
                  </div>

                  {/* Middle details */}
                  <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Phone</span>
                      <a href={`tel:${teacher.phone}`} className="font-semibold text-slate-800 flex items-center gap-1">
                        <Phone className="w-3 h-3 text-slate-400" />
                        {teacher.phone}
                      </a>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Assigned Class</span>
                      <span className="font-semibold text-emerald-800 truncate block">
                        {teacher.assignedClasses.join(', ') || 'Unassigned'}
                      </span>
                    </div>
                  </div>

                  {/* Action buttons on mobile */}
                  <div className="flex items-center justify-between gap-2 pt-1">
                    <button
                      onClick={() => openModal('details', teacher)}
                      type="button"
                      className="flex-1 py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg text-center transition-colors cursor-pointer"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => openModal('assign', teacher)}
                      type="button"
                      className="flex-1 py-1.5 px-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-lg text-center transition-colors cursor-pointer"
                    >
                      Classes
                    </button>
                    <button
                      onClick={() => openModal('students', teacher)}
                      type="button"
                      className="flex-1 py-1.5 px-2 bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-semibold rounded-lg text-center transition-colors cursor-pointer"
                    >
                      Students
                    </button>
                    <button
                      onClick={() => openModal('suspend', teacher)}
                      type="button"
                      className={`p-1.5 rounded-lg border text-xs font-bold transition-colors cursor-pointer ${
                        isActive
                          ? 'border-red-200 text-red-700 hover:bg-red-50'
                          : 'border-emerald-200 text-emerald-800 hover:bg-emerald-50'
                      }`}
                      title={isActive ? 'Suspend' : 'Reactivate'}
                    >
                      {isActive ? <Ban className="w-4 h-4" /> : <RotateCcw className="w-4 h-4" />}
                    </button>
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
                className="mt-2 text-xs font-bold text-emerald-800 hover:underline"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

        {/* Footer Roster Summary */}
        <div className="p-4 bg-slate-50/90 border-t border-slate-200/80 text-xs text-slate-500 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <span>
            Total: <strong>{teachers.length}</strong> Registered Teachers •{' '}
            <span className="text-emerald-700 font-semibold">
              {teachers.filter((t) => t.status === 'active').length} Active
            </span>{' '}
            •{' '}
            <span className="text-red-600 font-semibold">
              {teachers.filter((t) => t.status === 'suspended').length} Suspended
            </span>
          </span>
          <span className="text-[11px] text-slate-400 font-mono">
            Al-Mustafeed Faculty Registry v1.0
          </span>
        </div>
      </div>

      {/* 3. Add New Teacher Modal */}
      <AddTeacherModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddTeacher={handleAddTeacher}
      />

      {/* 4. Teacher Details Modal */}
      <TeacherDetailsModal
        teacher={selectedTeacher}
        isOpen={activeModal === 'details'}
        onClose={closeModal}
        onEdit={() => {
          closeModal();
          if (selectedTeacher) {
            setActiveModal('edit');
          }
        }}
      />

      {/* 4. Edit Teacher Information Modal */}
      <EditTeacherModal
        teacher={selectedTeacher}
        isOpen={activeModal === 'edit'}
        onClose={closeModal}
        onUpdateTeacher={handleUpdateTeacher}
      />

      {/* 4. Assign or Change Classes Modal */}
      <AssignClassModal
        teacher={selectedTeacher}
        isOpen={activeModal === 'assign'}
        onClose={closeModal}
        onAssignClasses={handleAssignClasses}
      />

      {/* 4. View Assigned Students Modal */}
      <ViewStudentsModal
        teacher={selectedTeacher}
        isOpen={activeModal === 'students'}
        onClose={closeModal}
        onOpenTransfer={() => {
          closeModal();
          if (selectedTeacher) {
            setActiveModal('transfer');
          }
        }}
      />

      {/* 4. Transfer Students to Another Teacher Modal */}
      <TransferStudentsModal
        sourceTeacher={selectedTeacher}
        allTeachers={teachers}
        isOpen={activeModal === 'transfer'}
        onClose={closeModal}
        onTransfer={handleTransferStudents}
      />

      {/* 4. Suspend or Reactivate Confirmation Modal */}
      <SuspendConfirmModal
        teacher={selectedTeacher}
        isOpen={activeModal === 'suspend'}
        onClose={closeModal}
        onConfirm={() => {
          if (selectedTeacher) {
            handleToggleStatus(selectedTeacher.id);
          }
        }}
      />
    </div>
  );
};
