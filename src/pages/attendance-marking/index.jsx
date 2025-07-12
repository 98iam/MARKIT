import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import StudentCard from './components/StudentCard';
import ProgressIndicator from './components/ProgressIndicator';
import NavigationControls from './components/NavigationControls';
import SessionControls from './components/SessionControls';
import CompletionSummary from './components/CompletionSummary';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AttendanceMarking = () => {
  const navigate = useNavigate();

  // Sample students with absence tracking
  const mockStudents = [
    {
      id: 'GU001',
      rollNo: 'GU001',
      name: 'Rahul Kumar Singh',
      class: 'SSC CGL Batch A',
      subject: 'General Studies',
      phone: '9876543210',
      photo: '/assets/images/no_image.png',
      consecutiveAbsentDays: 0,
      lastAttendanceDate: '2025-07-11',
      lastAttendanceStatus: 'present'
    },
    {
      id: 'GU002', 
      rollNo: 'GU002',
      name: 'Priya Sharma',
      class: 'UPSC Prelims',
      subject: 'Current Affairs',
      phone: '9876543211',
      photo: '/assets/images/no_image.png',
      consecutiveAbsentDays: 2,
      lastAttendanceDate: '2025-07-10',
      lastAttendanceStatus: 'absent'
    },
    {
      id: 'GU003',
      rollNo: 'GU003', 
      name: 'Amit Patel',
      class: 'Banking PO',
      subject: 'Quantitative Aptitude',
      phone: '9876543212',
      photo: '/assets/images/no_image.png',
      consecutiveAbsentDays: 1,
      lastAttendanceDate: '2025-07-11',
      lastAttendanceStatus: 'absent'
    },
    {
      id: 'GU004',
      rollNo: 'GU004',
      name: 'Sneha Gupta',
      class: 'Railway Group D',
      subject: 'General Knowledge',
      phone: '9876543213',
      photo: '/assets/images/no_image.png',
      consecutiveAbsentDays: 0,
      lastAttendanceDate: '2025-07-11',
      lastAttendanceStatus: 'present'
    },
    {
      id: 'GU005',
      rollNo: 'GU005',
      name: 'Vikash Yadav',
      class: 'SSC CHSL',
      subject: 'English Language',
      phone: '9876543214',
      photo: '/assets/images/no_image.png',
      consecutiveAbsentDays: 3,
      lastAttendanceDate: '2025-07-09',
      lastAttendanceStatus: 'absent'
    }
  ];

  // State management
  const [students] = useState(mockStudents);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [attendance, setAttendance] = useState({});
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStudents, setFilteredStudents] = useState(mockStudents);
  const [undoStack, setUndoStack] = useState([]);
  const [sessionStartTime] = useState(new Date());
  const [showCompletion, setShowCompletion] = useState(false);

  // Utility function to calculate consecutive absent days
  const calculateConsecutiveAbsentDays = (student, newStatus, todayDate) => {
    if (newStatus === 'present') {
      return 0; // Reset streak when present
    }
    
    if (newStatus === 'absent') {
      const today = new Date(todayDate);
      const lastDate = student.lastAttendanceDate ? new Date(student.lastAttendanceDate) : null;
      
      if (!lastDate) {
        return 1; // First absence
      }
      
      // Calculate days between last attendance and today
      const daysDiff = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));
      
      if (student.lastAttendanceStatus === 'absent' && daysDiff === 1) {
        // Consecutive absence
        return (student.consecutiveAbsentDays || 0) + 1;
      } else if (student.lastAttendanceStatus === 'absent' && daysDiff > 1) {
        // Gap in attendance, but last status was absent
        return (student.consecutiveAbsentDays || 0) + daysDiff;
      } else {
        // First absence after being present
        return 1;
      }
    }
    
    return student.consecutiveAbsentDays || 0;
  };

  // Filter students based on search
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = students.filter(student => 
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredStudents(filtered);
      setCurrentIndex(0);
    } else {
      setFilteredStudents(students);
    }
  }, [searchQuery, students]);

  // Current student
  const currentStudent = filteredStudents[currentIndex];

  // Attendance counts
  const presentCount = Object.values(attendance).filter(status => status === 'present').length;
  const absentCount = Object.values(attendance).filter(status => status === 'absent').length;
  const markedCount = presentCount + absentCount;

  // Mark attendance function (simplified - no reason required)
  const markAttendance = (studentId, status) => {
    if (isPaused) return;

    setIsAnimating(true);
    
    const student = students.find(s => s.id === studentId);
    const todayDate = new Date().toISOString().split('T')[0];
    
    // Calculate new consecutive absent days
    const newConsecutiveAbsentDays = calculateConsecutiveAbsentDays(student, status, todayDate);
    
    // Add to undo stack
    setUndoStack(prev => [...prev, { 
      studentId, 
      previousStatus: attendance[studentId],
      previousConsecutiveAbsentDays: student?.consecutiveAbsentDays || 0
    }]);
    
    // Update attendance
    setAttendance(prev => ({ 
      ...prev, 
      [studentId]: status,
      [`${studentId}_consecutiveAbsentDays`]: newConsecutiveAbsentDays,
      [`${studentId}_lastAttendanceDate`]: todayDate,
      [`${studentId}_lastAttendanceStatus`]: status
    }));

    // Animation and navigation
    setTimeout(() => {
      setIsAnimating(false);
      if (currentIndex < filteredStudents.length - 1) {
        setCurrentIndex(prev => prev + 1);
      }
    }, 300);
  };

  // Get absence status text for student
  const getAbsenceStatusText = (student) => {
    const currentConsecutiveAbsentDays = attendance[`${student.id}_consecutiveAbsentDays`] !== undefined 
      ? attendance[`${student.id}_consecutiveAbsentDays`]
      : student.consecutiveAbsentDays || 0;
    
    const currentStatus = attendance[student.id] || student.lastAttendanceStatus;
    
    if (currentStatus === 'absent' && currentConsecutiveAbsentDays > 0) {
      if (currentConsecutiveAbsentDays === 1) {
        return 'Absent yesterday';
      } else {
        return `Absent for ${currentConsecutiveAbsentDays} consecutive days`;
      }
    }
    
    return null;
  };

  // Navigation functions
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredStudents.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleMarkPresent = () => {
    if (currentStudent) {
      markAttendance(currentStudent.id, 'present');
    }
  };

  const handleMarkAbsent = () => {
    if (currentStudent) {
      // No modal needed - directly mark absent
      markAttendance(currentStudent.id, 'absent');
    }
  };

  const handleMarkAllPresent = () => {
    if (isPaused) return;
    
    const newAttendance = { ...attendance };
    const todayDate = new Date().toISOString().split('T')[0];
    
    filteredStudents.forEach(student => {
      if (!newAttendance[student.id]) {
        newAttendance[student.id] = 'present';
        newAttendance[`${student.id}_consecutiveAbsentDays`] = 0;
        newAttendance[`${student.id}_lastAttendanceDate`] = todayDate;
        newAttendance[`${student.id}_lastAttendanceStatus`] = 'present';
      }
    });
    setAttendance(newAttendance);
  };

  const handleUndo = () => {
    if (undoStack.length === 0) return;
    
    const lastAction = undoStack[undoStack.length - 1];
    setUndoStack(prev => prev.slice(0, -1));
    
    if (lastAction.previousStatus) {
      setAttendance(prev => ({ 
        ...prev, 
        [lastAction.studentId]: lastAction.previousStatus,
        [`${lastAction.studentId}_consecutiveAbsentDays`]: lastAction.previousConsecutiveAbsentDays
      }));
    } else {
      setAttendance(prev => {
        const newAttendance = { ...prev };
        delete newAttendance[lastAction.studentId];
        delete newAttendance[`${lastAction.studentId}_consecutiveAbsentDays`];
        delete newAttendance[`${lastAction.studentId}_lastAttendanceDate`];
        delete newAttendance[`${lastAction.studentId}_lastAttendanceStatus`];
        return newAttendance;
      });
    }
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleComplete = () => {
    setShowCompletion(true);
  };

  const handleStartNew = () => {
    setAttendance({});
    setCurrentIndex(0);
    setUndoStack([]);
    setSearchQuery('');
    setShowCompletion(false);
    setIsPaused(false);
  };

  const handleViewReports = () => {
    navigate('/attendance-reports');
  };

  const handleExport = () => {
    const exportData = {
      date: new Date().toISOString().split('T')[0],
      organization: "Guidance - Government Exam Preparation Center",
      session: {
        totalStudents: students.length,
        presentCount,
        absentCount,
        sessionDuration: getSessionDuration()
      },
      students: students.map(student => ({
        rollNo: student.rollNo,
        name: student.name,
        class: student.class,
        subject: student.subject,
        phone: student.phone,
        status: attendance[student.id] || 'not_marked',
        consecutiveAbsentDays: attendance[`${student.id}_consecutiveAbsentDays`] !== undefined 
          ? attendance[`${student.id}_consecutiveAbsentDays`]
          : student.consecutiveAbsentDays || 0
      }))
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `guidance_attendance_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const getSessionDuration = () => {
    const now = new Date();
    const duration = Math.floor((now - sessionStartTime) / 1000 / 60);
    return `${duration} minutes`;
  };

  const sessionData = {
    totalStudents: students.length,
    presentCount,
    absentCount,
    sessionDuration: getSessionDuration(),
    className: "Government Exam Preparation",
    subject: "Mixed Subjects"
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Attendance Marking</h1>
            <p className="text-muted-foreground">
              Mark attendance for Guidance - {new Date().toLocaleDateString('en-IN', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </p>
          </div>

          {/* Show empty state when no students */}
          {students.length === 0 ? (
            <div className="bg-card p-8 rounded-lg border border-border text-center">
              <Icon name="Users" size={64} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Students Available</h3>
              <p className="text-muted-foreground mb-6">You need to add students before you can mark attendance</p>
              <Button
                variant="default"
                iconName="Plus"
                iconPosition="left"
                onClick={() => navigate('/student-management')}
              >
                Add Students
              </Button>
            </div>
          ) : (
            <>
              {/* Session Controls */}
              <div className="mb-8">
                <SessionControls
                  onSearch={() => {}}
                  onPauseResume={handlePauseResume}
                  onComplete={handleComplete}
                  isPaused={isPaused}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  totalStudents={students.length}
                  markedStudents={markedCount}
                />
              </div>

              {/* Progress Indicator */}
              <div className="mb-8">
                <ProgressIndicator
                  current={markedCount}
                  total={students.length}
                  presentCount={presentCount}
                  absentCount={absentCount}
                />
              </div>

              {/* Student Card with slide animation */}
              {currentStudent && (
                <div className="mb-8 flex justify-center">
                  <StudentCard
                    key={currentStudent.id}
                    student={currentStudent}
                    onSwipeUp={handleMarkPresent}
                    onSwipeDown={handleMarkAbsent}
                    isAnimating={isAnimating}
                    attendanceStatus={attendance[currentStudent.id]}
                    slideInFromRight={true}
                    absenceStatusText={getAbsenceStatusText(currentStudent)}
                  />
                </div>
              )}

              {/* Navigation Controls */}
              <div className="mb-8">
                <NavigationControls
                  onPrevious={handlePrevious}
                  onNext={handleNext}
                  onMarkPresent={handleMarkPresent}
                  onMarkAbsent={handleMarkAbsent}
                  onMarkAllPresent={handleMarkAllPresent}
                  onUndo={handleUndo}
                  canUndo={undoStack.length > 0}
                  hasPrevious={currentIndex > 0}
                  hasNext={currentIndex < filteredStudents.length - 1}
                  currentStudent={currentStudent}
                />
              </div>

              {/* No Students Found */}
              {filteredStudents.length === 0 && searchQuery && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No students found matching "{searchQuery}"</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Completion Summary Modal */}
      {showCompletion && (
        <CompletionSummary
          sessionData={sessionData}
          onStartNew={handleStartNew}
          onViewReports={handleViewReports}
          onExport={handleExport}
          onClose={() => setShowCompletion(false)}
        />
      )}
    </div>
  );
};

export default AttendanceMarking;