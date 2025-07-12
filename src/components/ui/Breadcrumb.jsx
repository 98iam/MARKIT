import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = () => {
  const location = useLocation();
  
  const getBreadcrumbItems = () => {
    const path = location.pathname;
    const items = [];

    // Define breadcrumb mappings
    const breadcrumbMap = {
      '/dashboard': [{ label: 'Dashboard', path: '/dashboard' }],
      '/attendance-marking': [
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Attendance Marking', path: '/attendance-marking' }
      ],
      '/student-management': [
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Students', path: '/student-management' }
      ],
      '/student-profile': [
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Students', path: '/student-management' },
        { label: 'Student Profile', path: '/student-profile' }
      ],
      '/attendance-reports': [
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Reports', path: '/attendance-reports' }
      ]
    };

    return breadcrumbMap[path] || [{ label: 'Dashboard', path: '/dashboard' }];
  };

  const breadcrumbItems = getBreadcrumbItems();

  // Don't show breadcrumb on dashboard
  if (location.pathname === '/dashboard') {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={item.path}>
          {index > 0 && (
            <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
          )}
          {index === breadcrumbItems.length - 1 ? (
            <span className="text-foreground font-medium">{item.label}</span>
          ) : (
            <Link
              to={item.path}
              className="hover:text-foreground transition-colors animate-hover"
            >
              {item.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;