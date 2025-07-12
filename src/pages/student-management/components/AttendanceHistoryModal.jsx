import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const AttendanceHistoryModal = ({ isOpen, onClose, student }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Mock attendance data
  const attendanceData = [
    { date: '2025-01-15', status: 'present', subject: 'Mathematics' },
    { date: '2025-01-14', status: 'present', subject: 'Science' },
    { date: '2025-01-13', status: 'absent', subject: 'English' },
    { date: '2025-01-12', status: 'present', subject: 'Mathematics' },
    { date: '2025-01-11', status: 'present', subject: 'History' },
    { date: '2025-01-10', status: 'late', subject: 'Science' },
    { date: '2025-01-09', status: 'present', subject: 'English' },
    { date: '2025-01-08', status: 'absent', subject: 'Mathematics' },
    { date: '2025-01-07', status: 'present', subject: 'Art' },
    { date: '2025-01-06', status: 'present', subject: 'Physical Education' }
  ];

  const monthOptions = [
    { value: 0, label: 'January' },
    { value: 1, label: 'February' },
    { value: 2, label: 'March' },
    { value: 3, label: 'April' },
    { value: 4, label: 'May' },
    { value: 5, label: 'June' },
    { value: 6, label: 'July' },
    { value: 7, label: 'August' },
    { value: 8, label: 'September' },
    { value: 9, label: 'October' },
    { value: 10, label: 'November' },
    { value: 11, label: 'December' }
  ];

  const yearOptions = [
    { value: 2025, label: '2025' },
    { value: 2024, label: '2024' },
    { value: 2023, label: '2023' }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present': return 'CheckCircle';
      case 'absent': return 'XCircle';
      case 'late': return 'Clock';
      default: return 'Circle';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return 'text-success';
      case 'absent': return 'text-destructive';
      case 'late': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'present': return 'bg-success/10';
      case 'absent': return 'bg-destructive/10';
      case 'late': return 'bg-warning/10';
      default: return 'bg-muted/10';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const getAttendanceStats = () => {
    const total = attendanceData.length;
    const present = attendanceData.filter(item => item.status === 'present').length;
    const absent = attendanceData.filter(item => item.status === 'absent').length;
    const late = attendanceData.filter(item => item.status === 'late').length;
    
    return { total, present, absent, late };
  };

  const stats = getAttendanceStats();

  if (!isOpen || !student) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1020 p-4">
      <div className="bg-card rounded-lg border border-border shadow-modal w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Attendance History</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {student.name} - {student.studentId}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-border">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex gap-4">
              <Select
                label="Month"
                options={monthOptions}
                value={selectedMonth}
                onChange={setSelectedMonth}
                className="w-32"
              />
              <Select
                label="Year"
                options={yearOptions}
                value={selectedYear}
                onChange={setSelectedYear}
                className="w-24"
              />
            </div>

            {/* Stats Summary */}
            <div className="flex gap-4 text-sm">
              <div className="text-center">
                <div className="text-lg font-semibold text-success">{stats.present}</div>
                <div className="text-muted-foreground">Present</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-destructive">{stats.absent}</div>
                <div className="text-muted-foreground">Absent</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-warning">{stats.late}</div>
                <div className="text-muted-foreground">Late</div>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance List */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          <div className="space-y-3">
            {attendanceData.map((record, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 rounded-lg border border-border ${getStatusBg(record.status)}`}
              >
                <div className="flex items-center space-x-4">
                  <Icon
                    name={getStatusIcon(record.status)}
                    size={20}
                    className={getStatusColor(record.status)}
                  />
                  <div>
                    <div className="font-medium text-foreground">
                      {formatDate(record.date)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {record.subject}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium capitalize ${
                    record.status === 'present' ? 'bg-success/20 text-success' :
                    record.status === 'absent'? 'bg-destructive/20 text-destructive' : 'bg-warning/20 text-warning'
                  }`}>
                    {record.status}
                  </span>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                  >
                    <Icon name="MoreHorizontal" size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {attendanceData.length === 0 && (
            <div className="text-center py-8">
              <Icon name="Calendar" size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No attendance records found for the selected period.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="text-sm text-muted-foreground">
            Showing {attendanceData.length} records for {monthOptions[selectedMonth].label} {selectedYear}
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              iconName="Download"
              iconPosition="left"
            >
              Export
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceHistoryModal;