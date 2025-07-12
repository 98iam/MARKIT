import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const AbsenceReasonModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  studentName,
  studentRollNo 
}) => {
  const [reason, setReason] = useState('');
  const [selectedReason, setSelectedReason] = useState('');

  const predefinedReasons = [
    'Sick/Illness',
    'Family Emergency',
    'Medical Appointment',
    'Transportation Issues',
    'Personal Emergency',
    'Family Function',
    'Other'
  ];

  const handleSubmit = () => {
    const finalReason = selectedReason === 'Other' ? reason : selectedReason;
    if (!finalReason.trim()) {
      alert('Please provide a reason for absence');
      return;
    }
    onSubmit(finalReason);
    setReason('');
    setSelectedReason('');
    onClose();
  };

  const handleClose = () => {
    setReason('');
    setSelectedReason('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg border border-border w-full max-w-md shadow-xl">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Absence Reason Required</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Student: {studentName} (Roll No: {studentRollNo})
              </p>
            </div>
            <button
              onClick={handleClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-sm text-muted-foreground">
            As per Guidance organization rules, students must provide a reason for absence.
          </p>

          {/* Predefined Reasons */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Select Reason:</label>
            <div className="grid grid-cols-1 gap-2">
              {predefinedReasons.map((reasonOption) => (
                <button
                  key={reasonOption}
                  onClick={() => setSelectedReason(reasonOption)}
                  className={`p-3 text-left rounded-lg border transition-all ${
                    selectedReason === reasonOption
                      ? 'border-primary bg-primary/10 text-primary' :'border-border bg-muted/50 hover:bg-muted text-foreground'
                  }`}
                >
                  {reasonOption}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Reason Input */}
          {selectedReason === 'Other' && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Custom Reason:</label>
              <Input
                placeholder="Please specify the reason for absence..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border flex space-x-3">
          <Button
            variant="outline"
            onClick={handleClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleSubmit}
            className="flex-1"
            disabled={!selectedReason || (selectedReason === 'Other' && !reason.trim())}
          >
            Mark Absent
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AbsenceReasonModal;