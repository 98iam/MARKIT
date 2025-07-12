import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CompletionSummary = ({ 
  sessionData, 
  onStartNew, 
  onViewReports, 
  onExport,
  onClose 
}) => {
  const { totalStudents, presentCount, absentCount, sessionDuration, className, subject } = sessionData;
  const attendanceRate = ((presentCount / totalStudents) * 100).toFixed(1);

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl shadow-modal max-w-md w-full p-6 space-y-6 animate-state">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto bg-success/10 rounded-full flex items-center justify-center">
            <Icon name="CheckCircle" size={32} color="var(--color-success)" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground">Session Complete!</h2>
          <p className="text-sm text-muted-foreground">
            Attendance marked for {className} - {subject}
          </p>
        </div>

        {/* Summary Stats */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-success">{presentCount}</div>
              <div className="text-sm text-muted-foreground">Present</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-destructive">{absentCount}</div>
              <div className="text-sm text-muted-foreground">Absent</div>
            </div>
          </div>

          <div className="text-center p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="text-3xl font-bold text-primary">{attendanceRate}%</div>
            <div className="text-sm text-muted-foreground">Attendance Rate</div>
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Total Students:</span>
            <span className="font-medium">{totalStudents}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Session Duration:</span>
            <span className="font-medium">{sessionDuration}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Date:</span>
            <span className="font-medium">
              {new Date().toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={onViewReports}
              iconName="BarChart3"
              iconPosition="left"
              fullWidth
            >
              View Reports
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onExport}
              iconName="Download"
              iconPosition="left"
              fullWidth
            >
              Export Data
            </Button>
          </div>
          
          <Button
            variant="primary"
            size="default"
            onClick={onStartNew}
            iconName="Plus"
            iconPosition="left"
            fullWidth
          >
            Start New Session
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            fullWidth
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompletionSummary;