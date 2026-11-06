import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../store/useAuthStore';
import { useSettingsStore, FontSize } from '../../store/useSettingsStore';
import { LanguagePickerModal } from '../../components/ui/LanguagePickerModal';
import { User, Settings, Globe, Moon, Sun, Type, Eye, Bell } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { currentUser } = useAuthStore();
  const { theme, toggleTheme, fontSize, setFontSize, lowLiteracyMode, toggleLowLiteracyMode } = useSettingsStore();
  const [isLangOpen, setIsLangOpen] = useState(false);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">
          {t('nav.profile')} & Preferences
        </h1>
        <p className="text-xs text-slate-500">
          Manage account information, multi-language preferences, and accessibility settings.
        </p>
      </div>

      {/* User Info Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs flex items-center gap-4">
        <img
          src={currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80'}
          alt={currentUser?.name}
          className="w-16 h-16 rounded-full object-cover border-2 border-emerald-500"
        />
        <div>
          <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">{currentUser?.name}</h3>
          <p className="text-xs text-slate-500 font-medium">Role: <span className="font-bold text-emerald-700 capitalize">{currentUser?.role}</span></p>
          <p className="text-xs text-slate-400 mt-0.5">{currentUser?.village}, {currentUser?.district}, {currentUser?.state}</p>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-6">
        
        {/* Language Selection */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 rounded-2xl">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Application Language</h4>
              <p className="text-xs text-slate-500">Select between English, Telugu, Hindi, Tamil, Malayalam</p>
            </div>
          </div>
          <button
            onClick={() => setIsLangOpen(true)}
            className="px-4 py-2 bg-emerald-700 text-white font-bold text-xs rounded-xl uppercase"
          >
            {i18n.language} (Change)
          </button>
        </div>

        {/* Theme Toggle */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-100 dark:bg-amber-950 text-amber-700 rounded-2xl">
              {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Theme Mode</h4>
              <p className="text-xs text-slate-500">Switch between Light and Dark interface modes</p>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl"
          >
            {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
          </button>
        </div>

        {/* Font Size Adjustment */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-100 dark:bg-blue-950 text-blue-700 rounded-2xl">
              <Type className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Interface Font Size</h4>
              <p className="text-xs text-slate-500">Adjust text size for easier reading</p>
            </div>
          </div>
          <div className="flex gap-1">
            {(['normal', 'large', 'huge'] as FontSize[]).map((sz) => (
              <button
                key={sz}
                onClick={() => setFontSize(sz)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize ${
                  fontSize === sz ? 'bg-emerald-700 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>

        {/* Low Literacy Mode */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-100 dark:bg-purple-950 text-purple-700 rounded-2xl">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Low-Literacy Mode</h4>
              <p className="text-xs text-slate-500">Icon-first simplified view with larger action buttons</p>
            </div>
          </div>
          <button
            onClick={toggleLowLiteracyMode}
            className={`px-4 py-2 font-bold text-xs rounded-xl ${
              lowLiteracyMode ? 'bg-amber-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700'
            }`}
          >
            {lowLiteracyMode ? 'Enabled' : 'Disabled'}
          </button>
        </div>

      </div>

      <LanguagePickerModal
        isOpen={isLangOpen}
        onClose={() => setIsLangOpen(false)}
      />
    </div>
  );
};
