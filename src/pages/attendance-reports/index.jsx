import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ReportFilters from './components/ReportFilters';
import MetricsCards from './components/MetricsCards';
import AttendanceChart from './components/AttendanceChart';
import ClassComparisonChart from './components/ClassComparisonChart';
import AttendanceHeatmap from './components/AttendanceHeatmap';
import StudentDataTable from './components/StudentDataTable';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';



const AttendanceReports = () => {
  const [filters, setFilters] = useState({
    startDate: '2025-06-01',
    endDate: '2025-07-12',
    classId: '',
    studentGroup: '',
    attendanceThreshold: ''
  });
  
  const [chartType, setChartType] = useState('line');

  // Remove demo data - start with empty/null values
  const metricsData = {
    overallAttendance: 0,
    attendanceChange: 0,
    totalStudents: 0,
    studentChange: 0,
    classesHeld: 0,
    classChange: 0,
    lowAttendanceAlerts: 0,
    alertChange: 0
  };

  // Remove demo data - start with empty arrays
  const attendanceTrendData = [];
  const classComparisonData = [];

  // Remove demo heatmap data
  const generateHeatmapData = () => {
    return [];
  };

  const heatmapData = generateHeatmapData();

  // Remove demo student data
  const studentData = [];

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // In a real app, this would trigger data refetch
    console.log('Filters updated:', newFilters);
  };

  const handleGenerateReport = () => {
    // In a real app, this would generate and download a PDF report
    console.log('Generating report with filters:', filters);
    alert('Report generation started. You will receive an email when ready.');
  };

  const handleExportData = () => {
    // In a real app, this would export data as CSV/Excel
    console.log('Exporting data with filters:', filters);
    alert('Data export started. Download will begin shortly.');
  };

  const handleChartTypeChange = (type) => {
    setChartType(type);
  };

  useEffect(() => {
    // Set page title
    document.title = 'Attendance Reports - TutionTrack';
  }, []);

  const hasData = studentData.length > 0 || attendanceTrendData.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Attendance Reports
            </h1>
            <p className="text-muted-foreground">
              Comprehensive analytics and insights for attendance tracking and institutional performance.
            </p>
          </div>

          {/* Report Filters */}
          <ReportFilters
            onFilterChange={handleFilterChange}
            onGenerateReport={handleGenerateReport}
            onExportData={handleExportData}
          />

          {hasData ? (
            <>
              {/* Metrics Cards */}
              <MetricsCards metrics={metricsData} />

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <AttendanceChart
                  data={attendanceTrendData}
                  chartType={chartType}
                  onChartTypeChange={handleChartTypeChange}
                />
                <ClassComparisonChart data={classComparisonData} />
              </div>

              {/* Heatmap */}
              <div className="mb-6">
                <AttendanceHeatmap data={heatmapData} />
              </div>

              {/* Student Data Table */}
              <StudentDataTable students={studentData} />
            </>
          ) : (
            <div className="bg-card p-8 rounded-lg border border-border text-center">
              <Icon name="BarChart3" size={64} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Data Available</h3>
              <p className="text-muted-foreground mb-6">Start adding students and marking attendance to generate reports</p>
              <div className="flex justify-center space-x-4">
                <Button
                  variant="default"
                  iconName="Users"
                  iconPosition="left"
                  onClick={() => window.location.href = '/student-management'}
                >
                  Add Students
                </Button>
                <Button
                  variant="outline"
                  iconName="UserCheck"
                  iconPosition="left"
                  onClick={() => window.location.href = '/attendance-marking'}
                >
                  Mark Attendance
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AttendanceReports;