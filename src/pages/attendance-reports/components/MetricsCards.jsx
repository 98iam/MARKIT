import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCards = ({ metrics }) => {
  const cards = [
    {
      title: 'Overall Attendance',
      value: `${metrics.overallAttendance}%`,
      change: metrics.attendanceChange,
      icon: 'Users',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Total Students',
      value: metrics.totalStudents,
      change: metrics.studentChange,
      icon: 'GraduationCap',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Classes Conducted',
      value: metrics.classesHeld,
      change: metrics.classChange,
      icon: 'Calendar',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      title: 'Low Attendance Alerts',
      value: metrics.lowAttendanceAlerts,
      change: metrics.alertChange,
      icon: 'AlertTriangle',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  const getChangeIcon = (change) => {
    if (change > 0) return 'TrendingUp';
    if (change < 0) return 'TrendingDown';
    return 'Minus';
  };

  const getChangeColor = (change) => {
    if (change > 0) return 'text-success';
    if (change < 0) return 'text-destructive';
    return 'text-muted-foreground';
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-card rounded-lg border border-border p-6 shadow-card hover:shadow-interactive transition-shadow animate-hover"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg ${card.bgColor} flex items-center justify-center`}>
              <Icon name={card.icon} size={24} className={card.color} />
            </div>
            <div className={`flex items-center space-x-1 ${getChangeColor(card.change)}`}>
              <Icon name={getChangeIcon(card.change)} size={16} />
              <span className="text-sm font-medium">
                {Math.abs(card.change)}%
              </span>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-1">
              {card.value}
            </h3>
            <p className="text-sm text-muted-foreground">
              {card.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsCards;