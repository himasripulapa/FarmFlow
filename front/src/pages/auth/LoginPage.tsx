import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Logo } from '../../components/branding/Logo';
import { useAuthStore } from '../../store/useAuthStore';
import {
  Mail,
  Lock,
  Globe,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { LanguagePickerModal } from '../../components/ui/LanguagePickerModal';

export const LoginPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const user = await login({ email, password });
      navigate(user.role === 'consumer' ? '/trace/search' : '/dashboard');
    } catch (err: any) {
      setErrorMessage(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12 space-y-8">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Logo size="lg" showText={true} />
        <button
          onClick={() => setIsLangOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 dark:bg-slate-800 border border-emerald-200 dark:border-slate-700 text-emerald-900 dark:text-emerald-200 text-xs font-bold"
        >
          <Globe className="w-4 h-4 text-emerald-600" />
          <span className="uppercase">{i18n.language}</span>
        </button>
      </div>

      {/* Main Login Card */}
      <div className="bg-white dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">
            Sign In to FarmFlow
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Enter your registered email and password to access your supply chain account.
          </p>
        </div>

        {errorMessage && (
          <div className="flex items-center gap-2 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-semibold">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Email Address
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="swathi@farmflow.in"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-slate-800"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Password
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-slate-800"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isSubmitting ? (
              <span>Signing In...</span>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="pt-2 text-center border-t border-slate-100 dark:border-slate-800">
          <Link to="/register" className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline">
            Don't have an account? Register new farm or business here
          </Link>
        </div>
      </div>

      <LanguagePickerModal
        isOpen={isLangOpen}
        onClose={() => setIsLangOpen(false)}
      />
    </div>
  );
};
