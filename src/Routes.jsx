import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import Dashboard from "pages/dashboard";
import AttendanceMarking from "pages/attendance-marking";
import StudentProfile from "pages/student-profile";
import AttendanceReports from "pages/attendance-reports";
import StudentManagement from "pages/student-management";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/attendance-marking" element={<AttendanceMarking />} />
        <Route path="/student-profile" element={<StudentProfile />} />
        <Route path="/attendance-reports" element={<AttendanceReports />} />
        <Route path="/student-management" element={<StudentManagement />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;