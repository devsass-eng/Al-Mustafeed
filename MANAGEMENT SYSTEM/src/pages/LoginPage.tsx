import { useState, useEffect, type FC, type FormEvent } from 'react';
import {
  User,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  AlertCircle,
  Loader2,
  BookOpen,
  Users,
  ShieldCheck,
  HelpCircle,
} from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';
import { ForgotPasswordModal } from '../components/ForgotPasswordModal';
import { AuthSuccessModal } from '../components/AuthSuccessModal';
import { DEMO_USERS, DEMO_CREDENTIALS_HINT } from '../data/demoAccounts';
import type { LoginFormState, LoginFormErrors, DemoUser } from '../types/auth';

const STORAGE_REMEMBER_KEY = 'almustafeed_remembered_identifier';

interface LoginPageProps {
  onLoginSuccess?: (user: DemoUser) => void;
}

export const LoginPage: FC<LoginPageProps> = ({ onLoginSuccess }) => {
  // Form State
  const [formData, setFormData] = useState<LoginFormState>({
    identifier: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState<DemoUser | null>(null);

  // Load remembered username/email if available
  useEffect(() => {
    try {
      const savedIdentifier = localStorage.getItem(STORAGE_REMEMBER_KEY);
      if (savedIdentifier) {
        setFormData((prev) => ({
          ...prev,
          identifier: savedIdentifier,
          rememberMe: true,
        }));
      }
    } catch {
      // LocalStorage access failsafe
    }
  }, []);

  // Validation
  const validateForm = (): boolean => {
    const newErrors: LoginFormErrors = {};

    if (!formData.identifier.trim()) {
      newErrors.identifier = 'Please enter your username or email address.';
    } else if (
      formData.identifier.includes('@') &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.identifier.trim())
    ) {
      newErrors.identifier = 'Please enter a valid email address.';
    }

    if (!formData.password) {
      newErrors.password = 'Please enter your password.';
    } else if (formData.password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handler with demo authentication
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate realistic network authentication latency (700ms)
    setTimeout(() => {
      const cleanIdentifier = formData.identifier.trim().toLowerCase();
      const enteredPassword = formData.password;

      // Find matching demo account
      const matchedUser = DEMO_USERS.find(
        (u) =>
          u.username.toLowerCase() === cleanIdentifier ||
          u.email.toLowerCase() === cleanIdentifier
      );

      if (!matchedUser) {
        setIsLoading(false);
        setErrors({
          general: 'Invalid username or email. Please check your credentials or use a demo account below.',
        });
        return;
      }

      // Check password
      const isPasswordValid = matchedUser.passwords.includes(enteredPassword);

      if (!isPasswordValid) {
        setIsLoading(false);
        setErrors({
          general: 'Incorrect password. Demonstration accounts use "admin123" (or "teacher123").',
        });
        return;
      }

      // Handle "Remember Me"
      try {
        if (formData.rememberMe) {
          localStorage.setItem(STORAGE_REMEMBER_KEY, formData.identifier.trim());
        } else {
          localStorage.removeItem(STORAGE_REMEMBER_KEY);
        }
      } catch {
        // Safe fail
      }

      // Successful Demo Authentication
      setIsLoading(false);
      setAuthenticatedUser(matchedUser);
    }, 700);
  };

  // Quick helper to fill demo credentials
  const handleSelectDemoAccount = (username: string, pass: string) => {
    setFormData((prev) => ({
      ...prev,
      identifier: username,
      password: pass,
    }));
    setErrors({});
  };

  return (
    <main className="min-h-screen w-full flex flex-col justify-between bg-slate-100 text-slate-800 antialiased selection:bg-emerald-700 selection:text-white">
      {/* Top Banner on Mobile / Small screens */}
      <header className="lg:hidden bg-emerald-950 text-white px-4 py-3.5 border-b border-emerald-800/80 shadow-sm flex items-center justify-between">
        <BrandLogo size="sm" variant="light" showSubtitle={false} />
        <span className="text-[11px] font-medium tracking-wide px-2.5 py-1 rounded-full bg-emerald-900 border border-emerald-700/60 text-emerald-200">
          Management Portal
        </span>
      </header>

      {/* Main Split Layout Container */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl border border-slate-200/90 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
          
          {/* LEFT PANEL: Institutional Branding & Visual Identity (Desktop) */}
          <div className="hidden lg:flex lg:col-span-5 relative bg-emerald-950 text-white p-10 flex-col justify-between overflow-hidden">
            {/* Islamic Geometric Background Pattern */}
            <div className="absolute inset-0 bg-islamic-pattern opacity-40 pointer-events-none" />

            {/* Glowing ambient decorative accents */}
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-emerald-600/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />

            {/* Content Top */}
            <div className="relative z-10">
              <BrandLogo size="md" variant="light" />

              <div className="mt-12 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-700/50 text-xs font-medium text-amber-300">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  Official Administrative Gateway
                </div>

                <h1 className="text-3xl font-extrabold tracking-tight text-white leading-tight">
                  Tahfeez Programme Management
                </h1>

                <p className="text-sm text-emerald-100/80 leading-relaxed font-light">
                  A dedicated, secure digital environment empowering leadership, teachers, and technical staff to preserve excellence in Qur'anic education.
                </p>
              </div>

              {/* Institution Key Pillars */}
              <div className="mt-8 space-y-3.5">
                <div className="flex items-center gap-3 text-xs text-emerald-100/90 bg-emerald-900/40 p-2.5 rounded-xl border border-emerald-800/60">
                  <div className="w-7 h-7 rounded-lg bg-emerald-800/80 flex items-center justify-center text-amber-300 shrink-0">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block">Qur'anic Preservation</span>
                    <span>Structured Tahfeez tracking & institutional records</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-emerald-100/90 bg-emerald-900/40 p-2.5 rounded-xl border border-emerald-800/60">
                  <div className="w-7 h-7 rounded-lg bg-emerald-800/80 flex items-center justify-center text-amber-300 shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block">Staff & Student Synergy</span>
                    <span>Centralized attendance, classes, and reporting</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-emerald-100/90 bg-emerald-900/40 p-2.5 rounded-xl border border-emerald-800/60">
                  <div className="w-7 h-7 rounded-lg bg-emerald-800/80 flex items-center justify-center text-amber-300 shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block">Role-Based Security</span>
                    <span>Dedicated Dev, Admin, and Teacher access boundaries</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Arabic Scripture / Verse Note at bottom */}
            <div className="relative z-10 pt-6 border-t border-emerald-900/80">
              <p className="font-arabic text-lg text-amber-200/90 text-right dir-rtl leading-relaxed">
                "وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ فَهَلْ مِن مُّدَّكِرٍ"
              </p>
              <p className="text-[11px] text-emerald-300/70 mt-1">
                Surah Al-Qamar • Al-Mustafeed Education Trust
              </p>
            </div>
          </div>

          {/* RIGHT PANEL: Login Form Card */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between bg-white">
            <div>
              {/* Desktop Logo Header (clean) */}
              <div className="hidden lg:flex justify-between items-center pb-6 border-b border-slate-100">
                <span className="text-xs font-semibold tracking-wider uppercase text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                  Authorized Personnel Only
                </span>
                <span className="text-xs text-slate-400 font-mono">v1.0.0 • PWA Ready</span>
              </div>

              {/* Form Heading & Subtitle */}
              <div className="mt-4 sm:mt-6">
                <div className="lg:hidden mb-4">
                  <BrandLogo size="md" variant="dark" />
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Welcome Back
                </h2>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Sign in with your verified credentials to access the{' '}
                  <span className="font-medium text-emerald-900">
                    Al-Mustafeed Tahfeez Management System
                  </span>.
                </p>
              </div>

              {/* General Form Error Alert */}
              {errors.general && (
                <div
                  className="mt-5 p-3.5 rounded-xl bg-red-50 border border-red-200/80 text-red-800 text-xs flex items-start gap-2.5 animate-shake"
                  role="alert"
                >
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold">Sign in failed</p>
                    <p className="mt-0.5 text-red-700">{errors.general}</p>
                  </div>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
                {/* Username or Email Field */}
                <div>
                  <label
                    htmlFor="identifier"
                    className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                  >
                    Username or Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      id="identifier"
                      name="identifier"
                      type="text"
                      autoComplete="username"
                      value={formData.identifier}
                      onChange={(e) => {
                        setFormData({ ...formData, identifier: e.target.value });
                        if (errors.identifier || errors.general) {
                          setErrors((prev) => ({ ...prev, identifier: undefined, general: undefined }));
                        }
                      }}
                      placeholder="e.g. admin or admin@al-mustafeed.edu"
                      className={`w-full pl-10 pr-4 py-2.5 sm:py-3 bg-slate-50/70 border rounded-xl text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:bg-white focus:outline-none focus:ring-2 ${
                        errors.identifier
                          ? 'border-red-400 focus:ring-red-200 focus:border-red-500 bg-red-50/30'
                          : 'border-slate-300 focus:ring-emerald-200 focus:border-emerald-700'
                      }`}
                      aria-invalid={errors.identifier ? 'true' : 'false'}
                      aria-describedby={errors.identifier ? 'identifier-error' : undefined}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.identifier && (
                    <p id="identifier-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.identifier}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="password"
                      className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsForgotModalOpen(true)}
                      className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-700 rounded-sm cursor-pointer"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      value={formData.password}
                      onChange={(e) => {
                        setFormData({ ...formData, password: e.target.value });
                        if (errors.password || errors.general) {
                          setErrors((prev) => ({ ...prev, password: undefined, general: undefined }));
                        }
                      }}
                      placeholder="Enter your password"
                      className={`w-full pl-10 pr-11 py-2.5 sm:py-3 bg-slate-50/70 border rounded-xl text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:bg-white focus:outline-none focus:ring-2 ${
                        errors.password
                          ? 'border-red-400 focus:ring-red-200 focus:border-red-500 bg-red-50/30'
                          : 'border-slate-300 focus:ring-emerald-200 focus:border-emerald-700'
                      }`}
                      aria-invalid={errors.password ? 'true' : 'false'}
                      aria-describedby={errors.password ? 'password-error' : undefined}
                      disabled={isLoading}
                    />
                    {/* Show / Hide Toggle Button */}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors focus:outline-none cursor-pointer"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 text-slate-600" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p id="password-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Remember Me Checkbox */}
                <div className="pt-1 flex items-center justify-between">
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                      className="w-4 h-4 text-emerald-800 bg-slate-50 border-slate-300 rounded focus:ring-emerald-700 focus:ring-2 cursor-pointer accent-emerald-800"
                    />
                    <span className="text-xs sm:text-sm text-slate-600 font-medium">
                      Remember my login on this device
                    </span>
                  </label>
                </div>

                {/* Submit Login Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full relative py-3 sm:py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                        <span>Verifying credentials...</span>
                      </>
                    ) : (
                      <>
                        <LogIn className="w-4 h-4 text-amber-300" />
                        <span>Sign In to System</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* DEMONSTRATION ACCOUNTS QUICK-PICK (As per Development Rules) */}
              <div className="mt-6 pt-5 border-t border-slate-100">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                    <HelpCircle className="w-3 h-3 text-amber-600" />
                    Quick Demonstration Logins:
                  </span>
                  <span className="text-[10px] text-slate-400">Click any role to test</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {DEMO_CREDENTIALS_HINT.map((demo) => (
                    <button
                      key={demo.role}
                      type="button"
                      onClick={() => handleSelectDemoAccount(demo.username, demo.pass)}
                      className={`text-left p-2 rounded-xl border transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${demo.badgeColor}`}
                    >
                      <div className="font-bold text-xs">{demo.role}</div>
                      <div className="text-[10px] opacity-80 font-mono truncate">{demo.username}</div>
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-[10px] text-slate-400 text-center">
                  Password for all demo accounts:{' '}
                  <span className="font-mono font-semibold text-slate-600">admin123</span> (or <span className="font-mono font-semibold text-slate-600">teacher123</span>)
                </p>
              </div>
            </div>

            {/* Footer with copyright and security notice */}
            <div className="mt-8 pt-4 border-t border-slate-100 text-center sm:flex sm:justify-between sm:items-center text-xs text-slate-500">
              <p>© 2026 Al-Mustafeed. All rights reserved.</p>
              <div className="mt-1 sm:mt-0 flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Online Portal • SSL Encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-only bottom copyright bar */}
      <footer className="lg:hidden py-3 text-center text-[11px] text-slate-400 border-t border-slate-200/60 bg-white">
        Al-Mustafeed Tahfeez Institution • Private System
      </footer>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
      />

      {/* Authentication Success Review Screen */}
      {authenticatedUser && (
        <AuthSuccessModal
          user={authenticatedUser}
          onLogout={() => {
            setAuthenticatedUser(null);
            setFormData((prev) => ({ ...prev, password: '' }));
          }}
          onProceedToDashboard={() => {
            if (authenticatedUser.role === 'admin' && onLoginSuccess) {
              onLoginSuccess(authenticatedUser);
            }
          }}
        />
      )}
    </main>
  );
};
