import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../../components/branding/Logo';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-md mx-auto py-24 px-4 text-center space-y-6">
      <Logo size="xl" showText={true} />
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-slate-900 dark:text-slate-100">404</h1>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Page Not Found</h2>
        <p className="text-xs text-slate-500">
          The page or batch route you are looking for does not exist or has moved.
        </p>
      </div>

      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl font-bold text-xs shadow-md transition-colors"
      >
        <Home className="w-4 h-4" />
        <span>Return to FarmFlow Home</span>
      </Link>
    </div>
  );
};
