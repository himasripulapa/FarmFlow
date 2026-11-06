import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Logo } from '../branding/Logo';
import { useAuthStore } from '../../store/useAuthStore';
import { useNotificationStore } from '../../store/useNotificationStore';
import { useSettingsStore } from '../../store/useSettingsStore';
import { useOfflineStore } from '../../store/useOfflineStore';
import { LanguagePickerModal } from '../ui/LanguagePickerModal';
import { QRScannerModal } from '../ui/QRScannerModal';
import {
  Globe,
  Bell,
  Search,
  QrCode,
  User as UserIcon,
  Eye,
  WifiOff,
  Sun,
  Moon,
  ChevronDown,
  Sparkles,
  LogOut
} from 'lucide-react';
import { UserRole } from '../../types';

export const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuthStore();
  const { unreadCount, notifications, markAllAsRead } = useNotificationStore();
  const { theme, toggleTheme, lowLiteracyMode, toggleLowLiteracyMode } = useSettingsStore();
  const { isOffline, toggleOffline } = useOfflineStore();

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isQRScanOpen, setIsQRScanOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FAFAF5]/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-emerald-100 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Logo size="md" />
          </Link>

          {/* Search bar & Quick QR trigger (Desktop) */}
          <div className="hidden md:flex items-center gap-3 flex-1 max-w-md mx-4">
            <div
              onClick={() => navigate('/search')}
              className="w-full flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-emerald-200 dark:border-slate-700 rounded-2xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer shadow-xs hover:border-emerald-400 transition-colors text-sm"
            >
              <Search className="w-4 h-4 text-emerald-600" />
              <span>{t('trace.searchPlaceholder')}</span>
            </div>

            <button
              onClick={() => setIsQRScanOpen(true)}
              className="p-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl shrink-0 transition-colors shadow-sm flex items-center gap-1.5 text-xs font-semibold"
              title="Scan QR Code"
            >
              <QrCode className="w-4 h-4" />
              <span className="hidden lg:inline">Scan QR</span>
            </button>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2">

            {/* Quick QR button for mobile */}
            <button
              onClick={() => setIsQRScanOpen(true)}
              className="md:hidden p-2 text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950 rounded-xl"
              title="Scan QR"
            >
              <QrCode className="w-5 h-5" />
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setIsLangOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-slate-800 border border-emerald-200 dark:border-slate-700 text-emerald-900 dark:text-emerald-200 hover:bg-emerald-100 transition-colors text-xs font-bold"
            >
              <Globe className="w-4 h-4 text-emerald-600" />
              <span className="uppercase">{i18n.language}</span>
            </button>

            {/* Low Literacy Mode Toggle */}
            <button
              onClick={toggleLowLiteracyMode}
              title={t('common.lowLiteracyMode')}
              className={`p-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1 ${
                lowLiteracyMode
                  ? 'bg-amber-500 text-white font-bold ring-2 ring-amber-300'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span className="hidden xl:inline">Easy Mode</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors"
              title={t('common.darkMode')}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Offline simulator toggle */}
            <button
              onClick={toggleOffline}
              className={`p-2 rounded-xl transition-colors ${
                isOffline ? 'bg-amber-600 text-white animate-pulse' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600'
              }`}
              title="Simulate Offline Mode"
            >
              <WifiOff className="w-4 h-4" />
            </button>

            {/* Notifications Drawer Toggle */}
            <div className="relative">
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors relative"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-extrabold flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-1.5">
                      <Bell className="w-4 h-4 text-emerald-600" />
                      Notifications
                    </h4>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-xs text-emerald-600 hover:underline font-semibold"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-72 overflow-y-auto py-1">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          if (n.link) navigate(n.link);
                          setIsNotifOpen(false);
                        }}
                        className={`p-3 text-left hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl cursor-pointer transition-colors ${
                          !n.read ? 'bg-emerald-50/50 dark:bg-emerald-950/30' : ''
                        }`}
                      >
                        <p className="font-semibold text-xs text-slate-900 dark:text-slate-100">
                          {n.title}
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                          {n.message}
                        </p>
                        <span className="text-[10px] text-slate-400 mt-1 block">
                          {n.timestamp}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile & Logout */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1 bg-emerald-800 text-white rounded-2xl hover:bg-emerald-900 transition-colors shadow-xs"
                >
                  <img
                    src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover border border-white/40"
                  />
                  <div className="hidden md:flex flex-col text-left">
                    <span className="text-xs font-bold leading-tight leading-none">
                      {currentUser.name.split(' ')[0]}
                    </span>
                    <span className="text-[10px] text-emerald-200 uppercase tracking-wider font-semibold">
                      {t(`roles.${currentUser.role}`)}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-emerald-200" />
                </button>

                {/* User Dropdown */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        {currentUser.name}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {currentUser.village ? `${currentUser.village}, ${currentUser.district}` : currentUser.phone}
                      </p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold uppercase">
                        {t(`roles.${currentUser.role}`)}
                      </span>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          setIsUserDropdownOpen(false);
                          navigate('/dashboard');
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
                      >
                        Dashboard
                      </button>
                      <button
                        onClick={() => {
                          setIsUserDropdownOpen(false);
                          navigate('/profile');
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
                      >
                        Profile & Settings
                      </button>
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-800 pt-1 mt-1">
                      <button
                        onClick={() => {
                          logout();
                          setIsUserDropdownOpen(false);
                          navigate('/login');
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 flex items-center gap-2"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>{t('nav.logout')}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/register"
                  className="hidden sm:inline-block px-3 py-1.5 border border-emerald-300 dark:border-slate-700 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-slate-800 rounded-xl text-xs font-bold transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Language Picker Modal */}
      <LanguagePickerModal
        isOpen={isLangOpen}
        onClose={() => setIsLangOpen(false)}
      />

      {/* QR Scanner Modal */}
      <QRScannerModal
        isOpen={isQRScanOpen}
        onClose={() => setIsQRScanOpen(false)}
      />
    </>
  );
};
