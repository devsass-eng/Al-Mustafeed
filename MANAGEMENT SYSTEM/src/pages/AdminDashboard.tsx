import { useState, type FC } from 'react';
import type { AdminTab } from '../types/admin';
import { ADMIN_METRICS, RECENT_ACTIVITIES } from '../data/adminDemoData';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminHeader } from '../components/admin/AdminHeader';
import { OverviewCards } from '../components/admin/OverviewCards';
import { QuickNavGrid } from '../components/admin/QuickNavGrid';
import { RecentActivities } from '../components/admin/RecentActivities';
import { SectionPlaceholder } from '../components/admin/SectionPlaceholder';
import { TeachersPage } from './TeachersPage';
import { StudentsPage } from './StudentsPage';
import { Sparkles, Calendar, ShieldCheck } from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
}

export const AdminDashboard: FC<AdminDashboardProps> = ({ onLogout }) => {
  const [currentTab, setCurrentTab] = useState<AdminTab>('overview');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased text-slate-800">
      
      {/* Top Main App Wrapper with Sidebar + Content */}
      <div className="flex-1 flex w-full">
        {/* Sidebar (Desktop Persistent + Mobile Drawer) */}
        <AdminSidebar
          currentTab={currentTab}
          onSelectTab={(tab) => setCurrentTab(tab)}
          isOpenMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
          onLogout={onLogout}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-slate-50">
          
          {/* Top Sticky Header */}
          <AdminHeader
            onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
            onLogout={onLogout}
            onNavigateTab={(tab) => setCurrentTab(tab as AdminTab)}
          />

          {/* Main Body */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {currentTab === 'overview' ? (
              <div className="space-y-6 sm:space-y-8 animate-fadeIn">
                
                {/* Welcome Banner Card (Islamic styling, consistent with Login Page) */}
                <div className="relative rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 text-white p-6 sm:p-8 shadow-md overflow-hidden">
                  {/* Subtle Geometric Overlay */}
                  <div className="absolute inset-0 bg-islamic-pattern opacity-30 pointer-events-none" />
                  
                  {/* Ambient Glows */}
                  <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-emerald-600/20 blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />

                  <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="space-y-1.5 max-w-2xl">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-700/60 text-xs font-semibold text-amber-300">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>Tahfeez Administration Centre</span>
                      </div>

                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white">
                        Assalamu Alaikum, Ustadh Muhammad Farooq
                      </h2>

                      <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-light">
                        Welcome to the Al-Mustafeed administration portal. Monitor student attendance, oversee faculty, organise classes, and manage institutional records.
                      </p>
                    </div>

                    {/* Islamic Date & Session Status */}
                    <div className="shrink-0 bg-emerald-900/60 border border-emerald-700/50 p-3.5 rounded-2xl flex flex-col sm:items-end text-left sm:text-right">
                      <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Academic Year 1447–1448 AH</span>
                      </div>
                      <p className="text-[11px] text-emerald-200/80 mt-1">
                        Term 1 • Active Session
                      </p>
                      <div className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-700/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>All Systems Operational</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Summary Overview Cards (Total Students: 330, Total Teachers: 9, Total Classes: 6, Attendance: 96.4%) */}
                <section aria-labelledby="overview-metrics-title">
                  <h2 id="overview-metrics-title" className="sr-only">
                    Institutional Key Metrics
                  </h2>
                  <OverviewCards
                    metrics={ADMIN_METRICS}
                    onNavigateTab={(tab) => setCurrentTab(tab)}
                  />
                </section>

                {/* 2. Main Dashboard Navigation Buttons (8 Core Controls) */}
                <section aria-labelledby="quick-nav-title">
                  <QuickNavGrid onSelectTab={(tab) => setCurrentTab(tab)} />
                </section>

                {/* Recent Activities Section */}
                <section aria-labelledby="recent-activities-title">
                  <RecentActivities activities={RECENT_ACTIVITIES} />
                </section>

              </div>
            ) : currentTab === 'teachers' ? (
              <TeachersPage onBackToDashboard={() => setCurrentTab('overview')} />
            ) : currentTab === 'students' ? (
              <StudentsPage onBackToDashboard={() => setCurrentTab('overview')} />
            ) : (
              /* Specific Feature Placeholder Page */
              <SectionPlaceholder
                tab={currentTab}
                onBackToOverview={() => setCurrentTab('overview')}
              />
            )}
          </main>

          {/* Dashboard Footer */}
          <footer className="mt-auto py-4 px-4 sm:px-6 lg:px-8 border-t border-slate-200/70 bg-white text-xs text-slate-500">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
              <p>© 2026 Al-Mustafeed Tahfeez Institution. All rights reserved.</p>
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Admin Level Authority • Tahfeez Management Portal</span>
              </div>
            </div>
          </footer>

        </div>
      </div>
    </div>
  );
};

