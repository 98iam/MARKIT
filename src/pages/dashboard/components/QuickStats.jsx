import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStats = () => {
  const classStats = [];

  const getStatusColor = (status) => {
    switch (status) {
      case 'high':
        return 'bg-success text-success-foreground';
      case 'medium':
        return 'bg-warning text-warning-foreground';
      case 'low':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getProgressColor = (status) => {
    switch (status) {
      case 'high':
        return 'bg-success';
      case 'medium':
        return 'bg-warning';
      case 'low':
        return 'bg-destructive';
      default:
        return 'bg-muted';
    }
  };

  return (
    <div className="bg-card p-6 rounded-lg border border-border shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Class-wise Breakdown</h3>
        <Icon name="BarChart3" size={20} className="text-muted-foreground" />
      </div>

      {classStats.length > 0 ? (
        <div className="space-y-4">
          {classStats.map((classItem) => (
            <div key={classItem.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-foreground">
                    {classItem.className}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {classItem.presentToday}/{classItem.totalStudents} students present
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold text-foreground">
                    {classItem.attendanceRate}%
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(classItem.status)}`}>
                    {classItem.status}
                  </span>
                </div>
              </div>
              
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(classItem.status)}`}
                  style={{ width: `${classItem.attendanceRate}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Icon name="BarChart3" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No class data available</p>
          <p className="text-sm text-muted-foreground mt-2">Class statistics will appear here once you add students and mark attendance</p>
        </div>
      )}

      {classStats.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xs text-muted-foreground">High (&gt;90%)</p>
              <p className="text-lg font-semibold text-success">0</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Medium (80-90%)</p>
              <p className="text-lg font-semibold text-warning">0</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Low (&lt;80%)</p>
              <p className="text-lg font-semibold text-destructive">0</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickStats;