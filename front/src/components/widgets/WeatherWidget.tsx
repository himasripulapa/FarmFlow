import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { apiService } from '../../services/api';
import { WeatherInfo } from '../../types';
import { CloudSun, Droplets, Wind, MapPin, AlertCircle } from 'lucide-react';

export const WeatherWidget: React.FC = () => {
  const { t } = useTranslation();
  const [weather, setWeather] = useState<WeatherInfo | null>(null);

  useEffect(() => {
    apiService.getWeather().then(setWeather);
  }, []);

  if (!weather) return null;

  return (
    <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 text-white rounded-3xl p-5 shadow-md relative overflow-hidden space-y-4">
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="flex items-center justify-between border-b border-emerald-700/60 pb-3">
        <div className="flex items-center gap-2">
          <CloudSun className="w-6 h-6 text-amber-300" />
          <h3 className="font-bold text-sm tracking-tight">{t('dashboard.weatherTitle')}</h3>
        </div>
        <span className="text-[11px] text-emerald-200 flex items-center gap-1">
          <MapPin className="w-3 h-3 text-amber-300" />
          {weather.location}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <span className="text-4xl font-black tracking-tight">{weather.tempC}°C</span>
          <p className="text-xs text-emerald-200 mt-0.5">{weather.condition}</p>
        </div>

        <div className="space-y-1 text-xs text-emerald-100 text-right">
          <div className="flex items-center justify-end gap-1">
            <Droplets className="w-3.5 h-3.5 text-sky-300" />
            <span>Humidity: {weather.humidity}%</span>
          </div>
          <div className="flex items-center justify-end gap-1">
            <Wind className="w-3.5 h-3.5 text-sky-300" />
            <span>Wind: {weather.windSpeedKm} km/h</span>
          </div>
        </div>
      </div>

      <div className="bg-emerald-900/80 border border-emerald-700/80 p-3 rounded-2xl text-xs space-y-1">
        <div className="flex items-center gap-1.5 font-bold text-amber-300">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Farming Weather Advisory</span>
        </div>
        <p className="text-emerald-100 leading-relaxed text-[11px]">
          {weather.advisory}
        </p>
      </div>
    </div>
  );
};
