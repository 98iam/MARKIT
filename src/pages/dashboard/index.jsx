import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import AttendanceCard from './components/AttendanceCard';
import CalendarWidget from './components/CalendarWidget';
import RecentActivity from './components/RecentActivity';
import QuickStats from './components/QuickStats';
import UpcomingClasses from './components/UpcomingClasses';
import AttendanceChart from './components/AttendanceChart';

const Dashboard = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Remove demo data - start with empty attendance cards
  const attendanceCards = [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
                <p className="text-muted-foreground">{currentDate}</p>
              </div>
              <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-3">
                <Link to="/attendance-marking">
                  <Button 
                    variant="default" 
                    iconName="UserCheck" 
                    iconPosition="left"
                    className="w-full sm:w-auto"
                  >
                    Start Attendance
                  </Button>
                </Link>
                <Link to="/attendance-reports">
                  <Button 
                    variant="outline" 
                    iconName="BarChart3" 
                    iconPosition="left"
                    className="w-full sm:w-auto"
                  >
                    View Reports
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Attendance Summary Cards */}
          {attendanceCards.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {attendanceCards.map((card, index) => (
                <AttendanceCard
                  key={index}
                  title={card.title}
                  value={card.value}
                  subtitle={card.subtitle}
                  icon={card.icon}
                  color={card.color}
                  trend={card.trend}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-card p-6 rounded-lg border border-border shadow-card">
                <div className="text-center">
                  <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No attendance data available</p>
                  <p className="text-sm text-muted-foreground mt-2">Start marking attendance to see statistics</p>
                </div>
              </div>
            </div>
          )}

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Left Column - Charts and Calendar */}
            <div className="lg:col-span-2 space-y-8">
              <AttendanceChart />
              <CalendarWidget />
            </div>

            {/* Right Column - Sidebar Content */}
            <div className="space-y-8">

            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <QuickStats />
            <RecentActivity />
          </div>

          {/* Quick Actions Footer */}
          <div className="mt-8 bg-card p-6 rounded-lg border border-border shadow-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Link to="/student-management">
                <Button 
                  variant="ghost" 
                  className="w-full h-auto flex-col py-4 space-y-2"
                >
                  <Icon name="Users" size={24} />
                  <span className="text-sm">Manage Students</span>
                </Button>
              </Link>
              <Link to="/attendance-marking">
                <Button 
                  variant="ghost" 
                  className="w-full h-auto flex-col py-4 space-y-2"
                >
                  <Icon name="UserCheck" size={24} />
                  <span className="text-sm">Mark Attendance</span>
                </Button>
              </Link>
              <Link to="/attendance-reports">
                <Button 
                  variant="ghost" 
                  className="w-full h-auto flex-col py-4 space-y-2"
                >
                  <Icon name="FileText" size={24} />
                  <span className="text-sm">Generate Reports</span>
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                className="w-full h-auto flex-col py-4 space-y-2"
              >
                <Icon name="Settings" size={24} />
                <span className="text-sm">Settings</span>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;