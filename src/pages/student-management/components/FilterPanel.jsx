import React from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FilterPanel = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  onSaveFilter,
  savedFilters,
  onLoadFilter 
}) => {
  const classOptions = [
    { value: '', label: 'All Classes' },
    { value: 'Grade 1', label: 'Grade 1' },
    { value: 'Grade 2', label: 'Grade 2' },
    { value: 'Grade 3', label: 'Grade 3' },
    { value: 'Grade 4', label: 'Grade 4' },
    { value: 'Grade 5', label: 'Grade 5' },
    { value: 'Grade 6', label: 'Grade 6' },
    { value: 'Grade 7', label: 'Grade 7' },
    { value: 'Grade 8', label: 'Grade 8' },
    { value: 'Grade 9', label: 'Grade 9' },
    { value: 'Grade 10', label: 'Grade 10' }
  ];

  const attendanceRangeOptions = [
    { value: '', label: 'All Attendance' },
    { value: '90-100', label: '90-100% (Excellent)' },
    { value: '75-89', label: '75-89% (Good)' },
    { value: '60-74', label: '60-74% (Average)' },
    { value: '0-59', label: 'Below 60% (Poor)' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'suspended', label: 'Suspended' }
  ];

  const savedFilterOptions = savedFilters.map(filter => ({
    value: filter.id,
    label: filter.name
  }));

  const hasActiveFilters = filters.class || filters.attendanceRange || filters.status;

  return (
    <div className="bg-card rounded-lg border border-border p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="flex-1 min-w-0">
            <Select
              placeholder="Filter by class"
              options={classOptions}
              value={filters.class}
              onChange={(value) => onFilterChange('class', value)}
              className="w-full"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <Select
              placeholder="Filter by attendance"
              options={attendanceRangeOptions}
              value={filters.attendanceRange}
              onChange={(value) => onFilterChange('attendanceRange', value)}
              className="w-full"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <Select
              placeholder="Filter by status"
              options={statusOptions}
              value={filters.status}
              onChange={(value) => onFilterChange('status', value)}
              className="w-full"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {savedFilterOptions.length > 0 && (
            <Select
              placeholder="Load saved filter"
              options={savedFilterOptions}
              value=""
              onChange={onLoadFilter}
              className="w-48"
            />
          )}
          
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={onSaveFilter}
              iconName="Save"
              iconPosition="left"
            >
              Save Filter
            </Button>
          )}
          
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
            >
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            
            {filters.class && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
                Class: {filters.class}
                <button
                  onClick={() => onFilterChange('class', '')}
                  className="hover:bg-primary/20 rounded-full p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            
            {filters.attendanceRange && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-accent/10 text-accent rounded-md text-sm">
                Attendance: {attendanceRangeOptions.find(opt => opt.value === filters.attendanceRange)?.label}
                <button
                  onClick={() => onFilterChange('attendanceRange', '')}
                  className="hover:bg-accent/20 rounded-full p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            
            {filters.status && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-secondary/10 text-secondary rounded-md text-sm">
                Status: {statusOptions.find(opt => opt.value === filters.status)?.label}
                <button
                  onClick={() => onFilterChange('status', '')}
                  className="hover:bg-secondary/20 rounded-full p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;