import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isOrderLoadingSelector, orderSelector } from '../../slices/orderSlice';
import { burgerConstructorSelector } from '../../slices/constructorSlice';
import { isAuthCheckedSelector } from '../../slices/userSlice';
import { clearBurgerConstructor } from '../../slices/constructorSlice';
import { clearOrder, orderBurgerThunk } from '../../slices/orderSlice';
import { AppDispatch } from '../../services/store';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(burgerConstructorSelector);
  const orderRequest = useSelector(isOrderLoadingSelector);
  const orderModalData = useSelector(orderSelector);
  const isAuthenticated = useSelector(isAuthCheckedSelector);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const onOrderClick = () => {
    if (!isAuthenticated) {
      return navigate('/login');
    }

    const { bun, ingredients } = constructorItems;
    if (!constructorItems.bun || orderRequest) return;
    const orderData: string[] = [
      bun?._id!,
      ...ingredients.map((ingredient) => ingredient._id),
      bun?._id!
    ];
    dispatch(orderBurgerThunk(orderData));
  };
  const closeOrderModal = () => {
    navigate('/', { replace: true });
    dispatch(clearOrder());
    dispatch(clearBurgerConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
