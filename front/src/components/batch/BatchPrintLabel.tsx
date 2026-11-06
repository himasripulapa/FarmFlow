import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Batch } from '../../types';
import { Logo } from '../branding/Logo';
import { Printer, Download, Leaf, ShieldCheck } from 'lucide-react';
import { generateBatchCertificatePDF } from '../../utils/pdfGenerator';

interface BatchPrintLabelProps {
  batch: Batch;
}

export const BatchPrintLabel: React.FC<BatchPrintLabelProps> = ({ batch }) => {
  const handlePrint = () => {
    window.print();
  };

  const traceUrl = `${window.location.origin}/trace/${batch.batchId}`;

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-emerald-600 rounded-3xl p-6 max-w-sm w-full shadow-lg space-y-4 print:border-none print:shadow-none print:p-0">
      
      {/* Label Header */}
      <div className="flex items-center justify-between border-b-2 border-emerald-100 dark:border-slate-800 pb-3">
        <Logo size="sm" showText={true} />
        <span className="text-[10px] font-extrabold uppercase bg-emerald-800 text-white px-2 py-0.5 rounded-full">
          Verified Sticker
        </span>
      </div>

      {/* Main QR Code & Batch ID */}
      <div className="flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-center space-y-2">
        <div className="bg-white p-3 rounded-2xl shadow-xs border border-slate-200">
          <QRCodeSVG value={traceUrl} size={140} level="H" />
        </div>
        <p className="font-mono font-extrabold text-lg text-emerald-800 dark:text-emerald-300 tracking-wider">
          {batch.batchId}
        </p>
        <p className="text-[11px] text-slate-500 font-medium">Scan to trace farm-to-fork journey</p>
      </div>

      {/* Batch Information Details */}
      <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
        <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
          <span className="text-slate-400">Crop / Variety</span>
          <span className="font-bold text-slate-900 dark:text-slate-100">{batch.crop.name} ({batch.crop.variety})</span>
        </div>

        <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
          <span className="text-slate-400">Farmer</span>
          <span className="font-bold text-slate-900 dark:text-slate-100">{batch.farmer.name}</span>
        </div>

        <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
          <span className="text-slate-400">Harvest Date</span>
          <span className="font-bold">{batch.harvestDate}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-400">Quality & Organic</span>
          <span className="font-bold text-emerald-700 dark:text-emerald-400">
            Grade {batch.qualityGrade} • {batch.organic ? '100% Organic' : 'Standard'}
          </span>
        </div>
      </div>

      {/* Action Buttons (Hidden when printing) */}
      <div className="flex gap-2 pt-2 print:hidden">
        <button
          onClick={handlePrint}
          className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs"
        >
          <Printer className="w-4 h-4" />
          <span>Print Sticker</span>
        </button>

        <button
          onClick={() => generateBatchCertificatePDF(batch)}
          className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs"
        >
          <Download className="w-4 h-4" />
          <span>PDF Passport</span>
        </button>
      </div>

    </div>
  );
};
