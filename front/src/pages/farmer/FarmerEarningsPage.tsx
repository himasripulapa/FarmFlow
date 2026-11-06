import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { apiService } from '../../services/api';
import { useAuthStore } from '../../store/useAuthStore';
import { useBatchStore } from '../../store/useBatchStore';
import { Transaction } from '../../types';
import { QuantityTrendChart } from '../../components/charts/QuantityTrendChart';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { Wallet, CheckCircle, Clock, TrendingUp } from 'lucide-react';

export const FarmerEarningsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { currentUser } = useAuthStore();
  const { batches, fetchBatches } = useBatchStore();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetchBatches();
    apiService.getTransactions().then(setTransactions).catch(() => setTransactions([]));
  }, [fetchBatches]);

  // Only count transactions where the farmer is the receiver (toUser)
  const farmerTransactions = transactions.filter((t) => {
    if (!currentUser) return false;
    const to = (t.toUser || '').trim().toLowerCase();
    const name = (currentUser.name || '').trim().toLowerCase();
    const id = (currentUser.id || '').trim().toLowerCase();
    const phone = (currentUser.phone || '').trim().toLowerCase();
    return to === name || to === id || to === phone || (currentUser.email && to === currentUser.email.trim().toLowerCase());
  });

  const totalPaid = farmerTransactions
    .filter((t) => t.status === 'Paid')
    .reduce((acc, t) => acc + (t.totalAmount || 0), 0);

  const totalPending = farmerTransactions
    .filter((t) => t.status === 'Pending')
    .reduce((acc, t) => acc + (t.totalAmount || 0), 0);

  // Expected Value of batches not yet sold
  const expectedValue = batches
    .filter(b => b.status !== 'Sold' && b.status !== 'Rejected' && b.status !== 'Expired')
    .reduce((acc, b) => acc + ((b.pricePerUnit || 0) * (b.quantity || 0)), 0);

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">
          Earnings & Direct Payments
        </h1>
        <p className="text-xs text-slate-500">
          Track harvest sales, buyer payouts, and payment status receipts.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 p-6 rounded-3xl shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase">
            <Wallet className="w-4 h-4" />
            <span>Total Earnings Received</span>
          </div>
          <span className="text-3xl font-black text-slate-900 dark:text-slate-100 block">
            {formatCurrency(totalPaid, i18n.language)}
          </span>
          <span className="text-[11px] text-slate-400 block">
            Paid transactions received
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 p-6 rounded-3xl shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase">
            <Clock className="w-4 h-4" />
            <span>Pending Payouts</span>
          </div>
          <span className="text-3xl font-black text-slate-900 dark:text-slate-100 block">
            {formatCurrency(totalPending, i18n.language)}
          </span>
          <span className="text-[11px] text-slate-400 block">
            Awaiting clearance
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 p-6 rounded-3xl shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase">
            <TrendingUp className="w-4 h-4" />
            <span>Expected Value (Unsold)</span>
          </div>
          <span className="text-3xl font-black text-slate-900 dark:text-slate-100 block">
            {formatCurrency(expectedValue, i18n.language)}
          </span>
          <span className="text-[11px] text-slate-400 block">
            {farmerTransactions.filter(t => t.status === 'Paid').length} Completed Sales
          </span>
        </div>
      </div>

      {/* Recharts Revenue Trend */}
      <div className="bg-white dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 p-6 rounded-3xl shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
          Monthly Revenue Trend (₹)
        </h3>
        <QuantityTrendChart />
      </div>

      {/* Transaction History Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
          Recent Payout Statements
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold uppercase text-[10px]">
                <th className="p-3">TXN ID</th>
                <th className="p-3">Batch ID / Crop</th>
                <th className="p-3">Buyer / Payer</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Method</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {farmerTransactions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500 dark:text-slate-400 font-medium">
                    No payment receipts or transactions found for your account yet.
                  </td>
                </tr>
              ) : (
                farmerTransactions.slice(0, 10).map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-800">
                    <td className="p-3 font-mono font-bold text-emerald-800">{t.id}</td>
                    <td className="p-3">{t.batchId} ({t.cropName})</td>
                    <td className="p-3">{t.fromUser}</td>
                    <td className="p-3 font-bold text-slate-900 dark:text-slate-100">{formatCurrency(t.totalAmount, i18n.language)}</td>
                    <td className="p-3 font-semibold">{t.paymentMethod || 'Direct Transfer'}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        t.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="p-3 text-right text-slate-400">{formatDate(t.date, i18n.language)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
