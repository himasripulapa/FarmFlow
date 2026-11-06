import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useBatchStore } from '../../store/useBatchStore';
import { BatchTable } from '../../components/batch/BatchTable';
import { Batch } from '../../types';
import { Truck, PlusCircle, MapPin, X } from 'lucide-react';

export const ShipmentsPage: React.FC = () => {
  const { t } = useTranslation();
  const { batches, fetchBatches, updateStatus } = useBatchStore();
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);

  const [vehicleNo, setVehicleNo] = useState('AP-16-TX-9988');
  const [driverName, setDriverName] = useState('Venkatesh Rao');
  const [driverPhone, setDriverPhone] = useState('9123456789');
  const [destinationRetailer, setDestinationRetailer] = useState('GreenBazar Jubilee Hills');

  const [isDispatchModalOpen, setIsDispatchModalOpen] = useState(false);

  useEffect(() => {
    fetchBatches();
  }, [fetchBatches]);

  const activeShipments = batches.filter(b => b.status === 'In Transit' || b.status === 'At Collection Center' || b.status === 'At Distributor');

  const handleDispatchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBatch) return;

    await updateStatus(selectedBatch.batchId, 'In Transit', {
      stage: 'distributor',
      handlerName: `Krishna Express (${driverName})`,
      handlerRole: 'distributor',
      location: { name: `Transit Truck ${vehicleNo} -> ${destinationRetailer}`, lat: 16.5062, lng: 80.648 },
      notes: `Vehicle: ${vehicleNo} | Driver: ${driverName} (${driverPhone}). En route to ${destinationRetailer}.`
    });

    setIsDispatchModalOpen(false);
    setSelectedBatch(null);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">
            Distributor Shipments & Fleet Logistics
          </h1>
          <p className="text-xs text-slate-500">
            Track refrigerated vehicles in transit and dispatch batches to retail outlets.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
          Active Shipments & Fleet Dispatch
        </h3>

        <BatchTable
          batches={activeShipments}
          actionLabel="Dispatch Vehicle"
          onActionClick={(b) => {
            setSelectedBatch(b);
            setIsDispatchModalOpen(true);
          }}
        />
      </div>

      {/* Dispatch Vehicle Modal */}
      {isDispatchModalOpen && selectedBatch && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl relative space-y-4">
            <button
              onClick={() => setIsDispatchModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
              <Truck className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                  Assign Vehicle & Driver
                </h3>
                <p className="text-xs text-slate-500">Batch ID: {selectedBatch.batchId} ({selectedBatch.crop.name})</p>
              </div>
            </div>

            <form onSubmit={handleDispatchSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Vehicle Registration Number</label>
                <input
                  type="text"
                  value={vehicleNo}
                  onChange={(e) => setVehicleNo(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold dark:bg-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Driver Name</label>
                  <input
                    type="text"
                    value={driverName}
                    onChange={(e) => setDriverName(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold dark:bg-slate-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Driver Contact</label>
                  <input
                    type="tel"
                    value={driverPhone}
                    onChange={(e) => setDriverPhone(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold dark:bg-slate-800"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Destination Retailer</label>
                <select
                  value={destinationRetailer}
                  onChange={(e) => setDestinationRetailer(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold dark:bg-slate-800"
                >
                  <option value="GreenBazar Jubilee Hills">GreenBazar Jubilee Hills</option>
                  <option value="More Supermarket Indiranagar">More Supermarket Indiranagar</option>
                  <option value="Spencer Fresh Mart Chennai">Spencer Fresh Mart Chennai</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md"
              >
                Dispatch Vehicle in Transit
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
