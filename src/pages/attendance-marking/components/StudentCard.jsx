import React, { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const StudentCard = ({
  student,
  onSwipeUp,
  onSwipeDown,
  isAnimating,
  attendanceStatus,
  slideInFromRight = false,
  absenceStatusText
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (slideInFromRight) {
      // Start animation after component mounts
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(true);
    }
  }, [slideInFromRight, student?.id]);

  const handlers = useSwipeable({
    onSwipedUp: () => onSwipeUp(),
    onSwipedDown: () => onSwipeDown(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  const getStatusColor = () => {
    if (attendanceStatus === 'present') return 'border-success bg-success/5';
    if (attendanceStatus === 'absent') return 'border-destructive bg-destructive/5';
    return 'border-border bg-card';
  };

  const getStatusIcon = () => {
    if (attendanceStatus === 'present') return { name: 'Check', color: 'var(--color-success)' };
    if (attendanceStatus === 'absent') return { name: 'X', color: 'var(--color-destructive)' };
    return null;
  };

  const statusIcon = getStatusIcon();

  if (!student) return null;

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Organization Header */}
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-primary mb-1">Guidance</h2>
        <p className="text-sm text-muted-foreground">Government Exam Preparation Center</p>
        <p className="text-xs text-muted-foreground mt-1">
          {new Date().toLocaleDateString('en-IN', { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
          })}
        </p>
      </div>

      {/* Absence Alert Banner */}
      {absenceStatusText && (
        <div className="w-80 bg-destructive/10 border border-destructive/20 rounded-lg p-3 text-center">
          <div className="flex items-center justify-center space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-destructive" />
            <span className="text-sm font-medium text-destructive">{absenceStatusText}</span>
          </div>
        </div>
      )}

      {/* Swipe Instructions */}
      <div className="flex items-center justify-between w-full max-w-sm">
        <div className="flex flex-col items-center space-y-2 opacity-60">
          <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
            <Icon name="ArrowUp" size={20} color="var(--color-success)" />
          </div>
          <span className="text-sm font-medium text-success">Present</span>
        </div>
        
        <div className="flex flex-col items-center space-y-2 opacity-60">
          <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
            <Icon name="ArrowDown" size={20} color="var(--color-destructive)" />
          </div>
          <span className="text-sm font-medium text-destructive">Absent</span>
        </div>
      </div>

      {/* Student Card with Slide Animation */}
      <div
        {...handlers}
        className={`relative w-80 h-96 rounded-2xl border-2 shadow-card cursor-pointer select-none transition-all duration-500 ${getStatusColor()} ${
          isAnimating ? 'scale-105 shadow-interactive' : 'hover:shadow-interactive'
        } ${
          slideInFromRight
            ? `transform ${isVisible ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-700 ease-out`
            : ''
        }`}
      >
        {/* Status Badge */}
        {statusIcon && (
          <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-card border-2 border-current flex items-center justify-center z-10">
            <Icon name={statusIcon.name} size={16} color={statusIcon.color} />
          </div>
        )}

        {/* Student Photo */}
        <div className="p-6 pb-2">
          <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-border bg-muted">
            <Image 
              src={student?.photo} 
              alt={student?.name || 'Student'}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Student Info - Emphasized Name and Phone */}
        <div className="px-6 pb-6 text-center space-y-4">
          {/* Student Name - Large and prominent */}
          <h3 className="text-2xl font-bold text-foreground leading-tight">
            {student?.name || 'Unknown Student'}
          </h3>
          
          {/* Phone Number - Prominent display */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
            <p className="text-sm text-muted-foreground font-medium">Phone Number</p>
            <p className="text-xl font-bold text-primary">
              {student?.phone || 'Not provided'}
            </p>
          </div>

          {/* Additional Info */}
          <div className="space-y-1 text-sm">
            <p className="text-muted-foreground">
              <span className="font-medium">Roll No:</span> {student?.rollNo || student?.id || 'N/A'}
            </p>
            <p className="text-muted-foreground">
              <span className="font-medium">Class:</span> {student?.class || 'Not specified'}
            </p>
            <p className="text-muted-foreground">
              <span className="font-medium">Subject:</span> {student?.subject || 'General'}
            </p>
          </div>
        </div>

        {/* Swipe Gesture Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="Hand" size={14} />
            <span>Swipe to mark attendance</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;