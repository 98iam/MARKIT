import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

import { Checkbox } from '../../../components/ui/Checkbox';

const StudentTable = ({ 
  students, 
  selectedStudents, 
  onSelectStudent, 
  onSelectAll, 
  onEditStudent, 
  onViewProfile, 
  onViewAttendance,
  sortConfig,
  onSort 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSortIcon = (column) => {
    if (sortConfig.key !== column) return 'ArrowUpDown';
    return sortConfig.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const getAttendanceColor = (percentage) => {
    if (percentage >= 90) return 'text-success';
    if (percentage >= 75) return 'text-warning';
    return 'text-destructive';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-card">
      {/* Search Bar */}
      <div className="p-4 border-b border-border">
        <Input
          type="search"
          placeholder="Search students by name, ID, or class..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="w-12 p-4">
                <Checkbox
                  checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                  indeterminate={selectedStudents.length > 0 && selectedStudents.length < filteredStudents.length}
                  onChange={onSelectAll}
                />
              </th>
              {[
                { key: 'name', label: 'Student Name' },
                { key: 'studentId', label: 'Student ID' },
                { key: 'class', label: 'Class' },
                { key: 'contact', label: 'Contact' },
                { key: 'attendancePercentage', label: 'Attendance' },
                { key: 'lastAttendance', label: 'Last Attendance' },
                { key: 'actions', label: 'Actions' }
              ].map((column) => (
                <th
                  key={column.key}
                  className={`p-4 text-left text-sm font-medium text-muted-foreground ${
                    column.key !== 'actions' && column.key !== 'contact' ? 'cursor-pointer hover:text-foreground' : ''
                  }`}
                  onClick={() => column.key !== 'actions' && column.key !== 'contact' && onSort(column.key)}
                >
                  <div className="flex items-center space-x-2">
                    <span>{column.label}</span>
                    {column.key !== 'actions' && column.key !== 'contact' && (
                      <Icon name={getSortIcon(column.key)} size={14} />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr
                key={student.id}
                className="border-b border-border hover:bg-muted/30 transition-colors animate-hover"
              >
                <td className="p-4">
                  <Checkbox
                    checked={selectedStudents.includes(student.id)}
                    onChange={() => onSelectStudent(student.id)}
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {student.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{student.name}</p>
                      <p className="text-sm text-muted-foreground">{student.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm text-foreground">{student.studentId}</td>
                <td className="p-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-secondary/10 text-secondary">
                    {student.class}
                  </span>
                </td>
                <td className="p-4 text-sm text-foreground">{student.phone}</td>
                <td className="p-4">
                  <span className={`text-sm font-medium ${getAttendanceColor(student.attendancePercentage)}`}>
                    {student.attendancePercentage}%
                  </span>
                </td>
                <td className="p-4 text-sm text-muted-foreground">
                  {formatDate(student.lastAttendance)}
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEditStudent(student)}
                      className="h-8 w-8"
                    >
                      <Icon name="Edit" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onViewProfile(student)}
                      className="h-8 w-8"
                    >
                      <Icon name="User" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onViewAttendance(student)}
                      className="h-8 w-8"
                    >
                      <Icon name="Calendar" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="lg:hidden">
        {filteredStudents.map((student) => (
          <div
            key={student.id}
            className="p-4 border-b border-border last:border-b-0"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={selectedStudents.includes(student.id)}
                  onChange={() => onSelectStudent(student.id)}
                />
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">
                    {student.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-foreground">{student.name}</p>
                  <p className="text-sm text-muted-foreground">{student.studentId}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEditStudent(student)}
                  className="h-8 w-8"
                >
                  <Icon name="Edit" size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onViewProfile(student)}
                  className="h-8 w-8"
                >
                  <Icon name="User" size={16} />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">Class:</span>
                <span className="ml-2 inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-secondary/10 text-secondary">
                  {student.class}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Attendance:</span>
                <span className={`ml-2 font-medium ${getAttendanceColor(student.attendancePercentage)}`}>
                  {student.attendancePercentage}%
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-muted-foreground">Contact:</span>
                <span className="ml-2 text-foreground">{student.phone}</span>
              </div>
              <div className="col-span-2">
                <span className="text-muted-foreground">Last Attendance:</span>
                <span className="ml-2 text-foreground">{formatDate(student.lastAttendance)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Users" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No students found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default StudentTable;