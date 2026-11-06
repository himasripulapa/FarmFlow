import React from 'react';
import { useTranslation } from 'react-i18next';
import { Logo } from '../branding/Logo';
import { useSettingsStore } from '../../store/useSettingsStore';
import { applyLanguageFont } from '../../locales/i18n';
import { Check } from 'lucide-react';

interface LanguagePickerModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  isFirstTime?: boolean;
}

const LANGUAGES = [
  { code: 'en', native: 'English', label: 'English', script: 'Inter', flag: '🇬🇧' },
  { code: 'te', native: 'తెలుగు', label: 'Telugu', script: 'Noto Sans Telugu', flag: '🇮🇳' },
  { code: 'hi', native: 'हिन्दी', label: 'Hindi', script: 'Noto Sans Devanagari', flag: '🇮🇳' },
  { code: 'ta', native: 'தமிழ்', label: 'Tamil', script: 'Noto Sans Tamil', flag: '🇮🇳' },
  { code: 'ml', native: 'മലയാളം', label: 'Malayalam', script: 'Noto Sans Malayalam', flag: '🇮🇳' },
];

export const LanguagePickerModal: React.FC<LanguagePickerModalProps> = ({
  isOpen = true,
  onClose,
  isFirstTime = false,
}) => {
  const { i18n } = useTranslation();
  const { setHasPickedInitialLanguage } = useSettingsStore();

  const handleSelectLanguage = (code: string) => {
    i18n.changeLanguage(code);
    applyLanguageFont(code);
    setHasPickedInitialLanguage(true);
    if (onClose) onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#FAFAF5] dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 text-center">
        {/* FarmFlow Branding */}
        <div className="flex flex-col items-center gap-3">
          <Logo size="xl" showText={true} />
          <p className="text-sm sm:text-base text-emerald-800 font-semibold dark:text-emerald-300">
            From Farm to Fork, Tracked.
          </p>
        </div>

        <div className="space-y-2 border-t border-b border-emerald-100 dark:border-slate-800 py-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100">
            Select Your Language
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            మీ భాషను ఎంచుకోండి / अपनी भाषा चुनें / உங்கள் மொழியைத் தேர்ந்தெடுக்கவும் / ഭാഷ തിരഞ്ഞെടുക്കുക
          </p>
        </div>

        {/* Big Native-Script Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {LANGUAGES.map((lang) => {
            const isSelected = i18n.language === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => handleSelectLanguage(lang.code)}
                style={{ fontFamily: lang.script }}
                className={`relative group flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-200 text-left min-h-[64px] ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100 shadow-md ring-2 ring-emerald-500/20'
                    : 'border-slate-200 bg-white hover:border-emerald-400 hover:bg-emerald-50/50 text-slate-800 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100'
                }`}
              >
                <div className="flex flex-col">
                  <span className="text-lg font-bold tracking-tight">
                    {lang.native}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-sans">
                    {lang.label}
                  </span>
                </div>

                {isSelected && (
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Check className="w-4 h-4" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {!isFirstTime && onClose && (
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-sm transition-colors dark:bg-slate-800 dark:text-slate-200"
          >
            Close / Done
          </button>
        )}
      </div>
    </div>
  );
};
