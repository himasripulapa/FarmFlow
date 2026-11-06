import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Batch } from '../../types';
import { QrCode, ArrowRight, ExternalLink } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/formatters';

interface BatchTableProps {
  batches: Batch[];
  onActionClick?: (batch: Batch) => void;
  actionLabel?: string;
}

export const BatchTable: React.FC<BatchTableProps> = ({
  batches,
  onActionClick,
  actionLabel = 'Action'
}) => {
  const { t, i18n } = useTranslation();

  return (
    <div className="w-full overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
      <table className="w-full text-left border-collapse text-xs sm:text-sm">
        <thead>
          <tr className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 border-b border-slate-200 dark:border-slate-800 font-bold uppercase text-[11px] tracking-wider">
            <th className="py-3.5 px-4">Batch ID</th>
            <th className="py-3.5 px-4">Crop & Variety</th>
            <th className="py-3.5 px-4">Farmer / Origin</th>
            <th className="py-3.5 px-4">Volume</th>
            <th className="py-3.5 px-4">Grade</th>
            <th className="py-3.5 px-4">Status</th>
            <th className="py-3.5 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
          {batches.map((b) => (
            <tr key={b.batchId} className="hover:bg-emerald-50/40 dark:hover:bg-slate-800/50 transition-colors">
              <td className="py-3 px-4 font-mono font-bold text-emerald-800 dark:text-emerald-300">
                <Link to={`/trace/${b.batchId}`} className="hover:underline flex items-center gap-1">
                  <span>{b.batchId}</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </Link>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{b.crop.emoji || '🌾'}</span>
                  <div>
                    <span className="font-bold text-slate-900 dark:text-slate-100 block">{b.crop.name}</span>
                    <span className="text-[11px] text-slate-500">{b.crop.variety}</span>
                  </div>
                </div>
              </td>
              <td className="py-3 px-4">
                <span className="font-semibold text-slate-800 dark:text-slate-200 block">{b.farmer.name}</span>
                <span className="text-[11px] text-slate-400">{b.farmer.village}, {b.farmer.district}</span>
              </td>
              <td className="py-3 px-4">
                <span className="font-bold">{b.quantity} {b.unit}</span>
                <span className="text-[11px] text-slate-400 block">{formatCurrency(b.pricePerUnit, i18n.language)}/{b.unit}</span>
              </td>
              <td className="py-3 px-4">
                <span className="px-2 py-0.5 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200">
                  Grade {b.qualityGrade}
                </span>
              </td>
              <td className="py-3 px-4">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {t(`statuses.${b.status}` as any, b.status)}
                </span>
              </td>
              <td className="py-3 px-4 text-right">
                {onActionClick ? (
                  <button
                    onClick={() => onActionClick(b)}
                    className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
                  >
                    {actionLabel}
                  </button>
                ) : (
                  <Link
                    to={`/trace/${b.batchId}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
                  >
                    <span>Trace</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
