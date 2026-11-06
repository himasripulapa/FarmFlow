import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

const DEFAULT_TREND = [
  { month: 'Apr', volume: 120 },
  { month: 'May', volume: 180 },
  { month: 'Jun', volume: 240 },
  { month: 'Jul', volume: 310 },
  { month: 'Aug', volume: 450 },
  { month: 'Sep', volume: 620 },
  { month: 'Oct', volume: 780 }
];

export const QuantityTrendChart: React.FC = () => {
  return (
    <div className="w-full h-64 sm:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={DEFAULT_TREND} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2E7D32" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#2E7D32" stopOpacity={0.0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
          <YAxis stroke="#94a3b8" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0f172a',
              borderColor: '#334155',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '12px'
            }}
          />
          <Area type="monotone" dataKey="volume" stroke="#2E7D32" strokeWidth={3} fillOpacity={1} fill="url(#colorVolume)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
