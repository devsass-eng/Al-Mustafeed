import { useState, type FC } from 'react';
import { ShieldAlert, Mail, Copy, Check, X } from 'lucide-react';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ForgotPasswordModal: FC<ForgotPasswordModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const supportEmail = 'admin@al-mustafeed.edu';

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(supportEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="forgot-password-title"
    >
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all">
        {/* Header with emerald accent bar */}
        <div className="h-2 bg-gradient-to-r from-emerald-800 via-emerald-600 to-amber-500" />
        
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/70 flex items-center justify-center text-amber-700">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 id="forgot-password-title" className="text-lg font-bold text-slate-900">
                  Password Recovery
                </h3>
                <p className="text-xs text-slate-500">Al-Mustafeed Security Policy</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 rounded-lg p-1 transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-4 text-sm text-slate-600 space-y-3 leading-relaxed">
            <p>
              To ensure the security and privacy of our students, staff, and memorisation records, 
              account credentials cannot be reset automatically without administrator verification.
            </p>
            <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2">
              <p className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                How to reset your access:
              </p>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                <li>
                  <span className="font-medium text-slate-800">Teachers:</span> Contact your Administrator (Ustadh Farooq) to reset your PIN or password.
                </li>
                <li>
                  <span className="font-medium text-slate-800">Administrators:</span> Contact the Technical Lead (Dev) for credentials re-issuance.
                </li>
                <li>
                  <span className="font-medium text-slate-800">Emergency Desk:</span> Visit the administrative office in person during operating hours.
                </li>
              </ul>
            </div>
          </div>

          {/* Contact pill & copy button */}
          <div className="mt-5 p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-xs text-emerald-900">
              <Mail className="w-4 h-4 text-emerald-700 shrink-0" />
              <span className="font-mono font-medium">{supportEmail}</span>
            </div>
            <button
              onClick={handleCopyEmail}
              type="button"
              className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 hover:text-emerald-900 bg-white px-2.5 py-1 rounded-lg border border-emerald-200 shadow-xs transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              type="button"
              className="w-full sm:w-auto px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-semibold rounded-xl shadow-sm transition-all focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2 cursor-pointer"
            >
              I Understand
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
