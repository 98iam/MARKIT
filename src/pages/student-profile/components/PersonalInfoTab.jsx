import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const PersonalInfoTab = ({ student, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: student.name,
    email: student.email,
    phone: student.phone,
    address: student.address,
    dateOfBirth: student.dateOfBirth,
    gender: student.gender,
    bloodGroup: student.bloodGroup,
    emergencyContact: student.emergencyContact,
    emergencyPhone: student.emergencyPhone,
    medicalConditions: student.medicalConditions
  });

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ];

  const bloodGroupOptions = [
    { value: 'A+', label: 'A+' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B-', label: 'B-' },
    { value: 'AB+', label: 'AB+' },
    { value: 'AB-', label: 'AB-' },
    { value: 'O+', label: 'O+' },
    { value: 'O-', label: 'O-' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onSave(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: student.name,
      email: student.email,
      phone: student.phone,
      address: student.address,
      dateOfBirth: student.dateOfBirth,
      gender: student.gender,
      bloodGroup: student.bloodGroup,
      emergencyContact: student.emergencyContact,
      emergencyPhone: student.emergencyPhone,
      medicalConditions: student.medicalConditions
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
        {!isEditing && (
          <Button
            variant="outline"
            size="sm"
            iconName="Edit"
            iconPosition="left"
            onClick={() => setIsEditing(true)}
          >
            Edit Information
          </Button>
        )}
      </div>

      {/* Basic Information */}
      <div className="bg-muted/30 rounded-lg p-4">
        <h4 className="text-md font-medium text-foreground mb-4 flex items-center gap-2">
          <Icon name="User" size={18} />
          Basic Information
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            disabled={!isEditing}
            required
          />
          
          <Input
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            disabled={!isEditing}
            required
          />
          
          <Input
            label="Phone Number"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            disabled={!isEditing}
            required
          />
          
          <Input
            label="Date of Birth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            disabled={!isEditing}
            required
          />
          
          <Select
            label="Gender"
            options={genderOptions}
            value={formData.gender}
            onChange={(value) => handleInputChange('gender', value)}
            disabled={!isEditing}
            required
          />
          
          <Select
            label="Blood Group"
            options={bloodGroupOptions}
            value={formData.bloodGroup}
            onChange={(value) => handleInputChange('bloodGroup', value)}
            disabled={!isEditing}
          />
        </div>
        
        <div className="mt-4">
          <Input
            label="Address"
            type="text"
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            disabled={!isEditing}
            placeholder="Enter complete address"
          />
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-muted/30 rounded-lg p-4">
        <h4 className="text-md font-medium text-foreground mb-4 flex items-center gap-2">
          <Icon name="Phone" size={18} />
          Emergency Contact
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Emergency Contact Name"
            type="text"
            value={formData.emergencyContact}
            onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
            disabled={!isEditing}
            required
          />
          
          <Input
            label="Emergency Contact Phone"
            type="tel"
            value={formData.emergencyPhone}
            onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
            disabled={!isEditing}
            required
          />
        </div>
      </div>

      {/* Medical Information */}
      <div className="bg-muted/30 rounded-lg p-4">
        <h4 className="text-md font-medium text-foreground mb-4 flex items-center gap-2">
          <Icon name="Heart" size={18} />
          Medical Information
        </h4>
        
        <Input
          label="Medical Conditions"
          type="text"
          value={formData.medicalConditions}
          onChange={(e) => handleInputChange('medicalConditions', e.target.value)}
          disabled={!isEditing}
          placeholder="Any allergies, medical conditions, or special requirements"
          description="Optional: Mention any medical conditions that teachers should be aware of"
        />
      </div>

      {/* Action Buttons */}
      {isEditing && (
        <div className="flex items-center gap-3 pt-4 border-t border-border">
          <Button
            variant="default"
            iconName="Save"
            iconPosition="left"
            onClick={handleSave}
          >
            Save Changes
          </Button>
          <Button
            variant="outline"
            iconName="X"
            iconPosition="left"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default PersonalInfoTab;