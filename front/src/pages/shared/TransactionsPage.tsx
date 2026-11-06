import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { apiService } from '../../services/api';
import { Transaction } from '../../types';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { Receipt, FileSpreadsheet, Search } from 'lucide-react';

export const TransactionsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    apiService.getTransactions().then(setTransactions);
  }, []);

  const filtered = transactions.filter(t =>
    t.id.toLowerCase().includes(search.toLowerCase()) ||
    t.batchId.toLowerCase().includes(search.toLowerCase()) ||
    t.cropName.toLowerCase().includes(search.toLowerCase()) ||
    t.fromUser.toLowerCase().includes(search.toLowerCase())
  );

  const handleExportCSV = () => {
    const headers = ['TXN ID', 'Batch ID', 'Crop', 'From', 'To', 'Quantity', 'Amount', 'Status', 'Date'];
    const rows = filtered.map(t => [
      t.id, t.batchId, t.cropName, t.fromUser, t.toUser, `${t.quantity} ${t.unit}`, t.totalAmount, t.status, t.date
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `FarmFlow_Transactions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">
            Supply Chain Transactions Ledger
          </h1>
          <p className="text-xs text-slate-500">
            Immutable log of all produce sales, transfers, and financial settlements.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-5 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-2xl shadow-sm flex items-center gap-2"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Export Ledger (CSV)</span>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-xs space-y-4">
        <div className="relative flex items-center max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search TXN ID, Batch ID, or Crop..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold uppercase text-[10px]">
                <th className="p-3">TXN ID</th>
                <th className="p-3">Batch ID / Crop</th>
                <th className="p-3">Sender (From)</th>
                <th className="p-3">Receiver (To)</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {filtered.slice(0, 15).map((t) => (
                <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-800">
                  <td className="p-3 font-mono font-bold text-emerald-800">{t.id}</td>
                  <td className="p-3">{t.batchId} ({t.cropName})</td>
                  <td className="p-3">{t.fromUser}</td>
                  <td className="p-3">{t.toUser}</td>
                  <td className="p-3 font-bold text-slate-900 dark:text-slate-100">{formatCurrency(t.totalAmount, i18n.language)}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      t.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="p-3 text-right text-slate-400">{formatDate(t.date, i18n.language)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
