import React from 'react';
import Icon from '../../../components/AppIcon';

const AttendanceCard = ({ title, value, subtitle, icon, color, trend }) => {
  return (
    <div className="bg-card p-6 rounded-lg border border-border shadow-card hover:shadow-interactive transition-all animate-hover">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon name={icon} size={24} color="white" />
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 text-sm ${
            trend.type === 'up' ? 'text-success' : 'text-destructive'
          }`}>
            <Icon name={trend.type === 'up' ? 'TrendingUp' : 'TrendingDown'} size={16} />
            <span>{trend.value}%</span>
          </div>
        )}
      </div>
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-1">{value}</h3>
        <p className="text-sm text-muted-foreground">{title}</p>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default AttendanceCard;