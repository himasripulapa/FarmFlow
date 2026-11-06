import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useBatchStore } from '../../store/useBatchStore';
import { BatchCard } from '../../components/batch/BatchCard';
import { BatchTable } from '../../components/batch/BatchTable';
import { VoiceInputButton } from '../../components/ui/VoiceInputButton';
import { LayoutGrid, List, Search, PlusCircle, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MyBatchesPage: React.FC = () => {
  const { t } = useTranslation();
  const { batches, fetchBatches, loading } = useBatchStore();
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    fetchBatches();
  }, [fetchBatches]);

  const filteredBatches = batches.filter((b) => {
    const matchesSearch =
      b.batchId.toLowerCase().includes(search.toLowerCase()) ||
      b.crop.name.toLowerCase().includes(search.toLowerCase()) ||
      b.status.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">
            {t('nav.myBatches')}
          </h1>
          <p className="text-xs text-slate-500">
            Manage your harvest records, status history, and QR stickers.
          </p>
        </div>

        <Link
          to="/farmer/create-batch"
          className="px-5 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-2xl shadow-sm flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Create Batch</span>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-3xl shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search with Voice */}
        <div className="relative flex-1 w-full flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by crop, Batch ID, status..."
            className="w-full pl-10 pr-12 py-2.5 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm font-semibold rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <div className="absolute right-1">
            <VoiceInputButton onResult={(text) => setSearch(text)} />
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200"
          >
            <option value="All">All Statuses</option>
            <option value="Harvested">Harvested</option>
            <option value="Quality Checked">Quality Checked</option>
            <option value="In Transit">In Transit</option>
            <option value="At Retailer">At Retailer</option>
            <option value="Sold">Sold</option>
            <option value="Rejected">Rejected</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-white dark:bg-slate-700 shadow-xs text-emerald-700' : 'text-slate-400'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'table' ? 'bg-white dark:bg-slate-700 shadow-xs text-emerald-700' : 'text-slate-400'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content Grid or Table */}
      {loading ? (
        <p className="text-xs text-slate-400 py-8 text-center">Loading batch registry...</p>
      ) : batches.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center space-y-3">
          <p className="text-slate-900 dark:text-slate-100 font-bold text-base">No batches yet, create your first harvest</p>
          <p className="text-slate-500 text-xs">Start logging your crop batches to enable digital QR verification across hubs and buyers.</p>
          <Link
            to="/farmer/create-batch"
            className="inline-block mt-2 px-5 py-2.5 bg-emerald-700 text-white rounded-xl text-xs font-bold hover:bg-emerald-800 transition-colors"
          >
            Create Your First Batch
          </Link>
        </div>
      ) : filteredBatches.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center space-y-3">
          <p className="text-slate-500 text-sm font-semibold">No harvest batches match your search criteria.</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredBatches.map((b) => (
            <BatchCard key={b.batchId} batch={b} />
          ))}
        </div>
      ) : (
        <BatchTable batches={filteredBatches} />
      )}
    </div>
  );
};
