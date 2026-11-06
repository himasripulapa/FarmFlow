import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from 'recharts';
import { useTranslation } from 'react-i18next';

interface PriceBreakdownChartProps {
  farmerShare?: number; // e.g. 64%
  logisticsMargin?: number; // e.g. 16%
  retailerMargin?: number; // e.g. 20%
}

export const PriceBreakdownChart: React.FC<PriceBreakdownChartProps> = ({
  farmerShare = 64,
  logisticsMargin = 16,
  retailerMargin = 20
}) => {
  const { t } = useTranslation();

  const data = [
    { name: t('trace.farmerShare'), value: farmerShare, color: '#2E7D32' },
    { name: t('trace.logisticsMargin'), value: logisticsMargin, color: '#F9A825' },
    { name: t('trace.retailerMargin'), value: retailerMargin, color: '#1565C0' }
  ];

  return (
    <div className="w-full h-56">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={75}
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(val: any) => [`${val}%`, 'Share']}
            contentStyle={{
              backgroundColor: '#0f172a',
              borderColor: '#334155',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '12px'
            }}
          />
          <Legend verticalAlign="bottom" height={36} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
