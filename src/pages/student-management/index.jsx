import React, { useState, useMemo } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import StudentTable from './components/StudentTable';
import FilterPanel from './components/FilterPanel';
import BulkActions from './components/BulkActions';
import StudentModal from './components/StudentModal';
import AttendanceHistoryModal from './components/AttendanceHistoryModal';

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [filters, setFilters] = useState({
    class: '',
    attendanceRange: '',
    status: ''
  });
  const [savedFilters] = useState([
    { id: 1, name: 'High Performers', filters: { attendanceRange: '90-100' } },
    { id: 2, name: 'Grade 10 Students', filters: { class: 'Grade 10' } },
    { id: 3, name: 'At Risk Students', filters: { attendanceRange: '0-59' } }
  ]);

  // Modal states
  const [studentModal, setStudentModal] = useState({ isOpen: false, student: null, mode: 'add' });
  const [attendanceModal, setAttendanceModal] = useState({ isOpen: false, student: null });

  // Filter and sort students
  const filteredAndSortedStudents = useMemo(() => {
    let filtered = students.filter(student => {
      if (filters.class && student.class !== filters.class) return false;
      if (filters.status && student.status !== filters.status) return false;
      if (filters.attendanceRange) {
        const [min, max] = filters.attendanceRange.split('-').map(Number);
        if (student.attendancePercentage < min || student.attendancePercentage > max) return false;
      }
      return true;
    });

    return filtered.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [students, filters, sortConfig]);

  // Handlers
  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({ class: '', attendanceRange: '', status: '' });
  };

  const handleSaveFilter = () => {
    // Implementation for saving custom filters
    console.log('Save filter:', filters);
  };

  const handleLoadFilter = (filterId) => {
    const savedFilter = savedFilters.find(f => f.id === parseInt(filterId));
    if (savedFilter) {
      setFilters(savedFilter.filters);
    }
  };

  const handleSelectStudent = (studentId) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSelectAll = () => {
    setSelectedStudents(
      selectedStudents.length === filteredAndSortedStudents.length 
        ? [] 
        : filteredAndSortedStudents.map(s => s.id)
    );
  };

  const handleClearSelection = () => {
    setSelectedStudents([]);
  };

  // Student actions
  const handleAddStudent = () => {
    setStudentModal({ isOpen: true, student: null, mode: 'add' });
  };

  const handleEditStudent = (student) => {
    setStudentModal({ isOpen: true, student, mode: 'edit' });
  };

  const handleViewProfile = (student) => {
    setStudentModal({ isOpen: true, student, mode: 'view' });
  };

  const handleViewAttendance = (student) => {
    setAttendanceModal({ isOpen: true, student });
  };

  const handleSaveStudent = (studentData) => {
    if (studentModal.mode === 'add') {
      setStudents(prev => [...prev, { ...studentData, id: `GU${(students.length + 1).toString().padStart(3, '0')}`, attendancePercentage: 100, status: 'active' }]);
    } else {
      setStudents(prev => prev.map(s => s.id === studentData.id ? studentData : s));
    }
  };

  // Bulk actions
  const handleExportSelected = () => {
    console.log('Export selected students:', selectedStudents);
  };

  const handleSendNotifications = () => {
    console.log('Send notifications to:', selectedStudents);
  };

  const handleArchiveSelected = () => {
    console.log('Archive students:', selectedStudents);
  };

  const handleDeleteSelected = () => {
    console.log('Delete students:', selectedStudents);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Student Management</h1>
              <p className="text-muted-foreground mt-2">
                Manage student records, view attendance history, and track academic progress
              </p>
            </div>
            
            <div className="mt-4 sm:mt-0 flex items-center space-x-3">
              <Button
                variant="outline"
                iconName="Download"
                iconPosition="left"
                onClick={() => console.log('Export all students')}
              >
                Export All
              </Button>
              
              <Button
                variant="default"
                iconName="Plus"
                iconPosition="left"
                onClick={handleAddStudent}
              >
                Add Student
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon name="Users" size={24} className="text-primary" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold text-foreground">{students.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-success/10 rounded-lg">
                  <Icon name="UserCheck" size={24} className="text-success" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Active Students</p>
                  <p className="text-2xl font-bold text-foreground">
                    {students.filter(s => s.status === 'active').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-warning/10 rounded-lg">
                  <Icon name="TrendingUp" size={24} className="text-warning" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Avg Attendance</p>
                  <p className="text-2xl font-bold text-foreground">
                    {students.length > 0 ? Math.round(students.reduce((acc, s) => acc + s.attendancePercentage, 0) / students.length) : 0}%
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-destructive/10 rounded-lg">
                  <Icon name="AlertTriangle" size={24} className="text-destructive" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">At Risk</p>
                  <p className="text-2xl font-bold text-foreground">
                    {students.filter(s => s.attendancePercentage < 75).length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Panel */}
          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            onSaveFilter={handleSaveFilter}
            savedFilters={savedFilters}
            onLoadFilter={handleLoadFilter}
          />

          {/* Bulk Actions */}
          <BulkActions
            selectedCount={selectedStudents.length}
            onExportSelected={handleExportSelected}
            onSendNotifications={handleSendNotifications}
            onArchiveSelected={handleArchiveSelected}
            onDeleteSelected={handleDeleteSelected}
            onClearSelection={handleClearSelection}
          />

          {/* Show empty state when no students */}
          {filteredAndSortedStudents.length === 0 && students.length === 0 && (
            <div className="bg-card p-8 rounded-lg border border-border text-center">
              <Icon name="Users" size={64} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Students Added Yet</h3>
              <p className="text-muted-foreground mb-6">Get started by adding your first student to the system</p>
              <Button
                variant="default"
                iconName="Plus"
                iconPosition="left"
                onClick={handleAddStudent}
              >
                Add Your First Student
              </Button>
            </div>
          )}

          {/* Student Table - only show if students exist */}
          {students.length > 0 && (
            <StudentTable
              students={filteredAndSortedStudents}
              selectedStudents={selectedStudents}
              onSelectStudent={handleSelectStudent}
              onSelectAll={handleSelectAll}
              onEditStudent={handleEditStudent}
              onViewProfile={handleViewProfile}
              onViewAttendance={handleViewAttendance}
              sortConfig={sortConfig}
              onSort={handleSort}
            />
          )}

          {/* Pagination - only show if students exist */}
          {students.length > 0 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-muted-foreground">
                Showing {filteredAndSortedStudents.length} of {students.length} students
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  <Icon name="ChevronLeft" size={16} />
                </Button>
                <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                  1
                </Button>
                <Button variant="outline" size="sm" disabled>
                  <Icon name="ChevronRight" size={16} />
                </Button>
              </div>
            </div>
          )}

          {/* Modals */}
          <StudentModal
            isOpen={studentModal.isOpen}
            onClose={() => setStudentModal({ isOpen: false, student: null, mode: 'add' })}
            student={studentModal.student}
            mode={studentModal.mode}
            onSave={handleSaveStudent}
          />

          <AttendanceHistoryModal
            isOpen={attendanceModal.isOpen}
            onClose={() => setAttendanceModal({ isOpen: false, student: null })}
            student={attendanceModal.student}
          />
        </div>
      </main>
    </div>
  );
};

export default StudentManagement;