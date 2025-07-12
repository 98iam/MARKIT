import React from 'react';
import Button from '../../../components/ui/Button';


const NavigationControls = ({ 
  onPrevious, 
  onNext, 
  onMarkPresent, 
  onMarkAbsent, 
  onMarkAllPresent,
  onUndo,
  canUndo,
  hasPrevious, 
  hasNext,
  currentStudent 
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Main Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="lg"
          onClick={onPrevious}
          disabled={!hasPrevious}
          iconName="ChevronLeft"
          iconPosition="left"
          className="min-w-[120px]"
        >
          Previous
        </Button>

        <div className="flex items-center space-x-4">
          <Button
            variant="destructive"
            size="lg"
            onClick={onMarkAbsent}
            iconName="X"
            iconPosition="left"
            className="min-w-[120px]"
          >
            Mark Absent
          </Button>
          
          <Button
            variant="success"
            size="lg"
            onClick={onMarkPresent}
            iconName="Check"
            iconPosition="left"
            className="min-w-[120px]"
          >
            Mark Present
          </Button>
        </div>

        <Button
          variant="outline"
          size="lg"
          onClick={onNext}
          disabled={!hasNext}
          iconName="ChevronRight"
          iconPosition="right"
          className="min-w-[120px]"
        >
          Next
        </Button>
      </div>

      {/* Secondary Actions */}
      <div className="flex items-center justify-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onUndo}
          disabled={!canUndo}
          iconName="Undo"
          iconPosition="left"
        >
          Undo Last
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={onMarkAllPresent}
          iconName="CheckCheck"
          iconPosition="left"
        >
          Mark All Present
        </Button>
      </div>

      {/* Current Student Info */}
      {currentStudent && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Currently marking: <span className="font-medium text-foreground">{currentStudent.name}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default NavigationControls;