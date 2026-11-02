import type { FC } from 'react';
import type { AdminTab } from '../../types/admin';
import { BrandLogo } from '../BrandLogo';
import {
  LayoutDashboard,
  UserCheck,
  GraduationCap,
  Layers,
  CalendarCheck,
  FileText,
  Megaphone,
  Globe,
  Settings,
  LogOut,
  X,
  ShieldCheck,
} from 'lucide-react';

interface AdminSidebarProps {
  currentTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onLogout: () => void;
}

export const AdminSidebar: FC<AdminSidebarProps> = ({
  currentTab,
  onSelectTab,
  isOpenMobile,
  onCloseMobile,
  onLogout,
}) => {
  const navItems = [
    { id: 'overview' as AdminTab, label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'teachers' as AdminTab, label: 'Teachers', icon: UserCheck, badge: '9' },
    { id: 'students' as AdminTab, label: 'Students', icon: GraduationCap, badge: '330' },
    { id: 'classes' as AdminTab, label: 'Classes', icon: Layers, badge: '6' },
    { id: 'attendance' as AdminTab, label: 'Attendance', icon: CalendarCheck, badge: '96.4%' },
    { id: 'reports' as AdminTab, label: 'Reports', icon: FileText },
    { id: 'announcements' as AdminTab, label: 'Announcements', icon: Megaphone },
    { id: 'public-site' as AdminTab, label: 'Public Site', icon: Globe },
    { id: 'settings' as AdminTab, label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (tab: AdminTab) => {
    onSelectTab(tab);
    onCloseMobile();
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-emerald-950 text-white select-none">
      {/* Top Brand Header */}
      <div className="p-5 border-b border-emerald-900/80 flex items-center justify-between">
        <BrandLogo size="sm" variant="light" showSubtitle={true} />
        {/* Mobile close button */}
        <button
          onClick={onCloseMobile}
          type="button"
          className="lg:hidden p-1.5 text-emerald-300 hover:text-white rounded-lg hover:bg-emerald-900/60 transition-colors"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Role Badge */}
      <div className="px-5 py-3 bg-emerald-900/40 border-b border-emerald-900/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="text-xs font-semibold text-emerald-100 tracking-wide">
            Administration Portal
          </span>
        </div>
        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
          Admin
        </span>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1.5">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-emerald-400/70">
          Main Navigation
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              type="button"
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                isActive
                  ? 'bg-emerald-800 text-white shadow-sm shadow-emerald-950/40 font-semibold border-l-4 border-amber-400 pl-3'
                  : 'text-emerald-100/80 hover:bg-emerald-900/60 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-300' : 'text-emerald-300/80'}`} />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-amber-400 text-emerald-950 font-bold'
                      : 'bg-emerald-900 text-emerald-200 border border-emerald-800'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* User / Sign Out Footer */}
      <div className="p-4 border-t border-emerald-900/80 bg-emerald-950/90">
        <div className="flex items-center gap-3 p-2 rounded-xl bg-emerald-900/40 border border-emerald-800/60 mb-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-800 text-amber-300 font-bold text-xs flex items-center justify-center shrink-0">
            MF
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-white truncate">Ustadh Farooq</p>
            <p className="text-[10px] text-emerald-300/70 truncate">admin@al-mustafeed.edu</p>
          </div>
        </div>

        <button
          onClick={onLogout}
          type="button"
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-emerald-200 hover:text-white bg-emerald-900/60 hover:bg-red-950/60 border border-emerald-800/70 hover:border-red-800/70 rounded-xl transition-all cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-emerald-900/50 min-h-screen">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop & Slide-out */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
            aria-hidden="true"
          />
          {/* Drawer container */}
          <div className="relative w-72 max-w-[85vw] h-full shadow-2xl z-10 animate-slideRight">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

