import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Logo } from '../../components/branding/Logo';
import { VoiceInputButton } from '../../components/ui/VoiceInputButton';
import { MandiPricesWidget } from '../../components/widgets/MandiPricesWidget';
import { useAuthStore } from '../../store/useAuthStore';
import { UserRole } from '../../types';
import {
  Search,
  QrCode,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Sprout,
  Truck,
  Building2,
  Store,
  CheckCircle2,
  Lock,
  Globe2,
  FileCheck
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [searchId, setSearchId] = useState('');

  const handleTrace = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchId.trim()) {
      navigate(`/trace/${searchId.trim()}`);
    }
  };

  const demoRoles: { role: UserRole; title: string; desc: string; icon: any; color: string }[] = [
    { role: 'farmer', title: 'Farmer Portal', desc: 'Create crop batches, generate QR stickers, check live Mandi rates & earnings', icon: Sprout, color: 'bg-emerald-600' },
    { role: 'collectionCenter', title: 'Collection Center', desc: 'Inspect quality, record moisture %, grade A/B/C, and dispatch', icon: Building2, color: 'bg-amber-500' },
    { role: 'distributor', title: 'Distributor Logistics', desc: 'Manage refrigerated transit trucks, driver routes & retailer delivery', icon: Truck, color: 'bg-blue-600' },
    { role: 'retailer', title: 'Retail Store', desc: 'Shelf stock management, near-expiry alerts & consumer QR labels', icon: Store, color: 'bg-purple-600' },
    { role: 'admin', title: 'Admin Oversight', desc: 'System-wide analytics, user approval, CSV export & audit logs', icon: ShieldCheck, color: 'bg-slate-700' },
    { role: 'consumer', title: 'Public Consumer', desc: 'Scan QR code or enter Batch ID to trace farm-to-fork origin', icon: QrCode, color: 'bg-emerald-800' }
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-950 to-slate-950 text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8 rounded-b-3xl">
        
        {/* Soft background accents */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-800/80 border border-emerald-700 text-xs font-bold text-amber-300 shadow-inner">
            <Sparkles className="w-4 h-4" />
            <span>Digital Agricultural Traceability Ledger</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
              {t('app.tagline')}
            </h1>
            <p className="text-base sm:text-xl text-emerald-100 max-w-2xl mx-auto font-normal leading-relaxed">
              {t('app.subTagline')}
            </p>
          </div>

          {/* Trace a Product Box */}
          <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-3 sm:p-4 rounded-3xl shadow-2xl border border-emerald-400/30 max-w-2xl mx-auto">
            <form onSubmit={handleTrace} className="flex items-center gap-2">
              <div className="relative flex-1 flex items-center">
                <Search className="w-5 h-5 text-emerald-700 absolute left-3.5" />
                <input
                  type="text"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  placeholder="Enter Batch ID (e.g. FF-2026-000101)..."
                  className="w-full pl-11 pr-12 py-3.5 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 rounded-2xl text-sm sm:text-base font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
                <div className="absolute right-2">
                  <VoiceInputButton onResult={(text) => setSearchId(text)} />
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl font-bold text-sm sm:text-base shadow-md transition-all shrink-0 flex items-center gap-2"
              >
                <span>Trace</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="flex items-center justify-between pt-3 px-2 text-xs text-slate-500 font-medium">
              <span>Try sample: <button onClick={() => setSearchId('FF-2026-000101')} className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline">FF-2026-000101</button> (Organic Chilli)</span>
              <Link to="/trace/FF-2026-000101" className="text-amber-600 font-bold hover:underline flex items-center gap-1">
                <QrCode className="w-3.5 h-3.5" /> Scan QR
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 6-Stage Supply Chain Workflow Illustration */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
            6-Stage Verified Farm-to-Fork Journey
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Every batch of produce is verified cryptographically at each stage, giving consumers 100% confidence.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { step: '01', title: 'Farmer Origin', desc: 'GPS location & harvest date', icon: Sprout },
            { step: '02', title: 'Harvesting', desc: 'Yield quantity & crop variety', icon: CheckCircle2 },
            { step: '03', title: 'Collection Center', desc: 'Lab moisture & Grade A/B/C', icon: Building2 },
            { step: '04', title: 'Distributor Transit', desc: 'Refrigerated vehicle tracking', icon: Truck },
            { step: '05', title: 'Retailer Shelf', desc: 'Consumer QR stickers', icon: Store },
            { step: '06', title: 'Consumer Fork', desc: 'Trace origin & fair prices', icon: FileCheck }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.step} className="bg-white dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 rounded-3xl p-5 text-center space-y-3 shadow-xs hover:border-emerald-400 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center mx-auto font-black text-lg">
                  <Icon className="w-6 h-6 text-emerald-700" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold text-amber-600 uppercase tracking-widest">Step {item.step}</span>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 mt-0.5">{item.title}</h3>
                  <p className="text-[11px] text-slate-500 mt-1">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Live Mandi Prices Widget */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MandiPricesWidget />
      </section>

      {/* Role Preview Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
            Explore Demo Dashboards by Role
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Click any role card below to preview FarmFlow's tailored features for that user.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demoRoles.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.role}
                onClick={() => {
                  if (r.role === 'consumer') {
                    navigate('/search');
                  } else if (isAuthenticated) {
                    navigate('/dashboard');
                  } else {
                    navigate('/login');
                  }
                }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-emerald-500 transition-all cursor-pointer group flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className={`w-12 h-12 rounded-2xl ${r.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 group-hover:text-emerald-700 transition-colors">
                      {r.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {r.desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 group-hover:underline">
                  <span>Enter {r.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
