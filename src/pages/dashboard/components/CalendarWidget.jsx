import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const CalendarWidget = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const attendanceData = {
    "2025-07-01": { rate: 95, status: 'high' },
    "2025-07-02": { rate: 87, status: 'medium' },
    "2025-07-03": { rate: 92, status: 'high' },
    "2025-07-07": { rate: 78, status: 'low' },
    "2025-07-08": { rate: 89, status: 'medium' },
    "2025-07-09": { rate: 94, status: 'high' },
    "2025-07-10": { rate: 85, status: 'medium' },
    "2025-07-11": { rate: 91, status: 'high' },
    "2025-07-12": { rate: 88, status: 'medium' }
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const getAttendanceStatus = (day) => {
    if (!day) return null;
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return attendanceData[dateStr];
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const days = getDaysInMonth(currentDate);
  const today = new Date().getDate();
  const isCurrentMonth = currentDate.getMonth() === new Date().getMonth() && 
                         currentDate.getFullYear() === new Date().getFullYear();

  return (
    <div className="bg-card p-6 rounded-lg border border-border shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Attendance Calendar</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-1 hover:bg-muted rounded-md transition-colors animate-hover"
          >
            <Icon name="ChevronLeft" size={16} />
          </button>
          <span className="text-sm font-medium text-foreground min-w-[120px] text-center">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <button
            onClick={() => navigateMonth(1)}
            className="p-1 hover:bg-muted rounded-md transition-colors animate-hover"
          >
            <Icon name="ChevronRight" size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-xs font-medium text-muted-foreground text-center py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const attendance = getAttendanceStatus(day);
          const isToday = isCurrentMonth && day === today;
          
          return (
            <div
              key={index}
              className={`
                h-8 flex items-center justify-center text-xs rounded-md transition-colors animate-hover
                ${day ? 'cursor-pointer hover:bg-muted' : ''}
                ${isToday ? 'bg-primary text-primary-foreground font-semibold' : ''}
                ${attendance?.status === 'high' && !isToday ? 'bg-success/20 text-success' : ''}
                ${attendance?.status === 'medium' && !isToday ? 'bg-warning/20 text-warning' : ''}
                ${attendance?.status === 'low' && !isToday ? 'bg-destructive/20 text-destructive' : ''}
                ${!attendance && day && !isToday ? 'text-muted-foreground' : ''}
              `}
              title={attendance ? `${attendance.rate}% attendance` : ''}
            >
              {day}
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-success/20 rounded-sm"></div>
            <span className="text-muted-foreground">High (&gt;90%)</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-warning/20 rounded-sm"></div>
            <span className="text-muted-foreground">Medium (80-90%)</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-destructive/20 rounded-sm"></div>
            <span className="text-muted-foreground">Low (&lt;80%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarWidget;