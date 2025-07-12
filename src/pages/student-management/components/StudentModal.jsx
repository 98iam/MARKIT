import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const StudentModal = ({ 
  isOpen, 
  onClose, 
  student, 
  mode, // 'add', 'edit', 'view'
  onSave 
}) => {
  const [formData, setFormData] = useState({
    name: student?.name || '',
    phone: student?.phone || ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (mode !== 'view' && validateForm()) {
      // Generate student ID automatically
      const studentData = {
        ...formData,
        id: student?.id || `ST${Date.now()}`,
        rollNo: student?.rollNo || `ST${Date.now()}`,
        class: student?.class || 'General',
        subject: student?.subject || 'General Studies',
        status: student?.status || 'active',
        photo: student?.photo || '/assets/images/no_image.png',
        attendancePercentage: student?.attendancePercentage || 100,
        totalClasses: student?.totalClasses || 0,
        presentDays: student?.presentDays || 0,
        consecutiveAbsentDays: student?.consecutiveAbsentDays || 0,
        lastAttendanceDate: student?.lastAttendanceDate || null,
        lastAttendanceStatus: student?.lastAttendanceStatus || null
      };
      onSave(studentData);
      onClose();
    }
  };

  const getModalTitle = () => {
    switch (mode) {
      case 'add': return 'Add New Student';
      case 'edit': return 'Edit Student';
      case 'view': return 'Student Details';
      default: return 'Student';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1020 p-4">
      <div className="bg-card rounded-lg border border-border shadow-modal w-full max-w-md max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">{getModalTitle()}</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <Input
            label="Full Name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            error={errors.name}
            disabled={mode === 'view'}
            required
            placeholder="Enter student's full name"
          />
          
          <Input
            label="Phone Number"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            error={errors.phone}
            disabled={mode === 'view'}
            required
            placeholder="Enter phone number"
          />

          {mode === 'view' && student && (
            <div className="mt-6 space-y-3">
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="text-sm text-muted-foreground">Student ID</div>
                <div className="font-medium text-foreground">{student.rollNo || student.id}</div>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="text-sm text-muted-foreground">Class</div>
                <div className="font-medium text-foreground">{student.class || 'General'}</div>
              </div>

              {student.consecutiveAbsentDays > 0 && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                  <div className="text-sm text-destructive font-medium">Attendance Alert</div>
                  <div className="text-destructive">
                    Absent for {student.consecutiveAbsentDays} consecutive day{student.consecutiveAbsentDays > 1 ? 's' : ''}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {mode !== 'view' && (
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleSave}
              iconName="Save"
              iconPosition="left"
            >
              {mode === 'add' ? 'Add Student' : 'Save Changes'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentModal;