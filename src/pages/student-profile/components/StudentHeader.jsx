import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const StudentHeader = ({ student, onEdit, onSendNotification, onGenerateReport }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-success text-success-foreground';
      case 'Inactive':
        return 'bg-destructive text-destructive-foreground';
      case 'Suspended':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getAttendanceColor = (percentage) => {
    if (percentage >= 90) return 'text-success';
    if (percentage >= 75) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6 shadow-card">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Student Info */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative">
            <Image
              src={student.photo}
              alt={`${student.name} profile`}
              className="w-20 h-20 rounded-full object-cover border-2 border-border"
            />
            <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-card flex items-center justify-center ${getStatusColor(student.status)}`}>
              <Icon name="Check" size={12} />
            </div>
          </div>
          
          <div className="space-y-2">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">{student.name}</h1>
              <p className="text-muted-foreground">Student ID: {student.id}</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Icon name="Calendar" size={16} className="text-muted-foreground" />
                <span className="text-foreground">Enrolled: {student.enrollmentDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="BookOpen" size={16} className="text-muted-foreground" />
                <span className="text-foreground">{student.class}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Users" size={16} className="text-muted-foreground" />
                <span className="text-foreground">{student.batch}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats & Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Stats */}
          <div className="flex gap-6">
            <div className="text-center">
              <div className={`text-2xl font-bold ${getAttendanceColor(student.attendancePercentage)}`}>
                {student.attendancePercentage}%
              </div>
              <div className="text-xs text-muted-foreground">Attendance</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{student.totalClasses}</div>
              <div className="text-xs text-muted-foreground">Total Classes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">{student.presentDays}</div>
              <div className="text-xs text-muted-foreground">Present</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Edit"
              iconPosition="left"
              onClick={onEdit}
            >
              Edit Profile
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Send"
              iconPosition="left"
              onClick={onSendNotification}
            >
              Send Notification
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="FileText"
              iconPosition="left"
              onClick={onGenerateReport}
            >
              Generate Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHeader;