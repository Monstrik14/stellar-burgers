import { FC } from 'react';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useSelector } from '../../services/store';
import { orderSelector } from '../../slices/feedSlice';
import { totalSelector, totalTodaySelector } from '../../slices/feedSlice';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders: TOrder[] = useSelector(orderSelector);
  const feed = {
    total: useSelector(totalSelector),
    totalToday: useSelector(totalTodaySelector)
  };

  const pendingOrders = getOrders(orders, 'pending');
  const readyOrders = getOrders(orders, 'done');

  return (
    <FeedInfoUI
      feed={feed}
      pendingOrders={pendingOrders}
      readyOrders={readyOrders}
    />
  );
};
