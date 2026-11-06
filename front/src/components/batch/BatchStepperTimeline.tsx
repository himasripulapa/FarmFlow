import React from 'react';
import { useTranslation } from 'react-i18next';
import { Batch, StageName } from '../../types';
import { CheckCircle2, Clock, MapPin, User, AlertCircle } from 'lucide-react';

interface BatchStepperTimelineProps {
  batch: Batch;
}

const STAGES_ORDER: { stage: StageName; labelKey: string }[] = [
  { stage: 'farmer', labelKey: 'stages.farmer' },
  { stage: 'harvest', labelKey: 'stages.harvest' },
  { stage: 'collectionCenter', labelKey: 'stages.collectionCenter' },
  { stage: 'distributor', labelKey: 'stages.distributor' },
  { stage: 'retailer', labelKey: 'stages.retailer' },
  { stage: 'consumer', labelKey: 'stages.consumer' }
];

export const BatchStepperTimeline: React.FC<BatchStepperTimelineProps> = ({ batch }) => {
  const { t } = useTranslation();

  const getStageHistoryItem = (stage: StageName) => {
    return batch.stageHistory.find(s => s.stage === stage);
  };

  const getStageState = (stage: StageName, idx: number) => {
    const historyItem = getStageHistoryItem(stage);
    if (historyItem) {
      return { status: 'completed', data: historyItem };
    }
    
    // Check if current status maps here
    const statusMap: Record<string, number> = {
      Created: 0,
      Harvested: 1,
      'Quality Checked': 2,
      'At Collection Center': 2,
      'In Transit': 3,
      'At Distributor': 3,
      'At Retailer': 4,
      Sold: 5
    };

    const currentIdx = statusMap[batch.status] ?? 1;

    if (idx === currentIdx) return { status: 'current', data: null };
    if (idx < currentIdx) return { status: 'completed', data: null };
    return { status: 'upcoming', data: null };
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Horizontal Stepper for Desktop */}
      <div className="hidden md:flex items-center justify-between relative">
        <div className="absolute top-5 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-800 -z-0"></div>
        {STAGES_ORDER.map(({ stage, labelKey }, idx) => {
          const { status, data } = getStageState(stage, idx);

          const isCompleted = status === 'completed';
          const isCurrent = status === 'current';

          return (
            <div key={stage} className="flex flex-col items-center relative z-10 text-center max-w-[120px]">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  isCompleted
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200 ring-4 ring-emerald-100 dark:ring-emerald-950'
                    : isCurrent
                    ? 'bg-amber-500 text-white animate-pulse ring-4 ring-amber-100 dark:ring-amber-950'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-300 dark:border-slate-700'
                }`}
              >
                {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
              </div>

              <span className={`text-xs mt-2 font-bold ${
                isCompleted ? 'text-emerald-800 dark:text-emerald-400' : isCurrent ? 'text-amber-600' : 'text-slate-400'
              }`}>
                {t(labelKey)}
              </span>

              {data && (
                <span className="text-[10px] text-slate-400 mt-0.5">
                  {new Date(data.timestamp).toLocaleDateString()}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Vertical Timeline Stepper for Mobile & Detailed List */}
      <div className="space-y-4 relative border-l-2 border-emerald-200 dark:border-slate-800 ml-4 pl-6 pt-2">
        {STAGES_ORDER.map(({ stage, labelKey }, idx) => {
          const { status, data } = getStageState(stage, idx);
          const isCompleted = status === 'completed';
          const isCurrent = status === 'current';

          return (
            <div key={stage} className="relative group">
              {/* Timeline Bullet Point */}
              <div
                className={`absolute -left-[31px] top-1.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  isCompleted
                    ? 'bg-emerald-600 text-white ring-4 ring-emerald-100 dark:ring-emerald-950'
                    : isCurrent
                    ? 'bg-amber-500 text-white animate-pulse ring-4 ring-amber-100 dark:ring-amber-950'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                }`}
              >
                {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
              </div>

              {/* Stage Card Container */}
              <div className={`p-4 rounded-2xl border transition-all ${
                isCompleted
                  ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50'
                  : isCurrent
                  ? 'bg-amber-50/60 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800 shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 opacity-60'
              }`}>
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    {t(labelKey)}
                  </h4>
                  <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                    isCompleted
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
                      : isCurrent
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
                      : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                  }`}>
                    {isCompleted ? 'Completed' : isCurrent ? 'In Progress' : 'Upcoming'}
                  </span>
                </div>

                {data && (
                  <div className="mt-2.5 pt-2.5 border-t border-slate-200/60 dark:border-slate-800 space-y-1 text-xs text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-semibold">
                      <User className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{data.handlerName} ({data.handlerRole})</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-amber-600" />
                      <span>{data.location.name}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{new Date(data.timestamp).toLocaleString()}</span>
                    </div>

                    {data.notes && (
                      <p className="bg-white/80 dark:bg-slate-900/60 p-2 rounded-xl text-slate-700 dark:text-slate-300 italic mt-1.5 text-[11px]">
                        "{data.notes}"
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
