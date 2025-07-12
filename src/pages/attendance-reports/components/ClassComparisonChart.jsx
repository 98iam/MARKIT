import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const ClassComparisonChart = ({ data }) => {
  const colors = [
    'var(--color-primary)',
    'var(--color-accent)',
    'var(--color-warning)',
    'var(--color-success)',
    'var(--color-secondary)'
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-modal">
          <p className="text-sm font-medium text-foreground mb-1">{label}</p>
          <p className="text-sm text-muted-foreground">
            Attendance: {payload[0].value}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center">
          <Icon name="BarChart2" size={20} className="mr-2" />
          Class-wise Comparison
        </h3>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Info" size={16} />
          <span>Last 30 days</span>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="className" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              domain={[0, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="attendance" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {data.map((item, index) => (
          <div key={item.className} className="text-center">
            <div
              className="w-4 h-4 rounded mx-auto mb-1"
              style={{ backgroundColor: colors[index % colors.length] }}
            />
            <p className="text-xs text-muted-foreground truncate">
              {item.className}
            </p>
            <p className="text-sm font-medium text-foreground">
              {item.attendance}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassComparisonChart;