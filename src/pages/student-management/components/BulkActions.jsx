import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const BulkActions = ({ 
  selectedCount, 
  onExportSelected, 
  onSendNotifications, 
  onArchiveSelected,
  onDeleteSelected,
  onClearSelection 
}) => {
  const [bulkAction, setBulkAction] = useState('');

  const bulkActionOptions = [
    { value: '', label: 'Bulk Actions' },
    { value: 'export', label: 'Export Selected' },
    { value: 'notify', label: 'Send Notifications' },
    { value: 'archive', label: 'Archive Students' },
    { value: 'delete', label: 'Delete Students' }
  ];

  const handleBulkAction = (action) => {
    switch (action) {
      case 'export':
        onExportSelected();
        break;
      case 'notify':
        onSendNotifications();
        break;
      case 'archive':
        onArchiveSelected();
        break;
      case 'delete':
        onDeleteSelected();
        break;
      default:
        break;
    }
    setBulkAction('');
  };

  if (selectedCount === 0) {
    return null;
  }

  return (
    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Icon name="CheckCircle" size={20} className="text-primary" />
            <span className="text-sm font-medium text-foreground">
              {selectedCount} student{selectedCount !== 1 ? 's' : ''} selected
            </span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
            iconName="X"
            iconPosition="left"
            className="text-muted-foreground hover:text-foreground"
          >
            Clear Selection
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Select
            placeholder="Choose action"
            options={bulkActionOptions}
            value={bulkAction}
            onChange={handleBulkAction}
            className="w-48"
          />

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onExportSelected}
              iconName="Download"
              iconPosition="left"
            >
              Export
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={onSendNotifications}
              iconName="Mail"
              iconPosition="left"
            >
              Notify
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkActions;