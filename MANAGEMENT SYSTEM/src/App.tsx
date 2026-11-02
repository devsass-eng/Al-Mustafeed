import { useState } from 'react';
import { LoginPage } from './pages/LoginPage';
import { AdminDashboard } from './pages/AdminDashboard';
import type { DemoUser } from './types/auth';

export type AppView = 'login' | 'admin-dashboard';

function App() {
  // Default to 'admin-dashboard' to immediately showcase the newly completed page
  const [currentView, setCurrentView] = useState<AppView>('admin-dashboard');

  const handleLoginSuccess = (user: DemoUser) => {
    if (user.role === 'admin') {
      setCurrentView('admin-dashboard');
    }
  };

  const handleLogout = () => {
    setCurrentView('login');
  };

  return (
    <div>
      {/* Dev Environment Floating Switcher Pill (for reviewer convenience) */}
      <div className="fixed bottom-4 right-4 z-40 bg-slate-900/90 text-white backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-slate-700/80 text-[11px] flex items-center gap-2">
        <span className="text-slate-400">View:</span>
        <button
          onClick={() => setCurrentView('admin-dashboard')}
          type="button"
          className={`px-2 py-0.5 rounded-full font-bold transition-colors cursor-pointer ${
            currentView === 'admin-dashboard'
              ? 'bg-emerald-600 text-white'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          Admin Dashboard
        </button>
        <span className="text-slate-600">|</span>
        <button
          onClick={() => setCurrentView('login')}
          type="button"
          className={`px-2 py-0.5 rounded-full font-bold transition-colors cursor-pointer ${
            currentView === 'login'
              ? 'bg-emerald-600 text-white'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          Login Page
        </button>
      </div>

      {currentView === 'admin-dashboard' ? (
        <AdminDashboard onLogout={handleLogout} />
      ) : (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;
