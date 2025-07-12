import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const SessionControls = ({ 
  onSearch, 
  onPauseResume, 
  onComplete,
  isPaused,
  searchQuery,
  onSearchChange,
  totalStudents,
  markedStudents 
}) => {
  const [showSearch, setShowSearch] = useState(false);

  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
    if (showSearch && searchQuery) {
      onSearchChange('');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {/* Top Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSearchToggle}
            iconName="Search"
            iconPosition="left"
          >
            {showSearch ? 'Hide Search' : 'Search Student'}
          </Button>

          <Button
            variant={isPaused ? "success" : "warning"}
            size="sm"
            onClick={onPauseResume}
            iconName={isPaused ? "Play" : "Pause"}
            iconPosition="left"
          >
            {isPaused ? 'Resume' : 'Pause'}
          </Button>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </span>
          
          <Button
            variant="primary"
            size="sm"
            onClick={onComplete}
            disabled={markedStudents < totalStudents}
            iconName="CheckCircle"
            iconPosition="left"
          >
            Complete Session
          </Button>
        </div>
      </div>

      {/* Search Input */}
      {showSearch && (
        <div className="animate-state">
          <Input
            type="search"
            placeholder="Search by student name or ID..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full"
          />
        </div>
      )}

      {/* Session Status */}
      {isPaused && (
        <div className="flex items-center justify-center space-x-2 p-3 bg-warning/10 border border-warning/20 rounded-lg">
          <Icon name="Pause" size={16} color="var(--color-warning)" />
          <span className="text-sm font-medium text-warning">Session Paused</span>
        </div>
      )}
    </div>
  );
};

export default SessionControls;