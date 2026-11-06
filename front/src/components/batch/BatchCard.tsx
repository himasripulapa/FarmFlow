import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Batch } from '../../types';
import { MapPin, Calendar, QrCode, ArrowRight, ShieldCheck, Leaf } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/formatters';

interface BatchCardProps {
  batch: Batch;
}

export const BatchCard: React.FC<BatchCardProps> = ({ batch }) => {
  const { t, i18n } = useTranslation();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Created':
      case 'Harvested':
      case 'Quality Checked':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-200';
      case 'At Collection Center':
      case 'In Transit':
      case 'At Distributor':
      case 'At Retailer':
        return 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200';
      case 'Sold':
        return 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950 dark:text-blue-200';
      case 'Rejected':
      case 'Expired':
        return 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group space-y-4">
      
      {/* Card Header: Crop Emoji, Name, Status Badge */}
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl p-2 bg-emerald-50 dark:bg-slate-800 rounded-2xl shrink-0 group-hover:scale-110 transition-transform">
              {batch.crop.emoji || '🌾'}
            </span>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base group-hover:text-emerald-700 transition-colors">
                  {batch.crop.name}
                </h3>
                {batch.organic && (
                  <span className="inline-flex items-center gap-0.5 text-[10px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-full" title="100% Certified Organic">
                    <Leaf className="w-3 h-3 fill-current" />
                    Bio
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {batch.crop.variety}
              </p>
            </div>
          </div>

          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${getStatusColor(batch.status)}`}>
            {t(`statuses.${batch.status}` as any, batch.status)}
          </span>
        </div>
      </div>

      {/* Batch Details Body */}
      <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Batch ID</span>
          <span className="font-mono font-bold text-emerald-800 dark:text-emerald-300">{batch.batchId}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-400">Quantity & Price</span>
          <span className="font-bold text-slate-900 dark:text-slate-100">
            {batch.quantity} {batch.unit} • {formatCurrency(batch.pricePerUnit, i18n.language)}/{batch.unit}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-400">Quality Grade</span>
          <span className="font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200">
            Grade {batch.qualityGrade}
          </span>
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 dark:border-slate-700">
          <span className="flex items-center gap-1 text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-amber-500" />
            Farmer
          </span>
          <span className="font-semibold text-slate-700 dark:text-slate-200 truncate max-w-[140px]">
            {batch.farmer.name} ({batch.farmer.district})
          </span>
        </div>
      </div>

      {/* Card Footer Action */}
      <div className="flex items-center justify-between pt-1">
        <span className="text-[11px] text-slate-400 flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" />
          {formatDate(batch.harvestDate, i18n.language)}
        </span>

        <Link
          to={`/trace/${batch.batchId}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 hover:underline"
        >
          <span>Trace Journey</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  );
};
