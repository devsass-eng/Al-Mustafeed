import type { FC } from 'react';
import type { DemoUser } from '../types/auth';
import { CheckCircle2, ShieldCheck, ArrowLeft, Sparkles } from 'lucide-react';

interface AuthSuccessModalProps {
  user: DemoUser;
  onLogout: () => void;
}

export const AuthSuccessModal: FC<AuthSuccessModalProps> = ({
  user,
  onLogout,
}) => {
  const roleBadgeStyles: Record<string, string> = {
    dev: 'bg-purple-100 text-purple-800 border-purple-200',
    admin: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    teacher: 'bg-amber-100 text-amber-800 border-amber-200',
  };

  const roleAccentBg: Record<string, string> = {
    dev: 'from-purple-900 to-slate-900',
    admin: 'from-emerald-950 to-teal-900',
    teacher: 'from-emerald-900 to-amber-950',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        {/* Banner */}
        <div className={`p-6 bg-gradient-to-br ${roleAccentBg[user.role]} text-white text-center relative`}>
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 mb-3 shadow-inner">
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">Authentication Successful</h2>
          <p className="text-xs text-emerald-200/90 mt-1">
            Role correctly resolved by Al-Mustafeed authentication handler
          </p>
        </div>

        {/* User Card */}
        <div className="p-6">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="w-12 h-12 rounded-2xl bg-emerald-800 text-white font-bold text-lg flex items-center justify-center shrink-0 shadow-md">
              {user.avatarInitials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className={`text-[11px] font-semibold uppercase px-2 py-0.5 rounded-full border ${roleBadgeStyles[user.role]}`}>
                  {user.role.toUpperCase()}
                </span>
                <span className="text-xs text-slate-500 truncate">{user.username}</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 truncate mt-0.5">{user.name}</h3>
              <p className="text-xs text-slate-500 truncate">{user.email}</p>
            </div>
          </div>

          {/* Role Responsibilities Preview */}
          <div className="mt-5 space-y-2">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Role Scope & System Privileges:
            </h4>
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 space-y-2 text-xs text-slate-600">
              {user.responsibilities.map((resp, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <span>{resp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Development Milestone Notice */}
          <div className="mt-5 p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-950">Phase 1: Login Verification Ready</p>
              <p className="mt-0.5 text-amber-800 leading-relaxed">
                As per the strict page-by-page development rules, the {user.roleTitle} dashboard will be built in the next task upon your review and approval.
              </p>
            </div>
          </div>

          {/* Action button to test another login */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={onLogout}
              type="button"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-all shadow-xs cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Test Another Login Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
