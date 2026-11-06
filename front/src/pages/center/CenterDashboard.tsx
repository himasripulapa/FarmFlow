import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useBatchStore } from '../../store/useBatchStore';
import { useAuthStore } from '../../store/useAuthStore';
import { StageFunnelChart } from '../../components/charts/StageFunnelChart';
import { CropDonutChart } from '../../components/charts/CropDonutChart';
import { BatchTable } from '../../components/batch/BatchTable';
import { Building2, Package, CheckCircle2, ArrowRight } from 'lucide-react';

export const CenterDashboard: React.FC = () => {
  const { t } = useTranslation();
  const { currentUser } = useAuthStore();
  const { batches, fetchBatches } = useBatchStore();

  useEffect(() => {
    fetchBatches();
  }, [fetchBatches]);

  const incomingBatches = batches.filter(b => b.status === 'Harvested' || b.status === 'Quality Checked');

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-amber-100 dark:border-slate-800 shadow-sm">
        <div>
          <span className="text-xs font-extrabold uppercase bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full">
            Collection Center Portal
          </span>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-1">
            {currentUser?.centerName || 'Guntur Central Agri-Hub #1'}
          </h1>
          <p className="text-xs text-slate-500">
            Manager: {currentUser?.name || 'Anand Kumar'} • Storage Occupancy: 64%
          </p>
        </div>

        <Link
          to="/center/incoming"
          className="px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm rounded-2xl shadow-md flex items-center gap-2"
        >
          <Package className="w-5 h-5" />
          <span>Inspect Incoming ({incomingBatches.length})</span>
        </Link>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
            Supply Chain Stage Volume
          </h3>
          <StageFunnelChart />
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
            Crop Category Share
          </h3>
          <CropDonutChart />
        </div>
      </div>

      {/* Incoming Queue */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Batches Awaiting Quality Inspection
          </h2>
          <Link to="/center/incoming" className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1">
            <span>Inspect All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <BatchTable batches={incomingBatches.slice(0, 5)} actionLabel="Inspect & Grade" />
      </div>
    </div>
  );
};
