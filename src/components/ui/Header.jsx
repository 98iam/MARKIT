import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Attendance', path: '/attendance-marking', icon: 'UserCheck' },
    { label: 'Students', path: '/student-management', icon: 'Users' },
    { label: 'Reports', path: '/attendance-reports', icon: 'BarChart3' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleProfileToggle = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    // Logout logic here
    console.log('Logout clicked');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-1000">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="GraduationCap" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground">TutionTrack</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors animate-hover ${
                isActive(item.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={item.icon} size={16} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={handleMobileMenuToggle}
          >
            <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={20} />
          </Button>

          {/* User Profile Dropdown */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleProfileToggle}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <span className="hidden sm:block text-sm font-medium">Admin</span>
              <Icon name="ChevronDown" size={16} />
            </Button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-modal z-1010 animate-state">
                <div className="p-2">
                  <div className="px-3 py-2 border-b border-border">
                    <p className="text-sm font-medium text-foreground">Administrator</p>
                    <p className="text-xs text-muted-foreground">admin@tutiontrack.com</p>
                  </div>
                  <div className="mt-2 space-y-1">
                    <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md animate-hover">
                      <Icon name="Settings" size={16} />
                      <span>Settings</span>
                    </button>
                    <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md animate-hover">
                      <Icon name="HelpCircle" size={16} />
                      <span>Help</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-md animate-hover"
                    >
                      <Icon name="LogOut" size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border animate-state">
          <nav className="p-4 space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors animate-hover ${
                  isActive(item.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;