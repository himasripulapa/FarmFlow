import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useBatchStore } from '../../store/useBatchStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useGeolocation } from '../../hooks/useGeolocation';
import { BatchPrintLabel } from '../../components/batch/BatchPrintLabel';
import { Batch, CropCategory } from '../../types';
import {
  MapPin,
  Camera,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Leaf,
  Sparkles,
  QrCode
} from 'lucide-react';

const CROP_OPTIONS = [
  { name: 'Chilli', emoji: '🌶️', category: 'spice' as CropCategory, varieties: ['Guntur Sannam S4', 'Byadagi Special', 'Teja Hot'] },
  { name: 'Rice', emoji: '🌾', category: 'grain' as CropCategory, varieties: ['Sona Masoori Organic', 'BPT 5204 Samba', 'Basmati 1121'] },
  { name: 'Paddy', emoji: '🌾', category: 'grain' as CropCategory, varieties: ['Super Fine Paddy', 'MTU 1010'] },
  { name: 'Mango', emoji: '🥭', category: 'fruit' as CropCategory, varieties: ['Alphonso Premium', 'Banganapalli', 'Totapuri'] },
  { name: 'Tomato', emoji: '🍅', category: 'vegetable' as CropCategory, varieties: ['Roma Red Hybrid', 'Heirloom Organic', 'Cherry Tomato'] },
  { name: 'Turmeric', emoji: '🟡', category: 'spice' as CropCategory, varieties: ['Salem Golden Finger', 'Nizamabad Special'] },
  { name: 'Banana', emoji: '🍌', category: 'fruit' as CropCategory, varieties: ['Nendran Organic', 'Grand Naine', 'Cavendish'] },
  { name: 'Groundnut', emoji: '🥜', category: 'oilseed' as CropCategory, varieties: ['Kadiri-6 Bold', 'JL-24 Pod'] },
  { name: 'Cotton', emoji: '☁️', category: 'cash crop' as CropCategory, varieties: ['Bt Cotton Long Staple', 'DCH-32'] },
  { name: 'Coconut', emoji: '🥥', category: 'fruit' as CropCategory, varieties: ['Tender Green Coconut', 'West Coast Tall'] }
];

