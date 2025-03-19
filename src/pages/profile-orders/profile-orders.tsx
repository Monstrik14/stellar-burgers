import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userOrdersSelector } from 'src/slices/userSlice';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(userOrdersSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'GET_USER_ORDERS' });
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
