import { FC, useEffect } from 'react';

import { Preloader } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import { fetchOrders, selectedOrders } from '../../slices/feedSlice';
import { FeedUI } from '@ui-pages';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectedOrders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(fetchOrders());
      }}
    />
  );
};
