import React, { useEffect, useState } from 'react';
import { StageFunnelChart } from '../../components/charts/StageFunnelChart';
import { QuantityTrendChart } from '../../components/charts/QuantityTrendChart';
import { CropDonutChart } from '../../components/charts/CropDonutChart';
import { useBatchStore } from '../../store/useBatchStore';
import { apiService } from '../../services/api';
import { Transaction } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import { useTranslation } from 'react-i18next';
import { FileSpreadsheet, Package, TrendingUp, Wallet, DollarSign } from 'lucide-react';

export const AnalyticsReportsPage: React.FC = () => {
  const { i18n } = useTranslation();
  const { batches, fetchBatches } = useBatchStore();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetchBatches();
    apiService.getTransactions().then(setTransactions).catch(() => setTransactions([]));
  }, [fetchBatches]);

  const totalBatches = batches.length;
  // Count only batches whose status is "In Transit"
  const inTransitBatches = batches.filter(b => b.status === 'In Transit').length;

  // Realized revenue comes ONLY from Paid transactions
  const totalPaidRevenue = transactions
    .filter(t => t.status === 'Paid')
    .reduce((acc, t) => acc + (t.totalAmount || 0), 0);

  // Expected value of batches not yet sold
  const expectedValue = batches
    .filter(b => b.status !== 'Sold' && b.status !== 'Rejected' && b.status !== 'Expired')
    .reduce((acc, b) => acc + ((b.pricePerUnit || 0) * (b.quantity || 0)), 0);

  const handleExportCSV = () => {
    const headers = ['Batch ID', 'Crop', 'Variety', 'Farmer', 'District', 'Quantity', 'Unit', 'Quality Grade', 'Status', 'Harvest Date'];
    const rows = batches.map(b => [
      b.batchId,
      b.crop.name,
      b.crop.variety,
      b.farmer.name,
      b.farmer.district,
      b.quantity,
      b.unit,
      b.qualityGrade,
      b.status,
      b.harvestDate
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `FarmFlow_Batches_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">
            Analytics & System Reports
          </h1>
          <p className="text-xs text-slate-500">
            Real-time supply chain throughput, volume distributions, and CSV report export.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-5 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-2xl shadow-sm flex items-center gap-2"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Export All Batches (CSV)</span>
        </button>
      </div>

      {/* Real Financial & Batch KPI Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Total Batches</span>
            <span className="text-2xl font-black text-slate-900 dark:text-slate-100 block">{totalBatches}</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 flex items-center justify-center font-bold">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">In Transit</span>
            <span className="text-2xl font-black text-slate-900 dark:text-slate-100 block">{inTransitBatches}</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Active Transit Only</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Realized Revenue</span>
            <span className="text-2xl font-black text-slate-900 dark:text-slate-100 block">
              {formatCurrency(totalPaidRevenue, i18n.language)}
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Paid Transactions</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Expected Value</span>
            <span className="text-2xl font-black text-slate-900 dark:text-slate-100 block">
              {formatCurrency(expectedValue, i18n.language)}
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Unsold Custody Batches</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
            Volume Processed Over Time
          </h3>
          <QuantityTrendChart />
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
            Crop Category Share
          </h3>
          <CropDonutChart />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
          Supply Chain Stage Funnel
        </h3>
        <StageFunnelChart />
      </div>
    </div>
  );
};