export const CreateBatchPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { currentUser } = useAuthStore();
  const { createNewBatch } = useBatchStore();
  const { location: geoLoc, loading: geoLoading, detectLocation } = useGeolocation();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedCrop, setSelectedCrop] = useState(CROP_OPTIONS[0]);
  const [variety, setVariety] = useState(CROP_OPTIONS[0].varieties[0]);
  const [quantity, setQuantity] = useState<number>(1500);
  const [unit, setUnit] = useState<'kg' | 'quintal' | 'tonne'>('kg');
  const [harvestDate, setHarvestDate] = useState(new Date().toISOString().split('T')[0]);
  const [qualityGrade, setQualityGrade] = useState<'A' | 'B' | 'C'>('A');
  const [qualityNotes, setQualityNotes] = useState('High quality organic harvest.');
  const [pricePerUnit, setPricePerUnit] = useState<number>(185);
  const [organic, setOrganic] = useState(true);
  const [moisture, setMoisture] = useState(9.2);
  const [expiryDays, setExpiryDays] = useState(365);
  const [photoUrl, setPhotoUrl] = useState('https://images.unsplash.com/photo-1588252303782-7ee958478440?auto=format&fit=crop&w=600&q=80');

  const [createdBatchResult, setCreatedBatchResult] = useState<Batch | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDetectGPS = async () => {
    await detectLocation();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const expiryDateObj = new Date();
    expiryDateObj.setDate(expiryDateObj.getDate() + expiryDays);

    const locPoint = geoLoc || {
      name: `${currentUser?.village || 'Guntur'}, ${currentUser?.district || 'Guntur'}`,
      lat: 16.3067,
      lng: 80.4365
    };

    try {
      const batchData = {
        crop: {
          name: selectedCrop.name,
          variety,
          category: selectedCrop.category,
          emoji: selectedCrop.emoji
        },
        farmer: {
          id: currentUser?.id || 'FARM-101',
          name: currentUser?.name || 'Swathi',
          village: currentUser?.village || 'Guntur Rural',
          district: currentUser?.district || 'Guntur',
          state: currentUser?.state || 'Andhra Pradesh',
          phone: currentUser?.phone || '9848012345',
          avatarUrl: currentUser?.avatarUrl
        },
        harvestDate,
        quantity,
        unit,
        qualityGrade,
        qualityNotes,
        photoUrl,
        currentLocation: locPoint,
        status: 'Harvested' as const,
        pricePerUnit,
        organic,
        moisture,
        expiryDate: expiryDateObj.toISOString().split('T')[0]
      };

      const result = await createNewBatch(batchData);
      setCreatedBatchResult(result);
      setStep(3);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link to="/farmer/my-batches" className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Batches</span>
        </Link>
        <span className="text-xs font-extrabold uppercase bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
          Step {step} of 3
        </span>
      </div>

      {step === 3 && createdBatchResult ? (
        /* Success & Printable QR Label Screen */
        <div className="bg-white dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl text-center space-y-6 animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">
              Batch Successfully Created & Logged!
            </h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Your harvest batch ID <strong className="text-emerald-700">{createdBatchResult.batchId}</strong> has been registered onto the FarmFlow digital ledger.
            </p>
          </div>

          {/* Printable Label Component */}
          <div className="flex justify-center pt-2">
            <BatchPrintLabel batch={createdBatchResult} />
          </div>

          <div className="flex justify-center gap-3 pt-4">
            <button
              onClick={() => {
                setStep(1);
                setCreatedBatchResult(null);
              }}
              className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
            >
              + Create Another Batch
            </button>

            <Link
              to={`/trace/${createdBatchResult.batchId}`}
              className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md"
            >
              View Full Batch Timeline
            </Link>
          </div>
        </div>
      ) : (
        /* Multi-Step Creation Form */
        <div className="bg-white dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">
              Create New Harvest Batch
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Enter harvest specifications to generate a verified QR code sticker for your produce.
            </p>
          </div>

          {step === 1 ? (
            /* STEP 1: Crop Selection & Variety */
            <div className="space-y-6">
              
              <div className="space-y-2">
                <label className="text-xs font-extrabold uppercase text-slate-600 dark:text-slate-300">
                  1. Select Crop Type:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {CROP_OPTIONS.map((c) => {
                    const isSelected = selectedCrop.name === c.name;
                    return (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => {
                          setSelectedCrop(c);
                          setVariety(c.varieties[0]);
                        }}
                        className={`p-4 rounded-2xl border-2 text-left flex items-center gap-3 transition-all min-h-[64px] ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-sm font-bold dark:bg-emerald-950 dark:text-emerald-100'
                            : 'border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:bg-slate-800'
                        }`}
                      >
                        <span className="text-3xl">{c.emoji}</span>
                        <div>
                          <span className="text-sm font-bold block">{c.name}</span>
                          <span className="text-[10px] text-slate-400 capitalize">{c.category}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Variety Dropdown */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Crop Variety / Seed Hybrid
                </label>
                <select
                  value={variety}
                  onChange={(e) => setVariety(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-slate-800"
                >
                  {selectedCrop.varieties.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>

              {/* Organic Toggle */}
              <div className="flex items-center justify-between p-4 bg-emerald-50 dark:bg-slate-800/60 rounded-2xl border border-emerald-200 dark:border-slate-700">
                <div className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-emerald-600" />
                  <div>
                    <span className="text-sm font-bold text-slate-900 dark:text-slate-100 block">
                      100% Certified Organic Produce
                    </span>
                    <span className="text-xs text-slate-500">Natural fertilizers, zero synthetic pesticides</span>
                  </div>
                </div>

                <input
                  type="checkbox"
                  checked={organic}
                  onChange={(e) => setOrganic(e.target.checked)}
                  className="w-6 h-6 rounded-lg text-emerald-600 focus:ring-emerald-500 accent-emerald-700"
                />
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Continue to Step 2 (Quantity & Location)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          ) : (
            /* STEP 2: Quantity, Location & Quality */
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Harvest Quantity</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(+e.target.value)}
                    required
                    min={1}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-slate-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Measurement Unit</label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value as any)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-slate-800"
                  >
                    <option value="kg">Kilograms (kg)</option>
                    <option value="quintal">Quintal (100 kg)</option>
                    <option value="tonne">Tonne (1,000 kg)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Harvest Date</label>
                  <input
                    type="date"
                    value={harvestDate}
                    onChange={(e) => setHarvestDate(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-slate-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Expected Price per Unit (₹)</label>
                  <input
                    type="number"
                    value={pricePerUnit}
                    onChange={(e) => setPricePerUnit(+e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-slate-800"
                  />
                </div>
              </div>

              {/* Location Detection */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-amber-500" />
                    GPS Farm Location
                  </span>
                  <button
                    type="button"
                    onClick={handleDetectGPS}
                    disabled={geoLoading}
                    className="px-3 py-1.5 bg-emerald-100 text-emerald-800 hover:bg-emerald-200 text-xs font-bold rounded-lg transition-colors"
                  >
                    {geoLoading ? 'Detecting...' : 'Detect GPS Location'}
                  </button>
                </div>

                <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                  {geoLoc ? geoLoc.name : `${currentUser?.village || 'Guntur'}, ${currentUser?.district || 'Guntur'}`}
                </p>
              </div>

              {/* Quality Grade & Moisture */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Quality Grade</label>
                  <select
                    value={qualityGrade}
                    onChange={(e) => setQualityGrade(e.target.value as any)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-slate-800"
                  >
                    <option value="A">Grade A (Premium Export Quality)</option>
                    <option value="B">Grade B (Standard Commercial)</option>
                    <option value="C">Grade C (Local Processing)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Moisture Level (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={moisture}
                    onChange={(e) => setMoisture(+e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl"
                >
                  Previous
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-xl shadow-md transition-colors"
                >
                  {isSubmitting ? 'Generating Digital QR Batch...' : 'Generate Batch & QR Label'}
                </button>
              </div>

            </form>
          )}

        </div>
      )}

    </div>
  );
};
