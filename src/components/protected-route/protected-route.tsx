// import { useSelector } from '../../services/store';
// import { Navigate, useLocation } from 'react-router';
// import {
//   isAuthCheckedSelector,
//   loginUserRequestSelector
// } from '../../slices/userSlice';
// import { Preloader } from '../ui/preloader';
// import { useEffect } from 'react';

// type ProtectedRouteProps = {
//   onlyUnAuth?: boolean;
//   children: React.ReactElement;
// };

// export const ProtectedRoute = ({
//   onlyUnAuth,
//   children
// }: ProtectedRouteProps) => {
//   const isAuthChecked = useSelector(isAuthCheckedSelector);
//   const loginUserRequest = useSelector(loginUserRequestSelector);
//   const location = useLocation();

//   useEffect(() => {
//     console.log('ProtectedRoute: isAuthChecked =', isAuthChecked);
//     console.log('ProtectedRoute: loginUserRequest =', loginUserRequest);
//   }, [isAuthChecked, loginUserRequest]);

//   if (!isAuthChecked && loginUserRequest) {
//     return <Preloader />;
//   }

//   if (!onlyUnAuth && !isAuthChecked) {
//     return <Navigate replace to='/login' state={{ from: location }} />; // в
//   }

//   if (onlyUnAuth && isAuthChecked) {
//     const from = location.state?.from || { pathname: '/' };
//     return <Navigate replace to={from} state={location} />;
//   }
//   return children;
// };

import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router';
import { isAuthCheckedSelector, authChecked } from '../../slices/userSlice';
import { Preloader } from '../ui/preloader';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(isAuthCheckedSelector);
  const isAuthenticated = useSelector(authChecked);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && isAuthenticated) {
    const from = location.state?.from || '/';
    return <Navigate replace to={from} />;
  }

  return children;
};
