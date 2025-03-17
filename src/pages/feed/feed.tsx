import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeed, ordersSelector } from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  const orders = useSelector(ordersSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeed());
  }, []);


  if (!orders.length) {
    return <Preloader />;
  }


  return <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};

