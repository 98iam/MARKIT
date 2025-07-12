import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import StudentHeader from './components/StudentHeader';
import PersonalInfoTab from './components/PersonalInfoTab';
import AttendanceHistoryTab from './components/AttendanceHistoryTab';
import ParentContactTab from './components/ParentContactTab';
import Icon from '../../components/AppIcon';

const StudentProfile = () => {
  const [activeTab, setActiveTab] = useState('personal');

  // Mock student data
  const studentData = {
    id: "STU001",
    name: "Emily Johnson",
    photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    email: "emily.johnson@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Oak Street, Springfield, IL 62701",
    dateOfBirth: "2008-03-15",
    gender: "female",
    bloodGroup: "A+",
    emergencyContact: "Sarah Johnson",
    emergencyPhone: "+1 (555) 987-6543",
    medicalConditions: "Mild asthma - inhaler required during physical activities",
    class: "Grade 10 - Mathematics",
    batch: "Morning Batch A",
    enrollmentDate: "September 1, 2023",
    status: "Active",
    attendancePercentage: 92,
    totalClasses: 120,
    presentDays: 110,
    absentDays: 10
  };

  // Mock attendance data
  const attendanceData = [
    { date: "2024-07-01", day: "Monday", status: "present", timeIn: "09:00 AM", timeOut: "12:00 PM", reason: null },
    { date: "2024-07-02", day: "Tuesday", status: "present", timeIn: "09:05 AM", timeOut: "12:00 PM", reason: null },
    { date: "2024-07-03", day: "Wednesday", status: "absent", timeIn: null, timeOut: null, reason: "sick" },
    { date: "2024-07-04", day: "Thursday", status: "present", timeIn: "09:00 AM", timeOut: "12:00 PM", reason: null },
    { date: "2024-07-05", day: "Friday", status: "late", timeIn: "09:15 AM", timeOut: "12:00 PM", reason: "traffic" },
    { date: "2024-07-08", day: "Monday", status: "present", timeIn: "08:55 AM", timeOut: "12:00 PM", reason: null },
    { date: "2024-07-09", day: "Tuesday", status: "present", timeIn: "09:00 AM", timeOut: "12:00 PM", reason: null },
    { date: "2024-07-10", day: "Wednesday", status: "excused", timeIn: null, timeOut: null, reason: "family" },
    { date: "2024-07-11", day: "Thursday", status: "present", timeIn: "09:00 AM", timeOut: "12:00 PM", reason: null },
    { date: "2024-07-12", day: "Friday", status: "present", timeIn: "09:00 AM", timeOut: "12:00 PM", reason: null }
  ];

  // Mock parent contacts
  const parentContacts = [
    {
      name: "Sarah Johnson",
      relationship: "Mother",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 987-6543",
      workPhone: "+1 (555) 234-5678",
      preferences: {
        email: true,
        sms: true,
        calls: true
      }
    },
    {
      name: "Michael Johnson",
      relationship: "Father",
      email: "michael.johnson@email.com",
      phone: "+1 (555) 876-5432",
      workPhone: "+1 (555) 345-6789",
      preferences: {
        email: true,
        sms: false,
        calls: true
      }
    }
  ];

  // Mock communication history
  const communicationHistory = [
    {
      type: "email",
      direction: "outgoing",
      contact: "Sarah Johnson",
      subject: "Monthly Progress Report",
      content: "Emily\'s performance has been excellent this month. She scored 95% in the recent mathematics test and shows great improvement in problem-solving skills.",
      timestamp: "2024-07-10T14:30:00Z",
      status: "read"
    },
    {
      type: "sms",
      direction: "outgoing",
      contact: "Sarah Johnson",
      subject: "Absence Notification",
      content: "Emily was marked absent today. Please confirm if this is excused absence.",
      timestamp: "2024-07-03T09:15:00Z",
      status: "delivered"
    },
    {
      type: "call",
      direction: "incoming",
      contact: "Michael Johnson",
      subject: "Schedule Change Request",
      content: "Discussed changing Emily\'s batch timing due to transportation issues. Agreed to move to afternoon batch starting next month.",
      timestamp: "2024-07-01T16:45:00Z",
      status: "completed"
    },
    {
      type: "email",
      direction: "incoming",
      contact: "Sarah Johnson",
      subject: "Medical Update",
      content: "Emily\'s asthma is well controlled. Please ensure she has access to her inhaler during physical activities.",
      timestamp: "2024-06-28T11:20:00Z",
      status: "read"
    }
  ];

  const tabs = [
    { id: 'personal', label: 'Personal Information', icon: 'User' },
    { id: 'attendance', label: 'Attendance History', icon: 'Calendar' },
    { id: 'contacts', label: 'Parent Contacts', icon: 'Users' }
  ];

  const handleEditProfile = () => {
    console.log('Edit profile clicked');
  };

  const handleSendNotification = () => {
    console.log('Send notification clicked');
  };

  const handleGenerateReport = () => {
    console.log('Generate report clicked');
  };

  const handleSavePersonalInfo = (formData) => {
    console.log('Saving personal info:', formData);
    // Here you would typically make an API call to save the data
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          
          {/* Student Header */}
          <StudentHeader
            student={studentData}
            onEdit={handleEditProfile}
            onSendNotification={handleSendNotification}
            onGenerateReport={handleGenerateReport}
          />

          {/* Tab Navigation */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="border-b border-border">
              <nav className="flex space-x-8 px-6" aria-label="Tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors animate-hover ${
                      activeTab === tab.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                    }`}
                  >
                    <Icon name={tab.icon} size={16} />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'personal' && (
                <PersonalInfoTab
                  student={studentData}
                  onSave={handleSavePersonalInfo}
                />
              )}
              
              {activeTab === 'attendance' && (
                <AttendanceHistoryTab
                  student={studentData}
                  attendanceData={attendanceData}
                />
              )}
              
              {activeTab === 'contacts' && (
                <ParentContactTab
                  student={studentData}
                  parentContacts={parentContacts}
                  communicationHistory={communicationHistory}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentProfile;