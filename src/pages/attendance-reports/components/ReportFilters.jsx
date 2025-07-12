import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ReportFilters = ({ onFilterChange, onGenerateReport, onExportData }) => {
  const [filters, setFilters] = useState({
    startDate: '2025-06-01',
    endDate: '2025-07-12',
    classId: '',
    studentGroup: '',
    attendanceThreshold: ''
  });

  const classOptions = [
    { value: '', label: 'All Classes' },
    { value: 'math-101', label: 'Mathematics 101' },
    { value: 'physics-201', label: 'Physics 201' },
    { value: 'chemistry-301', label: 'Chemistry 301' },
    { value: 'biology-401', label: 'Biology 401' },
    { value: 'english-501', label: 'English Literature' }
  ];

  const studentGroupOptions = [
    { value: '', label: 'All Students' },
    { value: 'morning', label: 'Morning Batch' },
    { value: 'afternoon', label: 'Afternoon Batch' },
    { value: 'evening', label: 'Evening Batch' },
    { value: 'weekend', label: 'Weekend Batch' }
  ];

  const thresholdOptions = [
    { value: '', label: 'All Attendance' },
    { value: '90', label: 'Above 90%' },
    { value: '80', label: 'Above 80%' },
    { value: '70', label: 'Above 70%' },
    { value: '60', label: 'Below 60%' }
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      startDate: '2025-06-01',
      endDate: '2025-07-12',
      classId: '',
      studentGroup: '',
      attendanceThreshold: ''
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground flex items-center">
          <Icon name="Filter" size={20} className="mr-2" />
          Report Filters
        </h2>
        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
          iconName="RotateCcw"
          iconPosition="left"
        >
          Reset
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div>
          <Input
            label="Start Date"
            type="date"
            value={filters.startDate}
            onChange={(e) => handleFilterChange('startDate', e.target.value)}
          />
        </div>

        <div>
          <Input
            label="End Date"
            type="date"
            value={filters.endDate}
            onChange={(e) => handleFilterChange('endDate', e.target.value)}
          />
        </div>

        <div>
          <Select
            label="Class"
            options={classOptions}
            value={filters.classId}
            onChange={(value) => handleFilterChange('classId', value)}
            placeholder="Select class"
          />
        </div>

        <div>
          <Select
            label="Student Group"
            options={studentGroupOptions}
            value={filters.studentGroup}
            onChange={(value) => handleFilterChange('studentGroup', value)}
            placeholder="Select group"
          />
        </div>

        <div>
          <Select
            label="Attendance Rate"
            options={thresholdOptions}
            value={filters.attendanceThreshold}
            onChange={(value) => handleFilterChange('attendanceThreshold', value)}
            placeholder="Filter by rate"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="default"
          onClick={onGenerateReport}
          iconName="BarChart3"
          iconPosition="left"
          className="flex-1 sm:flex-none"
        >
          Generate Report
        </Button>
        <Button
          variant="outline"
          onClick={onExportData}
          iconName="Download"
          iconPosition="left"
          className="flex-1 sm:flex-none"
        >
          Export Data
        </Button>
      </div>
    </div>
  );
};

export default ReportFilters;