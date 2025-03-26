import { Navigate, useLocation } from 'react-router';

import { useSelector } from '../../services/store';
import {
  isAuthCheckedSelector,
  loginUserRequestSelector,
  userSelector
} from '../../slices/userSlice';
import { Preloader } from '../ui/preloader';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  component: JSX.Element;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  component
}: ProtectedRouteProps): JSX.Element => {
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
  return component;
};
