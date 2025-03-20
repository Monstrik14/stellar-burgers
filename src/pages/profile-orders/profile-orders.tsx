import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getOrdersThunk, userOrdersSelector } from '../../slices/userSlice';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(userOrdersSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      getOrdersThunk,
      type: ''
    });
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
