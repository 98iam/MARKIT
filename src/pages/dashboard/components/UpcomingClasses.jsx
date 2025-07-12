import React from 'react';
import Icon from '../../../components/AppIcon';

const UpcomingClasses = () => {
  const upcomingClasses = [];
  const lowAttendanceAlerts = [];

  return (
    <div className="space-y-6">
      {/* Upcoming Classes */}
      <div className="bg-card p-6 rounded-lg border border-border shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Today's Schedule</h3>
          <Icon name="Clock" size={20} className="text-muted-foreground" />
        </div>

        {upcomingClasses.length > 0 ? (
          <div className="space-y-4">
            {upcomingClasses.map((classItem) => (
              <div key={classItem.id} className="flex items-center space-x-4 p-3 bg-muted/50 rounded-lg">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="BookOpen" size={20} className="text-primary" />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-foreground truncate">
                    {classItem.className}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {classItem.teacher} • {classItem.room}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-muted-foreground">
                      {classItem.time} ({classItem.duration})
                    </span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">
                      {classItem.studentsEnrolled} students
                    </span>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors animate-hover">
                    <Icon name="MoreVertical" size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No classes scheduled</p>
            <p className="text-sm text-muted-foreground mt-2">Today's schedule will appear here</p>
          </div>
        )}

        {upcomingClasses.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <button className="w-full text-sm text-primary hover:text-primary/80 transition-colors animate-hover">
              View Full Schedule
            </button>
          </div>
        )}
      </div>

      {/* Low Attendance Alerts */}
      <div className="bg-card p-6 rounded-lg border border-border shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Attendance Alerts</h3>
          <Icon name="AlertTriangle" size={20} className="text-warning" />
        </div>

        {lowAttendanceAlerts.length > 0 ? (
          <div className="space-y-3">
            {lowAttendanceAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-3 bg-warning/10 border border-warning/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-warning/20 rounded-lg flex items-center justify-center">
                    <Icon name="TrendingDown" size={16} className="text-warning" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-foreground">
                      {alert.className}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {alert.attendanceRate}% attendance (down from {alert.lastWeekRate}%)
                    </p>
                  </div>
                </div>
                <button className="text-xs text-warning hover:text-warning/80 font-medium transition-colors animate-hover">
                  Review
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <Icon name="CheckCircle" size={24} className="text-success mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No attendance alerts today</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingClasses;