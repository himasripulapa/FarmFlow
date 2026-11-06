import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';
import { Footer } from './components/layout/Footer';
import { OfflineBanner } from './components/ui/OfflineBanner';
import { WhatsAppHelpWidget } from './components/widgets/WhatsAppHelpWidget';
import { AppRoutes } from './routes/AppRoutes';
import { useSettingsStore } from './store/useSettingsStore';
import { useAuthStore } from './store/useAuthStore';
import { LanguagePickerModal } from './components/ui/LanguagePickerModal';
import './locales/i18n';

export const App: React.FC = () => {
  const { hasPickedInitialLanguage } = useSettingsStore();
  const { fetchMe } = useAuthStore();

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#FAFAF5] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors font-sans">
        
        {/* Offline Status Banner */}
        <OfflineBanner />

        {/* Top Navbar */}
        <Navbar />

        {/* Main Content Layout */}
        <div className="flex-1 flex max-w-7xl w-full mx-auto">
          {/* Desktop Collapsible Sidebar */}
          <Sidebar />

          {/* Page View Container */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
            <AppRoutes />
          </main>
        </div>

        {/* Footer */}
        <Footer />

        {/* Mobile Bottom Navigation Bar (min 48px touch targets) */}
        <MobileNav />

        {/* Floating WhatsApp Help Widget */}
        <WhatsAppHelpWidget />

        {/* First-time Language Selector Modal */}
        {!hasPickedInitialLanguage && (
          <LanguagePickerModal isFirstTime={true} />
        )}

      </div>
    </BrowserRouter>
  );
};

export default App;
