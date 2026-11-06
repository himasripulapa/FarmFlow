import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from 'recharts';

const DEFAULT_CROPS = [
  { name: 'Chilli', value: 35, color: '#E53935' },
  { name: 'Paddy / Rice', value: 25, color: '#43A047' },
  { name: 'Mango', value: 15, color: '#FB8C00' },
  { name: 'Turmeric', value: 12, color: '#FDD835' },
  { name: 'Groundnut', value: 8, color: '#8D6E63' },
  { name: 'Others', value: 5, color: '#78909C' }
];

export const CropDonutChart: React.FC = () => {
  return (
    <div className="w-full h-64 sm:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={DEFAULT_CROPS}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
            dataKey="value"
          >
            {DEFAULT_CROPS.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
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
