import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router';
import {
  isAuthCheckedSelector,
  loginUserRequestSelector
} from '../../slices/userSlice';
import { Preloader } from '../ui/preloader';
import { useEffect } from 'react';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(isAuthCheckedSelector);
  const loginUserRequest = useSelector(loginUserRequestSelector);
  const location = useLocation();

  useEffect(() => {}, [isAuthChecked, loginUserRequest]);

  if (!isAuthChecked && loginUserRequest) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !isAuthChecked) {
    return <Navigate replace to='/login' state={{ from: location }} />; // в
  }

  if (onlyUnAuth && isAuthChecked) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} state={location} />;
  }
  return children;
};
