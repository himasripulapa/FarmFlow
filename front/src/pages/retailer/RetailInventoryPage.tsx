import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useBatchStore } from '../../store/useBatchStore';
import { BatchTable } from '../../components/batch/BatchTable';
import { BatchPrintLabel } from '../../components/batch/BatchPrintLabel';
import { Batch } from '../../types';
import { Store, AlertTriangle, Printer, CheckCircle, X } from 'lucide-react';

export const RetailInventoryPage: React.FC = () => {
  const { t } = useTranslation();
  const { batches, fetchBatches, updateStatus } = useBatchStore();
  const [selectedPrintBatch, setSelectedPrintBatch] = useState<Batch | null>(null);

  useEffect(() => {
    fetchBatches();
  }, [fetchBatches]);

  const retailStock = batches.filter(b => b.status === 'At Retailer' || b.status === 'In Transit');

  const handleMarkSold = async (batch: Batch) => {
    await updateStatus(batch.batchId, 'Sold', {
      stage: 'retailer',
      handlerName: 'GreenBazar Retail Counter',
      handlerRole: 'retailer',
      location: { name: 'GreenBazar Jubilee Hills Checkout', lat: 17.4319, lng: 78.4072 },
      notes: 'Sold out to retail consumer.'
    });
  };

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">
          Retail Shelf Inventory & Expiry Alerts
        </h1>
        <p className="text-xs text-slate-500">
          Manage produce on store shelves, print consumer QR stickers, and mark items sold.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
            <Store className="w-5 h-5 text-purple-600" />
            Current Store Shelf Stock
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold uppercase text-[10px]">
                <th className="p-3">Batch ID</th>
                <th className="p-3">Crop / Variety</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Expiry Date</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {retailStock.map((b) => (
                <tr key={b.batchId} className="hover:bg-slate-50 dark:hover:bg-slate-800">
                  <td className="p-3 font-mono font-bold text-emerald-800">{b.batchId}</td>
                  <td className="p-3 font-bold">{b.crop.name} ({b.crop.variety})</td>
                  <td className="p-3 font-bold">{b.quantity} {b.unit}</td>
                  <td className="p-3 text-rose-600 font-semibold">{b.expiryDate}</td>
                  <td className="p-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900">
                      {b.status}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => setSelectedPrintBatch(b)}
                      className="px-2.5 py-1 bg-purple-100 text-purple-900 hover:bg-purple-200 font-bold text-xs rounded-lg inline-flex items-center gap-1"
                    >
                      <Printer className="w-3 h-3" />
                      Print Sticker
                    </button>

                    <button
                      onClick={() => handleMarkSold(b)}
                      className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg inline-flex items-center gap-1"
                    >
                      <CheckCircle className="w-3 h-3" />
                      Mark Sold
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Print Sticker Modal */}
      {selectedPrintBatch && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative">
            <button
              onClick={() => setSelectedPrintBatch(null)}
              className="absolute -top-3 -right-3 z-10 p-2 bg-white rounded-full shadow-md text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
            <BatchPrintLabel batch={selectedPrintBatch} />
          </div>
        </div>
      )}

    </div>
  );
};
