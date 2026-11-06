import React from 'react';
import { WifiOff, RefreshCw, Wifi } from 'lucide-react';
import { useOfflineStore } from '../../store/useOfflineStore';
import { useTranslation } from 'react-i18next';

export const OfflineBanner: React.FC = () => {
  const { t } = useTranslation();
  const { isOffline, toggleOffline, queuedActionsCount } = useOfflineStore();

  if (!isOffline) return null;

  return (
    <div className="bg-amber-600 text-white px-4 py-2.5 shadow-md flex items-center justify-between text-xs sm:text-sm font-medium z-50 animate-bounce-short">
      <div className="flex items-center gap-2 max-w-2xl">
        <WifiOff className="w-5 h-5 shrink-0 text-amber-200" />
        <span>{t('common.offlineBanner')}</span>
        {queuedActionsCount > 0 && (
          <span className="bg-amber-800 px-2 py-0.5 rounded-full text-xs font-semibold">
            {queuedActionsCount} queued actions
          </span>
        )}
      </div>

      <button
        onClick={toggleOffline}
        className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-amber-900 hover:bg-amber-50 rounded-lg text-xs font-bold transition-all shadow-sm"
      >
        <Wifi className="w-3.5 h-3.5 text-emerald-600" />
        Simulate Online
      </button>
    </div>
  );
};
