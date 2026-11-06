import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useBatchStore } from '../../store/useBatchStore';
import { Batch, BatchStatus } from '../../types';
import { BatchTable } from '../../components/batch/BatchTable';
import { X, Check, Award, Truck, AlertTriangle } from 'lucide-react';

export const IncomingBatchesPage: React.FC = () => {
  const { t } = useTranslation();
  const { batches, fetchBatches, updateStatus } = useBatchStore();
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);

  const [inspectGrade, setInspectGrade] = useState<'A' | 'B' | 'C'>('A');
  const [inspectMoisture, setInspectMoisture] = useState(9.5);
  const [storageLoc, setStorageLoc] = useState('Cold Storage Bay #4');
  const [notes, setNotes] = useState('Quality parameters verified. Weight matches manifest.');
  const [rejectReason, setRejectReason] = useState('');

  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  useEffect(() => {
    fetchBatches();
  }, [fetchBatches]);

  const incomingBatches = batches.filter(b => b.status === 'Harvested' || b.status === 'Quality Checked');

  const handleAcceptSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBatch) return;

    await updateStatus(selectedBatch.batchId, 'At Collection Center', {
      stage: 'collectionCenter',
      handlerName: 'Anand Kumar (Collection Center Mgr)',
      handlerRole: 'collectionCenter',
      location: { name: `Tenali Hub - ${storageLoc}`, lat: 16.243, lng: 80.6405 },
      notes: `Grade ${inspectGrade} verified. Moisture: ${inspectMoisture}%. ${notes}`
    });

    setIsAcceptModalOpen(false);
    setSelectedBatch(null);
  };

  const handleRejectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBatch) return;

    await updateStatus(selectedBatch.batchId, 'Rejected', {
      stage: 'collectionCenter',
      handlerName: 'Anand Kumar (Collection Center Mgr)',
      handlerRole: 'collectionCenter',
      location: { name: 'Tenali Hub Inspection Gate', lat: 16.243, lng: 80.6405 },
      notes: `REJECTED: ${rejectReason}`
    });

    setIsRejectModalOpen(false);
    setSelectedBatch(null);
  };

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">
          Incoming Harvest Batches & Quality Inspection
        </h1>
        <p className="text-xs text-slate-500">
          Inspect incoming farmer shipments, log lab parameters, and assign storage bays.
        </p>
      </div>

      {incomingBatches.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center text-slate-500 text-sm font-semibold">
          No pending incoming batches for inspection.
        </div>
      ) : (
        <div className="space-y-4">
          <BatchTable
            batches={incomingBatches}
            actionLabel="Inspect & Grade"
            onActionClick={(b) => {
              setSelectedBatch(b);
              setIsAcceptModalOpen(true);
            }}
          />
        </div>
      )}

      {/* Accept & Quality Inspection Modal */}
      {isAcceptModalOpen && selectedBatch && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl relative space-y-4 animate-in fade-in duration-200">
            <button
              onClick={() => setIsAcceptModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
              <Award className="w-6 h-6 text-amber-500" />
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                  Quality Inspection & Lab Test
                </h3>
                <p className="text-xs text-slate-500">Batch ID: {selectedBatch.batchId} ({selectedBatch.crop.name})</p>
              </div>
            </div>

            <form onSubmit={handleAcceptSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Assign Grade</label>
                  <select
                    value={inspectGrade}
                    onChange={(e) => setInspectGrade(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold dark:bg-slate-800"
                  >
                    <option value="A">Grade A (Premium Export)</option>
                    <option value="B">Grade B (Standard Commercial)</option>
                    <option value="C">Grade C (Local Processing)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Moisture Test (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={inspectMoisture}
                    onChange={(e) => setInspectMoisture(+e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold dark:bg-slate-800"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Storage Bay Location</label>
                <input
                  type="text"
                  value={storageLoc}
                  onChange={(e) => setStorageLoc(e.target.value)}
                  placeholder="e.g. Cold Storage Bay #4"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold dark:bg-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Inspection & Storage Notes</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs dark:bg-slate-800"
                ></textarea>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAcceptModalOpen(false);
                    setIsRejectModalOpen(true);
                  }}
                  className="px-4 py-3 bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold text-xs rounded-xl"
                >
                  Reject Batch
                </button>

                <button
                  type="submit"
                  className="flex-1 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-sm"
                >
                  Accept & Store Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {isRejectModalOpen && selectedBatch && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl relative space-y-4">
            <div className="flex items-center gap-2 text-rose-600 font-bold">
              <AlertTriangle className="w-6 h-6" />
              <h3>Reject Batch {selectedBatch.batchId}</h3>
            </div>

            <form onSubmit={handleRejectSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Reason for Rejection</label>
                <textarea
                  rows={3}
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="e.g. Moisture level exceeds maximum threshold 12%. Mold risk."
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs dark:bg-slate-800"
                ></textarea>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsRejectModalOpen(false)}
                  className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl"
                >
                  Confirm Rejection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
