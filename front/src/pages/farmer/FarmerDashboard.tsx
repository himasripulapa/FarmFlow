import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../store/useAuthStore';
import { useBatchStore } from '../../store/useBatchStore';
import { apiService } from '../../services/api';
import { Transaction } from '../../types';
import { WeatherWidget } from '../../components/widgets/WeatherWidget';
import { MandiPricesWidget } from '../../components/widgets/MandiPricesWidget';
import { SpeechSynthButton } from '../../components/ui/SpeechSynthButton';
import { BatchCard } from '../../components/batch/BatchCard';
import { formatCurrency } from '../../utils/formatters';
import {
  PlusCircle,
  Package,
  Sprout,
  TrendingUp,
  Wallet,
  ArrowRight
} from 'lucide-react';

export const FarmerDashboard: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { currentUser } = useAuthStore();
  const { batches, fetchBatches, loading } = useBatchStore();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetchBatches();
    apiService.getTransactions().then(setTransactions).catch(() => setTransactions([]));
  }, [fetchBatches]);

  const totalBatches = batches.length;
  // 3. Count only batches whose status is "In Transit" (not Created or Harvested)
  const activeBatchesInTransit = batches.filter(b => b.status === 'In Transit').length;
  const totalVolume = batches.reduce((acc, b) => acc + b.quantity, 0);

  // 1. Total Revenue: count only money actually received from Paid transactions where the farmer is the receiver (toUser)
  const paidTransactions = transactions.filter(t => {
    if (t.status !== 'Paid') return false;
    if (!currentUser) return false;
    const to = (t.toUser || '').trim().toLowerCase();
    const name = (currentUser.name || '').trim().toLowerCase();
    const id = (currentUser.id || '').trim().toLowerCase();
    const phone = (currentUser.phone || '').trim().toLowerCase();
    return to === name || to === id || to === phone || (currentUser.email && to === currentUser.email.trim().toLowerCase());
  });

  const totalRevenue = paidTransactions.reduce((acc, t) => acc + (t.totalAmount || 0), 0);

  // 2. Expected Value: sum of quantity x pricePerUnit for batches not yet sold
  const expectedValue = batches
    .filter(b => b.status !== 'Sold' && b.status !== 'Rejected' && b.status !== 'Expired')
    .reduce((acc, b) => acc + ((b.pricePerUnit || 0) * (b.quantity || 0)), 0);

  const dashboardSummaryText = `Welcome back ${currentUser?.name || 'Farmer'}. You have ${totalBatches} total harvest batches created, with ${activeBatchesInTransit} active in supply chain transit. Total revenue received is ${formatCurrency(totalRevenue, i18n.language)}, with an expected unsold value of ${formatCurrency(expectedValue, i18n.language)}.`;

  return (
    <div className="space-y-8 pb-12">
      
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-emerald-100 dark:border-slate-800 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold uppercase bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
              Farmer Portal
            </span>
            <SpeechSynthButton textToRead={dashboardSummaryText} />
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">
            {t('dashboard.welcome')}, {currentUser?.name || 'Swathi'}!
          </h1>
          <p className="text-xs text-slate-500">
            {currentUser?.village}, {currentUser?.district} • Organic Cultivator
          </p>
        </div>

        <Link
          to="/farmer/create-batch"
          className="w-full sm:w-auto px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-2xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95"
        >
          <PlusCircle className="w-5 h-5" />
          <span>+ Create New Batch</span>
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 p-5 rounded-3xl shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">{t('dashboard.totalBatches')}</span>
            <span className="text-2xl font-black text-slate-900 dark:text-slate-100 block">{totalBatches}</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 p-5 rounded-3xl shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            <Sprout className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">{t('dashboard.quantityHarvested')}</span>
            <span className="text-2xl font-black text-slate-900 dark:text-slate-100 block">{totalVolume.toLocaleString()} kg</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 p-5 rounded-3xl shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">{t('dashboard.activeBatches')}</span>
            <span className="text-2xl font-black text-slate-900 dark:text-slate-100 block">{activeBatchesInTransit}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">In Transit only</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 p-5 rounded-3xl shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">{t('dashboard.earnings')}</span>
            <span className="text-2xl font-black text-slate-900 dark:text-slate-100 block">
              {formatCurrency(totalRevenue, i18n.language)}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
              Expected Value: <strong className="text-emerald-700 dark:text-emerald-400">{formatCurrency(expectedValue, i18n.language)}</strong>
            </span>
          </div>
        </div>

      </div>

      {/* Grid: Weather & Mandi Prices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeatherWidget />
        <MandiPricesWidget />
      </div>

      {/* Recent Batches Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            {t('dashboard.recentBatches')}
          </h2>
          <Link
            to="/farmer/my-batches"
            className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>View All ({batches.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <p className="text-xs text-slate-400 py-4">Loading harvest batches...</p>
        ) : batches.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 text-center space-y-3">
            <Sprout className="w-10 h-10 text-emerald-600 mx-auto" />
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
              No batches yet, create your first harvest
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Record your first crop yield to generate a QR-traceable digital batch.
            </p>
            <Link
              to="/farmer/create-batch"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold hover:bg-emerald-800 transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create First Batch</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {batches.slice(0, 3).map((b) => (
              <BatchCard key={b.batchId} batch={b} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
