import React from 'react';
import Icon from '../../../components/AppIcon';

const AttendanceHeatmap = ({ data }) => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getIntensityClass = (value) => {
    if (value >= 90) return 'bg-success';
    if (value >= 80) return 'bg-success/70';
    if (value >= 70) return 'bg-warning/70';
    if (value >= 60) return 'bg-warning';
    if (value > 0) return 'bg-destructive/70';
    return 'bg-muted';
  };

  const getIntensityLabel = (value) => {
    if (value >= 90) return 'Excellent';
    if (value >= 80) return 'Good';
    if (value >= 70) return 'Average';
    if (value >= 60) return 'Below Average';
    if (value > 0) return 'Poor';
    return 'No Data';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center">
          <Icon name="Calendar" size={20} className="mr-2" />
          Attendance Heatmap
        </h3>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Clock" size={16} />
          <span>Academic Year 2024-25</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Month labels */}
          <div className="flex mb-2">
            <div className="w-12"></div>
            {months.map((month, index) => (
              <div key={month} className="flex-1 text-center">
                <span className="text-xs text-muted-foreground font-medium">
                  {month}
                </span>
              </div>
            ))}
          </div>

          {/* Heatmap grid */}
          {weekdays.map((day, dayIndex) => (
            <div key={day} className="flex items-center mb-1">
              <div className="w-12 text-xs text-muted-foreground font-medium">
                {day}
              </div>
              <div className="flex-1 flex space-x-1">
                {data[dayIndex]?.map((value, weekIndex) => (
                  <div
                    key={weekIndex}
                    className={`w-3 h-3 rounded-sm ${getIntensityClass(value)} cursor-pointer transition-all hover:scale-110`}
                    title={`${day}, Week ${weekIndex + 1}: ${value}% - ${getIntensityLabel(value)}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Less</span>
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-sm bg-muted" />
            <div className="w-3 h-3 rounded-sm bg-destructive/70" />
            <div className="w-3 h-3 rounded-sm bg-warning" />
            <div className="w-3 h-3 rounded-sm bg-warning/70" />
            <div className="w-3 h-3 rounded-sm bg-success/70" />
            <div className="w-3 h-3 rounded-sm bg-success" />
          </div>
          <span className="text-sm text-muted-foreground">More</span>
        </div>
        
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-sm bg-success" />
            <span>90%+</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-sm bg-warning" />
            <span>60-89%</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-sm bg-destructive/70" />
            <span>&lt;60%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceHeatmap;