import type { FC } from 'react';
import type { AdminTab } from '../../types/admin';
import {
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  UserCheck,
  GraduationCap,
  Layers,
  CalendarCheck,
  FileText,
  Megaphone,
  Globe,
  Settings,
} from 'lucide-react';

interface SectionPlaceholderProps {
  tab: AdminTab;
  onBackToOverview: () => void;
}

export const SectionPlaceholder: FC<SectionPlaceholderProps> = ({
  tab,
  onBackToOverview,
}) => {
  const getSectionDetails = (activeTab: AdminTab) => {
    switch (activeTab) {
      case 'teachers':
        return {
          title: 'Teachers Management',
          subtitle: 'Faculty directory, class assignments, teacher attendance & profiles',
          icon: UserCheck,
          accent: 'emerald',
          scope: [
            'View all 9 certified Tahfeez instructors and assigned halaqahs',
            'Record and monitor daily teacher attendance',
            'Assign teachers to specific student groups and classes',
            'Maintain instructor contact records and credentials',
          ],
        };
      case 'students':
        return {
          title: 'Students Directory & Admissions',
          subtitle: 'Student registry, admissions records, class rosters & emergency contacts',
          icon: GraduationCap,
          accent: 'blue',
          scope: [
            'Directory of all 330 enrolled Tahfeez students',
            'Register new student enrolments with guardian details',
            'Assign students to designated class levels (Levels 1 to 6)',
            'Generate official student ID cards with digital photos',
          ],
        };
      case 'classes':
        return {
          title: 'Classes & Halaqah Allocations',
          subtitle: 'Tahfeez class grouping, capacity management & instructor allocations',
          icon: Layers,
          accent: 'amber',
          scope: [
            'Manage the 6 official Tahfeez class levels',
            'Review class rosters and student distributions (~55 per class)',
            'Assign lead Hifz instructors and class coordinators',
            'Organize morning and evening tahfeez shifts',
          ],
        };
      case 'attendance':
        return {
          title: 'Attendance Management',
          subtitle: 'Institutional daily student & teacher attendance records and history',
          icon: CalendarCheck,
          accent: 'teal',
          scope: [
            'Monitor live daily attendance across all 6 classes (96.4% today)',
            'Review teacher attendance and duty status',
            'Audit historical absence records and parent excuse notes',
            'Export official attendance rosters for administration records',
          ],
        };
      case 'reports':
        return {
          title: 'Reports & ID Cards',
          subtitle: 'Institutional data exports, student identification badges & attendance digests',
          icon: FileText,
          accent: 'indigo',
          scope: [
            'Generate printable student ID cards with QR/photo placeholders',
            'Export class-by-class attendance summaries',
            'Produce term-based institutional administrative reports',
            'Download formatted CSV/PDF digests for executive review',
          ],
        };
      case 'announcements':
        return {
          title: 'Internal Announcements',
          subtitle: 'Administrative circulars, staff notices & instruction guidelines',
          icon: Megaphone,
          accent: 'rose',
          scope: [
            'Draft and broadcast announcements to all 9 teachers',
            'Pin high-priority administrative guidelines',
            'Send notices regarding Ramadan or holiday schedules',
            'Archive past internal communications',
          ],
        };
      case 'public-site':
        return {
          title: 'Public Website Content',
          subtitle: 'Manage admissions notice, fee schedules, gallery & public details',
          icon: Globe,
          accent: 'sky',
          scope: [
            'Manage Al-Mustafeed public portal information',
            'Update admissions criteria, fee structure and intake dates',
            'Publish institution news, photo gallery & contact info',
            'Seamlessly synchronise public announcements',
          ],
        };
      case 'settings':
        return {
          title: 'Settings & System Maintenance',
          subtitle: 'Database backups, recovery procedures & institutional configurations',
          icon: Settings,
          accent: 'slate',
          scope: [
            'Trigger and review automated database backups & recovery',
            'Manage institution profile, contact info & branding metadata',
            'Configure academic term dates and operational hours',
            'Review system security audit logs with Technical Lead (Dev)',
          ],
        };
      default:
        return {
          title: 'Management Module',
          subtitle: 'Institutional module overview',
          icon: ShieldCheck,
          accent: 'emerald',
          scope: ['Administrative functions reserved for Al-Mustafeed administrators.'],
        };
    }
  };

  const details = getSectionDetails(tab);
  const Icon = details.icon;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Breadcrumb & Return Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToOverview}
          type="button"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:text-emerald-900 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard Overview</span>
        </button>

        <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
          Admin Portal • {details.title}
        </span>
      </div>

      {/* Module Title Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 pb-6 border-b border-slate-100">
          <div className="w-14 h-14 rounded-2xl bg-emerald-900 text-amber-300 flex items-center justify-center shrink-0 shadow-md">
            <Icon className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {details.title}
              </h2>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                Pending Next Phase
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              {details.subtitle}
            </p>
          </div>
        </div>

        {/* Development Rule Note */}
        <div className="mt-6 p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-950 flex items-start gap-3 leading-relaxed">
          <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-amber-900 text-sm">
              Page-by-Page Development Architecture
            </p>
            <p className="mt-1 text-amber-800">
              In accordance with the agreed development rules, this navigation button is fully active and wired to its route. The full interactive table, forms, and operations for <strong>{details.title}</strong> will be built in the dedicated phase when requested.
            </p>
          </div>
        </div>

        {/* Planned Scope Preview */}
        <div className="mt-6 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Approved Scope for this Module:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {details.scope.map((item, index) => (
              <div
                key={index}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-700 flex items-start gap-2.5"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-1.5 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick return button */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
          <button
            onClick={onBackToOverview}
            type="button"
            className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
          >
            Return to Admin Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
