import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useBatchStore } from '../../store/useBatchStore';
import { BatchCard } from '../../components/batch/BatchCard';
import { VoiceInputButton } from '../../components/ui/VoiceInputButton';
import { Search, Filter } from 'lucide-react';

export const GlobalSearchPage: React.FC = () => {
  const { t } = useTranslation();
  const { batches, fetchBatches, loading } = useBatchStore();
  const [query, setQuery] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  useEffect(() => {
    fetchBatches();
  }, [fetchBatches]);

  const filtered = batches.filter((b) => {
    const q = query.toLowerCase();
    const matchesQ =
      b.batchId.toLowerCase().includes(q) ||
      b.crop.name.toLowerCase().includes(q) ||
      b.farmer.name.toLowerCase().includes(q) ||
      b.farmer.district.toLowerCase().includes(q) ||
      b.status.toLowerCase().includes(q);

    const matchesCrop = selectedCrop === 'All' || b.crop.name === selectedCrop;
    const matchesStatus = selectedStatus === 'All' || b.status === selectedStatus;

    return matchesQ && matchesCrop && matchesStatus;
  });

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">
          Global Search & Filter
        </h1>
        <p className="text-xs text-slate-500">
          Search produce batches by Batch ID, crop, farmer name, district, or status with voice search.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl shadow-xs space-y-4">
        <div className="relative flex items-center">
          <Search className="w-5 h-5 text-emerald-700 absolute left-4" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type Batch ID, crop name, farmer name, or city..."
            className="w-full pl-12 pr-14 py-3 bg-slate-50 dark:bg-slate-800 text-sm font-semibold rounded-2xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <div className="absolute right-2">
            <VoiceInputButton onResult={(text) => setQuery(text)} />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
            <Filter className="w-4 h-4 text-emerald-600" />
            <span>Filters:</span>
          </div>

          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold"
          >
            <option value="All">All Crops</option>
            <option value="Chilli">Chilli</option>
            <option value="Rice">Rice</option>
            <option value="Mango">Mango</option>
            <option value="Tomato">Tomato</option>
            <option value="Turmeric">Turmeric</option>
            <option value="Groundnut">Groundnut</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold"
          >
            <option value="All">All Statuses</option>
            <option value="Harvested">Harvested</option>
            <option value="Quality Checked">Quality Checked</option>
            <option value="In Transit">In Transit</option>
            <option value="At Retailer">At Retailer</option>
            <option value="Sold">Sold</option>
          </select>

          {(query || selectedCrop !== 'All' || selectedStatus !== 'All') && (
            <button
              onClick={() => {
                setQuery('');
                setSelectedCrop('All');
                setSelectedStatus('All');
              }}
              className="text-xs text-rose-600 font-bold hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <p className="text-xs text-slate-400 text-center py-6">Searching database...</p>
      ) : (
        <div className="space-y-3">
          <p className="text-xs font-bold text-slate-500">Found {filtered.length} matching batch records</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((b) => (
              <BatchCard key={b.batchId} batch={b} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
