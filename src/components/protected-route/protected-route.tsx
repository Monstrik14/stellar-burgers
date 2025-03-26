import { Navigate, useLocation } from 'react-router';

import { useSelector } from '../../services/store';
import { isAuthCheckedSelector, userSelector } from '../../slices/userSlice';
import { Preloader } from '../ui/preloader';
import { R } from '@storybook/react/dist/types-0fc72a6d';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children?: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(isAuthCheckedSelector);
  const location = useLocation();
  const user = useSelector(userSelector);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state?.from || { pathname: '/' };
    return <Navigate to={from} />;
  }
  return children;
};
