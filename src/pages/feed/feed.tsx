import { FC, useEffect } from 'react';
import { Preloader } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import {
  resetOrders,
  getFeedsThunk,
  orderSelector
} from '../../slices/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(orderSelector);

  useEffect(() => {
    dispatch(getFeedsThunk());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  const handleRestoreFeeds = () => {
    dispatch(resetOrders());
    dispatch(getFeedsThunk());
  };

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        handleRestoreFeeds();
      }}
    />
  );
};
