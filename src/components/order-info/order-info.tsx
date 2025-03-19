import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useSelector } from 'react-redux';
import { useDispatch } from '../../services/store';
import { useParams } from 'react-router-dom';
import { orderBurgerThunk, orderSelector } from '../../slices/orderSlice';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector(orderSelector);
  const { number } = useParams<{ number: string }>();

  const order = useSelector((state) =>
    selectOrderByNumber(state, parseInt(number!))
  );

  useEffect(() => {
    if (!order) {
      dispatch(orderBurgerThunk(parseInt(number!)));
    }
  }, [dispatch, number, order]);

  const orderInfo = useMemo(() => {
    if (!order || !ingredients.length) {
      return null;
    }

    const date = new Date(order.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = order.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...order,
      ingredientsInfo,
      date,
      total
    };
  }, [order, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
