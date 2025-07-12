import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const ParentContactTab = ({ student, parentContacts, communicationHistory }) => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMessageTypeIcon = (type) => {
    switch (type) {
      case 'email':
        return 'Mail';
      case 'sms':
        return 'MessageSquare';
      case 'call':
        return 'Phone';
      case 'meeting':
        return 'Users';
      default:
        return 'MessageCircle';
    }
  };

  const getMessageTypeColor = (type) => {
    switch (type) {
      case 'email':
        return 'text-blue-600';
      case 'sms':
        return 'text-green-600';
      case 'call':
        return 'text-purple-600';
      case 'meeting':
        return 'text-orange-600';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Parent/Guardian Contacts</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Parent Contacts */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-foreground flex items-center gap-2">
            <Icon name="Users" size={18} />
            Contact Information
          </h4>

          {parentContacts.map((contact, index) => (
            <div key={index} className="bg-card border border-border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h5 className="font-medium text-foreground">{contact.name}</h5>
                  <p className="text-sm text-muted-foreground">{contact.relationship}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Edit"
                  onClick={() => setIsEditing(true)}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Mail" size={14} className="text-muted-foreground" />
                  <span className="text-foreground">{contact.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Phone" size={14} className="text-muted-foreground" />
                  <span className="text-foreground">{contact.phone}</span>
                </div>
                {contact.workPhone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="Briefcase" size={14} className="text-muted-foreground" />
                    <span className="text-foreground">{contact.workPhone}</span>
                  </div>
                )}
              </div>

              {/* Notification Preferences */}
              <div className="pt-3 border-t border-border">
                <p className="text-xs font-medium text-muted-foreground mb-2">Notification Preferences</p>
                <div className="space-y-1">
                  <Checkbox
                    label="Email notifications"
                    checked={contact.preferences.email}
                    size="sm"
                    disabled
                  />
                  <Checkbox
                    label="SMS notifications"
                    checked={contact.preferences.sms}
                    size="sm"
                    disabled
                  />
                  <Checkbox
                    label="Call for emergencies"
                    checked={contact.preferences.calls}
                    size="sm"
                    disabled
                  />
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Mail"
                  iconPosition="left"
                  onClick={() => setSelectedContact(contact)}
                >
                  Email
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Phone"
                  iconPosition="left"
                >
                  Call
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="MessageSquare"
                  iconPosition="left"
                >
                  SMS
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Communication History */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-md font-medium text-foreground flex items-center gap-2">
              <Icon name="MessageCircle" size={18} />
              Communication History
            </h4>
            <Button
              variant="outline"
              size="sm"
              iconName="Plus"
              iconPosition="left"
            >
              New Message
            </Button>
          </div>

          {/* Quick Message */}
          <div className="bg-muted/30 rounded-lg p-4 space-y-3">
            <Input
              label="Send Quick Message"
              type="text"
              placeholder="Type your message here..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <div className="flex gap-2">
              <Button
                variant="default"
                size="sm"
                iconName="Send"
                iconPosition="left"
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
              >
                Send
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Paperclip"
                iconPosition="left"
              >
                Attach
              </Button>
            </div>
          </div>

          {/* Message History */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {communicationHistory.map((message, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon 
                      name={getMessageTypeIcon(message.type)} 
                      size={16} 
                      className={getMessageTypeColor(message.type)} 
                    />
                    <span className="text-sm font-medium text-foreground">
                      {message.direction === 'outgoing' ? 'To' : 'From'} {message.contact}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(message.timestamp)}
                  </span>
                </div>
                
                <p className="text-sm text-foreground mb-2">{message.subject}</p>
                <p className="text-xs text-muted-foreground">{message.content}</p>
                
                {message.status && (
                  <div className="flex items-center gap-1 mt-2">
                    <Icon 
                      name={message.status === 'delivered' ? 'Check' : message.status === 'read' ? 'CheckCheck' : 'Clock'} 
                      size={12} 
                      className="text-muted-foreground" 
                    />
                    <span className="text-xs text-muted-foreground capitalize">{message.status}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency Contact Card */}
      <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
        <h4 className="text-md font-medium text-foreground flex items-center gap-2 mb-3">
          <Icon name="AlertTriangle" size={18} className="text-warning" />
          Emergency Contact Protocol
        </h4>
        <div className="text-sm text-foreground space-y-1">
          <p>• Primary contact: {parentContacts[0]?.name} ({parentContacts[0]?.phone})</p>
          <p>• Secondary contact: {parentContacts[1]?.name} ({parentContacts[1]?.phone})</p>
          <p>• In case of emergency, both contacts will be notified simultaneously</p>
          <p>• Medical emergency contact: {student.emergencyContact} ({student.emergencyPhone})</p>
        </div>
      </div>
    </div>
  );
};

export default ParentContactTab;