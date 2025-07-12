import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';


const AttendanceHistoryTab = ({ student, attendanceData }) => {
  const [viewMode, setViewMode] = useState('calendar');
  const [selectedMonth, setSelectedMonth] = useState('2024-07');
  const [filterReason, setFilterReason] = useState('all');

  const viewModeOptions = [
    { value: 'calendar', label: 'Calendar View' },
    { value: 'table', label: 'Table View' },
    { value: 'chart', label: 'Chart View' }
  ];

  const monthOptions = [
    { value: '2024-07', label: 'July 2024' },
    { value: '2024-06', label: 'June 2024' },
    { value: '2024-05', label: 'May 2024' },
    { value: '2024-04', label: 'April 2024' },
    { value: '2024-03', label: 'March 2024' }
  ];

  const reasonOptions = [
    { value: 'all', label: 'All Records' },
    { value: 'sick', label: 'Sick Leave' },
    { value: 'personal', label: 'Personal' },
    { value: 'family', label: 'Family Emergency' },
    { value: 'other', label: 'Other' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'present':
        return 'bg-success text-success-foreground';
      case 'absent':
        return 'bg-destructive text-destructive-foreground';
      case 'late':
        return 'bg-warning text-warning-foreground';
      case 'excused':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present':
        return 'Check';
      case 'absent':
        return 'X';
      case 'late':
        return 'Clock';
      case 'excused':
        return 'FileText';
      default:
        return 'Minus';
    }
  };

  const renderCalendarView = () => {
    const daysInMonth = new Date(2024, 6, 0).getDate(); // July 2024
    const firstDay = new Date(2024, 6, 1).getDay();
    const days = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `2024-07-${day.toString().padStart(2, '0')}`;
      const record = attendanceData.find(r => r.date === dateStr);
      const status = record ? record.status : 'no-class';

      days.push(
        <div
          key={day}
          className={`h-12 border border-border rounded-lg flex items-center justify-center text-sm font-medium cursor-pointer hover:shadow-card transition-shadow ${
            status === 'no-class' ?'bg-muted/30 text-muted-foreground' 
              : `${getStatusColor(status)} hover:opacity-80`
          }`}
          title={record ? `${record.status} - ${record.reason || ''}` : 'No class'}
        >
          <div className="flex flex-col items-center">
            <span>{day}</span>
            {record && (
              <Icon name={getStatusIcon(status)} size={12} className="mt-1" />
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-muted-foreground">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {days}
        </div>
        
        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-success rounded"></div>
            <span>Present</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-destructive rounded"></div>
            <span>Absent</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-warning rounded"></div>
            <span>Late</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-secondary rounded"></div>
            <span>Excused</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-muted rounded"></div>
            <span>No Class</span>
          </div>
        </div>
      </div>
    );
  };

  const renderTableView = () => {
    const filteredData = filterReason === 'all' 
      ? attendanceData 
      : attendanceData.filter(record => record.reason === filterReason);

    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-3 font-medium text-foreground">Date</th>
              <th className="text-left p-3 font-medium text-foreground">Day</th>
              <th className="text-left p-3 font-medium text-foreground">Status</th>
              <th className="text-left p-3 font-medium text-foreground">Time In</th>
              <th className="text-left p-3 font-medium text-foreground">Time Out</th>
              <th className="text-left p-3 font-medium text-foreground">Reason</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((record, index) => (
              <tr key={index} className="border-b border-border hover:bg-muted/30">
                <td className="p-3 text-foreground">{record.date}</td>
                <td className="p-3 text-muted-foreground">{record.day}</td>
                <td className="p-3">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                    <Icon name={getStatusIcon(record.status)} size={12} />
                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                  </span>
                </td>
                <td className="p-3 text-foreground">{record.timeIn || '-'}</td>
                <td className="p-3 text-foreground">{record.timeOut || '-'}</td>
                <td className="p-3 text-muted-foreground">{record.reason || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderChartView = () => {
    const monthlyStats = {
      present: attendanceData.filter(r => r.status === 'present').length,
      absent: attendanceData.filter(r => r.status === 'absent').length,
      late: attendanceData.filter(r => r.status === 'late').length,
      excused: attendanceData.filter(r => r.status === 'excused').length
    };

    const total = Object.values(monthlyStats).reduce((sum, val) => sum + val, 0);

    return (
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-success/10 border border-success/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-success">{monthlyStats.present}</div>
            <div className="text-sm text-success/80">Present Days</div>
          </div>
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-destructive">{monthlyStats.absent}</div>
            <div className="text-sm text-destructive/80">Absent Days</div>
          </div>
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-warning">{monthlyStats.late}</div>
            <div className="text-sm text-warning/80">Late Arrivals</div>
          </div>
          <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-secondary">{monthlyStats.excused}</div>
            <div className="text-sm text-secondary/80">Excused</div>
          </div>
        </div>

        {/* Attendance Trend */}
        <div className="bg-muted/30 rounded-lg p-4">
          <h4 className="text-md font-medium text-foreground mb-4">Attendance Trend</h4>
          <div className="space-y-3">
            {Object.entries(monthlyStats).map(([status, count]) => {
              const percentage = total > 0 ? (count / total) * 100 : 0;
              return (
                <div key={status} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="capitalize text-foreground">{status}</span>
                    <span className="text-muted-foreground">{count} days ({percentage.toFixed(1)}%)</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getStatusColor(status).split(' ')[0]}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Attendance History</h3>
        
        <div className="flex flex-wrap gap-3">
          <Select
            options={viewModeOptions}
            value={viewMode}
            onChange={setViewMode}
            className="w-40"
          />
          <Select
            options={monthOptions}
            value={selectedMonth}
            onChange={setSelectedMonth}
            className="w-40"
          />
          {viewMode === 'table' && (
            <Select
              options={reasonOptions}
              value={filterReason}
              onChange={setFilterReason}
              className="w-40"
            />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="bg-card border border-border rounded-lg p-6">
        {viewMode === 'calendar' && renderCalendarView()}
        {viewMode === 'table' && renderTableView()}
        {viewMode === 'chart' && renderChartView()}
      </div>

      {/* Export Button */}
      <div className="flex justify-end">
        <Button
          variant="outline"
          iconName="Download"
          iconPosition="left"
        >
          Export Attendance Data
        </Button>
      </div>
    </div>
  );
};

export default AttendanceHistoryTab;