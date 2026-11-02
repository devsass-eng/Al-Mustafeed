import { useState, useRef, useEffect, type FC } from 'react';
import {
  Menu,
  Bell,
  LogOut,
  User,
  Shield,
  ChevronDown,
} from 'lucide-react';
import { BrandLogo } from '../BrandLogo';
import { ADMIN_NOTIFICATIONS } from '../../data/adminDemoData';
import type { AdminNotification } from '../../types/admin';

interface AdminHeaderProps {
  onOpenMobileSidebar: () => void;
  onLogout: () => void;
  onNavigateTab?: (tab: string) => void;
}

export const AdminHeader: FC<AdminHeaderProps> = ({
  onOpenMobileSidebar,
  onLogout,
}) => {
  const [notifications, setNotifications] = useState<AdminNotification[]>(ADMIN_NOTIFICATIONS);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => n.isUnread).length;

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isUnread: false })));
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200/80 shadow-xs">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Mobile Menu Trigger & Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileSidebar}
            type="button"
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Logo on mobile / Tablet */}
          <div className="lg:hidden">
            <BrandLogo size="sm" variant="dark" showSubtitle={false} />
          </div>

          {/* Desktop Heading & Hijri date indicator */}
          <div className="hidden lg:flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="text-base font-extrabold text-slate-900 tracking-tight">
                Al-Mustafeed Tahfeez Administration
              </h1>
              <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                Main Centre
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              Academic Term 1 • Academic Year 1447–1448 AH / 2026
            </p>
          </div>
        </div>

        {/* Right: Actions, Notifications & Admin Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              type="button"
              className="relative p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-700"
              aria-label="View notifications"
              aria-expanded={isNotifOpen}
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown Panel */}
            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-50 animate-fadeIn">
                <div className="p-3.5 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">Notifications</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {unreadCount} new
                    </span>
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      type="button"
                      className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-900 cursor-pointer"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                  {notifications.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3.5 text-xs transition-colors hover:bg-slate-50 ${
                        item.isUnread ? 'bg-emerald-50/40' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          {item.isUnread && (
                            <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                          )}
                          <p className="font-bold text-slate-800">{item.title}</p>
                        </div>
                        <span className="text-[10px] text-slate-400 shrink-0 font-mono">
                          {item.timestamp}
                        </span>
                      </div>
                      <p className="text-slate-600 mt-1 leading-relaxed pl-3.5">
                        {item.message}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
                  <span className="text-[11px] text-slate-500 font-medium">
                    Tahfeez Administrative Alerts
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Admin Profile Account Menu */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              type="button"
              className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer border border-transparent hover:border-slate-200"
              aria-expanded={isProfileOpen}
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-800 text-amber-300 font-extrabold text-xs flex items-center justify-center shadow-xs">
                MF
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-slate-900 leading-tight">Ustadh M. Farooq</p>
                <p className="text-[10px] text-emerald-700 font-semibold leading-tight">Admin</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {/* Profile Dropdown Panel */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-50 animate-fadeIn">
                {/* User Info Header */}
                <div className="p-4 bg-emerald-950 text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-800 text-amber-300 font-bold text-sm flex items-center justify-center shadow-sm">
                      MF
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-white truncate">Ustadh Muhammad Farooq</p>
                      <p className="text-[10px] text-emerald-200/80 truncate">admin@al-mustafeed.edu</p>
                      <span className="inline-block mt-1 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                        Principal Administrator
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-2 space-y-1 text-xs text-slate-700">
                  <div className="px-3 py-2 rounded-lg bg-slate-50 flex items-center gap-2 text-slate-600">
                    <Shield className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Role: Full Admin Authority</span>
                  </div>

                  <div className="px-3 py-2 rounded-lg bg-slate-50 flex items-center gap-2 text-slate-600">
                    <User className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Access ID: #AM-ADM-01</span>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <button
                      onClick={onLogout}
                      type="button"
                      className="w-full flex items-center gap-2 px-3 py-2 text-red-700 hover:bg-red-50 rounded-lg transition-colors font-semibold cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out from Portal</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
