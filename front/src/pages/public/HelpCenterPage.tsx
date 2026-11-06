import React from 'react';
import { MOCK_GOVT_SCHEMES } from '../../mock/schemes';
import { BookOpen, ExternalLink, HelpCircle, PhoneCall, ShieldCheck, Sparkles } from 'lucide-react';

export const HelpCenterPage: React.FC = () => {
  const tutorials = [
    { id: 1, title: 'How Farmers Create a Digital Batch', steps: ['Login with phone number & OTP', 'Click "+ New Batch"', 'Select crop, variety, quantity, and photo', 'Detect GPS harvest location', 'Print QR code label or download PDF'] },
    { id: 2, title: 'How Collection Center Managers Inspect Batches', steps: ['View incoming batches list', 'Test moisture % and measure weight', 'Assign Quality Grade A, B, or C', 'Click "Accept Batch" or "Reject with Reason"', 'Dispatch to registered distributor'] },
    { id: 3, title: 'How Consumers Trace Farm-to-Fork Origin', steps: ['Scan package QR code using phone camera', 'Or type Batch ID (e.g. FF-2026-000101)', 'View farmer profile & harvest details', 'Check interactive supply chain journey map', 'Review price transparency & download digital passport PDF'] }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
          <HelpCircle className="w-4 h-4" />
          <span>FarmFlow Knowledge Base</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100">
          Help Center & Government Schemes
        </h1>
        <p className="text-sm text-slate-500 max-w-xl mx-auto">
          Step-by-step guides for farmers, collection centers, distributors, retailers, and consumers.
        </p>
      </div>

      {/* Tutorials */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-700" />
          <span>Step-by-Step Tutorials</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tutorials.map((tut) => (
            <div key={tut.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-3">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">{tut.title}</h3>
              <ol className="space-y-2 text-xs text-slate-600 dark:text-slate-300 list-decimal list-inside font-medium">
                {tut.steps.map((st, i) => (
                  <li key={i}>{st}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>

      {/* Govt Schemes & MSP */}
      <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span>Government Schemes & MSP Rates 2026</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_GOVT_SCHEMES.map((scheme) => (
            <div key={scheme.id} className="bg-white dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 px-2.5 py-0.5 rounded-full">
                  {scheme.category}
                </span>
                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">{scheme.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">{scheme.description}</p>
                <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 font-semibold">
                  Benefit / Rate: {scheme.mspOrSubsidy}
                </div>
              </div>

              <a
                href={scheme.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline pt-2"
              >
                <span>Visit Official Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
