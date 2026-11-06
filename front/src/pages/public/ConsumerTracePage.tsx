import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { apiService } from '../../services/api';
import { Batch } from '../../types';
import { BatchStepperTimeline } from '../../components/batch/BatchStepperTimeline';
import { JourneyMap } from '../../components/maps/JourneyMap';
import { PriceBreakdownChart } from '../../components/charts/PriceBreakdownChart';
import { ComplaintModal } from '../../components/batch/ComplaintModal';
import { generateBatchCertificatePDF } from '../../utils/pdfGenerator';
import { calculateCarbonFootprint } from '../../utils/carbonCalculator';
import { formatCurrency, formatDate } from '../../utils/formatters';
import {
  ShieldCheck,
  Download,
  Star,
  Leaf,
  MapPin,
  Calendar,
  Award,
  TreePine,
  Truck,
  MessageSquare,
  QrCode,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';

export const ConsumerTracePage: React.FC = () => {
  const { batchId } = useParams<{ batchId: string }>();
  const { t, i18n } = useTranslation();
  const [batch, setBatch] = useState<Batch | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);

  useEffect(() => {
    if (batchId) {
      setLoading(true);
      apiService.getBatchById(batchId).then((data) => {
        setBatch(data);
        setLoading(false);
      });
    }
  }, [batchId]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-slate-600 font-semibold">{t('common.loading')}</p>
      </div>
    );
  }

  if (!batch) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-center space-y-4">
        <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto">
          <QrCode className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Batch Not Found</h2>
        <p className="text-xs text-slate-500">
          No agricultural batch matches ID "{batchId}". Please check the QR code or Batch ID number.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-700 text-white rounded-xl text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>
    );
  }

  const carbon = calculateCarbonFootprint(batch.carbonFootprint.distanceKm, batch.quantity);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner Verification Badge */}
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 max-w-xl z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-700/80 text-amber-300 text-xs font-extrabold tracking-wider uppercase border border-emerald-600">
            <ShieldCheck className="w-4 h-4" />
            <span>{t('trace.verified')}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight flex items-center gap-3">
            <span>{batch.crop.emoji || '🌾'}</span>
            <span>{batch.crop.name}</span>
            <span className="text-lg sm:text-2xl font-normal text-emerald-200">({batch.crop.variety})</span>
          </h1>

          <p className="text-xs sm:text-sm text-emerald-100 font-mono">
            Batch ID: <span className="font-bold text-amber-300 underline">{batch.batchId}</span> • Category: {batch.crop.category.toUpperCase()}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto z-10">
          <button
            onClick={() => generateBatchCertificatePDF(batch)}
            className="px-4 py-3 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs rounded-2xl flex items-center justify-center gap-2 shadow-md transition-all shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>{t('trace.downloadPassport')}</span>
          </button>
        </div>
      </div>

      {/* Grid Row 1: Farmer Story & Harvest Specifications */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Farmer Profile Card (1 col) */}
        <div className="bg-white dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-400 font-bold text-sm border-b border-slate-100 dark:border-slate-800 pb-3">
            <Award className="w-5 h-5 text-amber-500" />
            <h3>{t('trace.farmerStory')}</h3>
          </div>

          <div className="flex flex-col items-center text-center space-y-3">
            <img
              src={batch.farmer.avatarUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80'}
              alt={batch.farmer.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-emerald-100 shadow-md"
            />
            <div>
              <h4 className="font-bold text-base text-slate-900 dark:text-slate-100">{batch.farmer.name}</h4>
              <p className="text-xs text-slate-500 font-medium flex items-center justify-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                {batch.farmer.village}, {batch.farmer.district}, {batch.farmer.state}
              </p>
            </div>
            {batch.farmer.bio && (
              <p className="text-xs text-slate-600 dark:text-slate-300 italic bg-emerald-50/60 dark:bg-slate-800 p-3 rounded-2xl border border-emerald-100/60">
                "{batch.farmer.bio}"
              </p>
            )}
          </div>
        </div>

        {/* Harvest & Quality Specs Card (2 cols) */}
        <div className="md:col-span-2 bg-white dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
              {t('trace.harvestDetails')}
            </h3>
            {batch.organic && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 text-xs font-bold rounded-full border border-emerald-300">
                <Leaf className="w-3.5 h-3.5 fill-current" />
                100% Certified Organic
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
              <span className="text-[11px] text-slate-400 block font-medium">Harvest Date</span>
              <span className="font-bold text-slate-900 dark:text-slate-100 text-sm mt-0.5 block">{formatDate(batch.harvestDate, i18n.language)}</span>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
              <span className="text-[11px] text-slate-400 block font-medium">Volume Processed</span>
              <span className="font-bold text-slate-900 dark:text-slate-100 text-sm mt-0.5 block">{batch.quantity} {batch.unit}</span>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
              <span className="text-[11px] text-slate-400 block font-medium">Quality Grade</span>
              <span className="font-bold text-emerald-700 dark:text-emerald-400 text-sm mt-0.5 block">Grade {batch.qualityGrade} (Premium)</span>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
              <span className="text-[11px] text-slate-400 block font-medium">Moisture Level</span>
              <span className="font-bold text-slate-900 dark:text-slate-100 text-sm mt-0.5 block">{batch.moisture}% (Safe Range)</span>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
              <span className="text-[11px] text-slate-400 block font-medium">Expiry / Shelf-Life</span>
              <span className="font-bold text-slate-900 dark:text-slate-100 text-sm mt-0.5 block">{formatDate(batch.expiryDate, i18n.language)}</span>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
              <span className="text-[11px] text-slate-400 block font-medium">Retail Shelf Price</span>
              <span className="font-bold text-emerald-800 dark:text-emerald-300 text-sm mt-0.5 block">{formatCurrency(batch.pricePerUnit, i18n.language)}/{batch.unit}</span>
            </div>
          </div>

          {batch.qualityNotes && (
            <div className="p-3.5 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-100 dark:border-emerald-900 text-xs text-slate-700 dark:text-slate-300">
              <span className="font-bold text-emerald-800 dark:text-emerald-400 block mb-0.5">Inspector Quality Notes:</span>
              <p>"{batch.qualityNotes}"</p>
            </div>
          )}
        </div>

      </div>

      {/* Grid Row 2: Supply Chain Stepper Timeline */}
      <div className="bg-white dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">
              Chain of Custody & Timeline
            </h3>
            <p className="text-xs text-slate-500">Real-time digital audit trail from harvest to shelf</p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 dark:bg-slate-800 px-3 py-1 rounded-full border border-emerald-200">
            {batch.stageHistory.length} Stages Logged
          </span>
        </div>

        <BatchStepperTimeline batch={batch} />
      </div>

      {/* Grid Row 3: Interactive Journey Map */}
      <div className="bg-white dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
          {t('trace.journeyMap')}
        </h3>
        <JourneyMap stages={batch.stageHistory} height="360px" />
      </div>

      {/* Grid Row 4: Fair-Price Transparency & Carbon Miles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Fair Price Breakdown (Pie Chart) */}
        <div className="bg-white dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
              {t('trace.priceBreakdown')}
            </h3>
            <span className="text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
              Fair Trade Verified
            </span>
          </div>

          <PriceBreakdownChart
            farmerShare={batch.costBreakdown?.farmerSharePercent || 64}
            logisticsMargin={batch.costBreakdown?.logisticsPercent || 16}
            retailerMargin={batch.costBreakdown?.retailerMarginPercent || 20}
          />

          <p className="text-xs text-slate-500 text-center italic">
            Farmer receives {batch.costBreakdown?.farmerSharePercent || 64}% of the final retail price, ensuring direct farm income.
          </p>
        </div>

        {/* Carbon Footprint & Food Miles Card */}
        <div className="bg-white dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <TreePine className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
              {t('trace.carbonBadge')}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 text-center">
              <span className="text-2xl font-black text-emerald-800 dark:text-emerald-300 block">{carbon.foodMiles} km</span>
              <span className="text-xs text-slate-500 font-medium">Transport Distance</span>
            </div>

            <div className="p-4 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-800 text-center">
              <span className="text-2xl font-black text-amber-800 dark:text-amber-300 block">-{carbon.co2SavedKg} kg</span>
              <span className="text-xs text-slate-500 font-medium">CO2 Saved vs Baseline</span>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300">
            <Truck className="w-6 h-6 text-emerald-600 shrink-0" />
            <span>Efficient cold-chain routing reduced emissions equivalent to planting <strong>{carbon.treesEquivalent} trees</strong>!</span>
          </div>
        </div>

      </div>

      {/* Grid Row 5: Consumer Ratings & Feedback Action */}
      <div className="bg-white dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
            Have you purchased this batch?
          </h3>
          <p className="text-xs text-slate-500">
            Rate crop freshness or submit feedback directly to the producer and FarmFlow board.
          </p>
        </div>

        <button
          onClick={() => setIsRatingModalOpen(true)}
          className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-2xl flex items-center gap-2 shadow-xs shrink-0 transition-colors"
        >
          <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
          <span>{t('trace.rateProduct')}</span>
        </button>
      </div>

      {/* Rating & Complaint Modal */}
      <ComplaintModal
        isOpen={isRatingModalOpen}
        onClose={() => setIsRatingModalOpen(false)}
        onSubmit={(rating, comment, location) => {
          apiService.addBatchRating(batch.batchId, rating, comment, location);
        }}
        batchId={batch.batchId}
      />

    </div>
  );
};
