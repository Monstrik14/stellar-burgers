import React from 'react';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  return children;
};

export default ProtectedRoute;
