import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const StudentDataTable = ({ students }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const totalPages = Math.ceil(sortedStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStudents = sortedStudents.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getAttendanceColor = (percentage) => {
    if (percentage >= 90) return 'text-success';
    if (percentage >= 80) return 'text-warning';
    return 'text-destructive';
  };

  const getAttendanceBadge = (percentage) => {
    if (percentage >= 90) return 'bg-success/10 text-success border-success/20';
    if (percentage >= 80) return 'bg-warning/10 text-warning border-warning/20';
    return 'bg-destructive/10 text-destructive border-destructive/20';
  };

  const getTrendIcon = (trend) => {
    if (trend > 0) return { icon: 'TrendingUp', color: 'text-success' };
    if (trend < 0) return { icon: 'TrendingDown', color: 'text-destructive' };
    return { icon: 'Minus', color: 'text-muted-foreground' };
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center">
            <Icon name="Users" size={20} className="mr-2" />
            Student Attendance Records
          </h3>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
              <Icon 
                name="Search" 
                size={16} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
            </div>
            
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
            >
              Export
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 hover:text-primary transition-colors"
                >
                  <span>Student Name</span>
                  <Icon 
                    name={sortField === 'name' && sortDirection === 'desc' ? 'ChevronDown' : 'ChevronUp'} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('class')}
                  className="flex items-center space-x-1 hover:text-primary transition-colors"
                >
                  <span>Class</span>
                  <Icon 
                    name={sortField === 'class' && sortDirection === 'desc' ? 'ChevronDown' : 'ChevronUp'} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="text-center p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('attendancePercentage')}
                  className="flex items-center space-x-1 hover:text-primary transition-colors"
                >
                  <span>Attendance %</span>
                  <Icon 
                    name={sortField === 'attendancePercentage' && sortDirection === 'desc' ? 'ChevronDown' : 'ChevronUp'} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="text-center p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('absentDays')}
                  className="flex items-center space-x-1 hover:text-primary transition-colors"
                >
                  <span>Absent Days</span>
                  <Icon 
                    name={sortField === 'absentDays' && sortDirection === 'desc' ? 'ChevronDown' : 'ChevronUp'} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="text-center p-4 font-medium text-foreground">Trend</th>
              <th className="text-center p-4 font-medium text-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedStudents.map((student, index) => {
              const trendInfo = getTrendIcon(student.trend);
              return (
                <tr key={student.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{student.name}</p>
                        <p className="text-sm text-muted-foreground">ID: {student.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-foreground">{student.class}</span>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`text-lg font-semibold ${getAttendanceColor(student.attendancePercentage)}`}>
                      {student.attendancePercentage}%
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-sm text-foreground">{student.absentDays}</span>
                  </td>
                  <td className="p-4 text-center">
                    <div className={`flex items-center justify-center ${trendInfo.color}`}>
                      <Icon name={trendInfo.icon} size={16} />
                      <span className="ml-1 text-sm">{Math.abs(student.trend)}%</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getAttendanceBadge(student.attendancePercentage)}`}>
                      {student.attendancePercentage >= 90 ? 'Excellent' : 
                       student.attendancePercentage >= 80 ? 'Good' : 'Needs Attention'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-border flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedStudents.length)} of {sortedStudents.length} students
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            iconName="ChevronLeft"
            iconPosition="left"
          >
            Previous
          </Button>
          
          <div className="flex items-center space-x-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                    currentPage === page
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            iconName="ChevronRight"
            iconPosition="right"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentDataTable;