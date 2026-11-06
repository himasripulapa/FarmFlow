import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../branding/Logo';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Heart, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-24 lg:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Logo size="md" showText={true} />
            <p className="text-xs text-slate-400 leading-relaxed">
              {t('app.subTagline')}
            </p>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Verifiable Digital Passports</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-slate-100 text-sm mb-3">Supply Chain Roles</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/login" className="hover:text-emerald-400 transition-colors">Farmer Dashboard</Link></li>
              <li><Link to="/login" className="hover:text-emerald-400 transition-colors">Collection Center Portal</Link></li>
              <li><Link to="/login" className="hover:text-emerald-400 transition-colors">Distributor Logistics</Link></li>
              <li><Link to="/login" className="hover:text-emerald-400 transition-colors">Retailer Shelf Management</Link></li>
              <li><Link to="/trace/FF-2026-000101" className="hover:text-emerald-400 transition-colors">Public Product Trace</Link></li>
            </ul>
          </div>

          {/* Value Features */}
          <div>
            <h4 className="font-bold text-slate-100 text-sm mb-3">Platform Features</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/search" className="hover:text-emerald-400 transition-colors">Global Search & Voice Input</Link></li>
              <li><Link to="/shared/transactions" className="hover:text-emerald-400 transition-colors">Transaction Ledger & CSV Export</Link></li>
              <li><Link to="/help" className="hover:text-emerald-400 transition-colors">Government Schemes & MSP Rates</Link></li>
              <li><Link to="/help" className="hover:text-emerald-400 transition-colors">Help Center & Step-by-Step Tutorials</Link></li>
            </ul>
          </div>

          {/* Official Agri Portals */}
          <div>
            <h4 className="font-bold text-slate-100 text-sm mb-3">Govt & Mandi Portals</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="https://pmkisan.gov.in" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1">PM-KISAN Portal <ExternalLink className="w-3 h-3" /></a></li>
              <li><a href="https://enam.gov.in" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1">e-NAM Mandi Network <ExternalLink className="w-3 h-3" /></a></li>
              <li><a href="https://agricoop.nic.in" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1">Min. of Agriculture India <ExternalLink className="w-3 h-3" /></a></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 FarmFlow System. All rights reserved. {t('app.tagline')}</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Indian Farmers & Consumers
          </p>
        </div>

      </div>
    </footer>
  );
};
