import { Navigate, useLocation } from 'react-router';

import { useSelector } from '../../services/store';
import {
  isAuthCheckedSelector,
  userSelector,
  loginUserRequestSelector
} from '../../slices/userSlice';
import { Preloader } from '../ui/preloader';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children?: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  const loginRequest = useSelector(loginUserRequestSelector);
  const isAuth = useSelector(isAuthCheckedSelector);
  const location = useLocation();
  const user = useSelector(userSelector);

  if (loginRequest && !isAuth) {
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
