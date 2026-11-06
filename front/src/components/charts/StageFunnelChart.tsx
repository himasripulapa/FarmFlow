import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';

interface StageFunnelChartProps {
  data?: { stage: string; count: number }[];
}

const DEFAULT_DATA = [
  { stage: 'Harvested', count: 42 },
  { stage: 'Quality Checked', count: 38 },
  { stage: 'Collection Center', count: 32 },
  { stage: 'In Transit', count: 26 },
  { stage: 'At Distributor', count: 22 },
  { stage: 'At Retailer', count: 18 },
  { stage: 'Sold', count: 15 }
];

const COLORS = ['#2E7D32', '#388E3C', '#4CAF50', '#F9A825', '#F57F17', '#1976D2', '#00796B'];

export const StageFunnelChart: React.FC<StageFunnelChartProps> = ({ data = DEFAULT_DATA }) => {
  return (
    <div className="w-full h-64 sm:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
          <XAxis type="number" stroke="#94a3b8" fontSize={12} />
          <YAxis dataKey="stage" type="category" stroke="#94a3b8" fontSize={11} width={110} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0f172a',
              borderColor: '#334155',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '12px'
            }}
          />
          <Bar dataKey="count" radius={[0, 8, 8, 0]}>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
