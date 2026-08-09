import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const StaffRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d0d0d] text-white">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated || !user?.is_staff) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default StaffRoute;
