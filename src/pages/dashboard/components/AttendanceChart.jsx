import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';


const AttendanceChart = () => {
  const weeklyData = [];
  const monthlyData = [];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-modal">
          <p className="text-sm font-medium text-foreground">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value}%`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const EmptyChartState = ({ title }) => (
    <div className="h-64 flex items-center justify-center">
      <div className="text-center">
        <Icon name="BarChart3" size={48} className="text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">{title}</p>
        <p className="text-sm text-muted-foreground mt-2">Data will appear here once attendance is marked</p>
      </div>
    </div>
  );

  return (
    <div className="bg-card p-6 rounded-lg border border-border shadow-card">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Attendance Trends</h3>
        <p className="text-sm text-muted-foreground">Weekly and monthly attendance patterns</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Attendance */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-4">This Week</h4>
          {weeklyData.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis 
                    dataKey="day" 
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                    domain={[70, 100]}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="attendance" 
                    stroke="var(--color-primary)" 
                    strokeWidth={2}
                    dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="var(--color-muted-foreground)" 
                    strokeWidth={1}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <EmptyChartState title="No weekly data available" />
          )}
        </div>

        {/* Monthly Attendance */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-4">Monthly Overview</h4>
          {monthlyData.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis 
                    dataKey="month" 
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                    domain={[70, 100]}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="attendance" 
                    fill="var(--color-primary)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <EmptyChartState title="No monthly data available" />
          )}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-muted-foreground">Weekly Average</p>
            <p className="text-lg font-semibold text-foreground">--</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Monthly Average</p>
            <p className="text-lg font-semibold text-foreground">--</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Target Achievement</p>
            <p className="text-lg font-semibold text-muted-foreground">--</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceChart;