import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { apiService } from '../../services/api';
import { MandiPrice } from '../../types';
import { TrendingUp, TrendingDown, Minus, Store } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export const MandiPricesWidget: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [prices, setPrices] = useState<MandiPrice[]>([]);

  useEffect(() => {
    apiService.getMandiPrices().then(setPrices);
  }, []);

  return (
    <div className="bg-white dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 rounded-3xl p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Store className="w-5 h-5 text-amber-500" />
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
            {t('dashboard.mandiRates')}
          </h3>
        </div>
        <span className="text-[10px] font-bold bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200 px-2.5 py-0.5 rounded-full">
          Live Updates
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {prices.slice(0, 6).map((item) => {
          const isUp = item.trend === 'up';
          const isDown = item.trend === 'down';

          return (
            <div
              key={item.id}
              className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between"
            >
              <div>
                <span className="font-bold text-slate-900 dark:text-slate-100 text-xs block">
                  {item.crop} ({item.mandi})
                </span>
                <span className="text-[10px] text-slate-400">{item.state}</span>
              </div>

              <div className="text-right">
                <span className="font-bold text-sm text-slate-900 dark:text-slate-100 block">
                  {formatCurrency(item.pricePerQuintal, i18n.language)}
                </span>
                <div
                  className={`inline-flex items-center text-[10px] font-extrabold ${
                    isUp ? 'text-emerald-600' : isDown ? 'text-rose-600' : 'text-slate-500'
                  }`}
                >
                  {isUp && <TrendingUp className="w-3 h-3 mr-0.5" />}
                  {isDown && <TrendingDown className="w-3 h-3 mr-0.5" />}
                  {!isUp && !isDown && <Minus className="w-3 h-3 mr-0.5" />}
                  <span>{item.changePercent > 0 ? `+${item.changePercent}` : item.changePercent}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
