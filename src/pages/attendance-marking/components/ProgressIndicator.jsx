import React from 'react';


const ProgressIndicator = ({ current, total, presentCount, absentCount }) => {
  const progressPercentage = (current / total) * 100;
  
  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {/* Progress Bar */}
      <div className="relative">
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="absolute -top-8 left-0 right-0 flex justify-between items-center">
          <span className="text-sm font-medium text-foreground">
            {current} of {total} students marked
          </span>
          <span className="text-sm text-muted-foreground">
            {Math.round(progressPercentage)}% complete
          </span>
        </div>
      </div>

      {/* Statistics */}
      <div className="flex items-center justify-center space-x-8">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-success"></div>
          <span className="text-sm font-medium text-foreground">Present: {presentCount}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-destructive"></div>
          <span className="text-sm font-medium text-foreground">Absent: {absentCount}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-muted-foreground"></div>
          <span className="text-sm font-medium text-foreground">Pending: {total - current}</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;