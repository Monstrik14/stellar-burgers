import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from 'react-redux';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      dispatch({
        type: 'MOVE_INGREDIENT_DOWN',
        payload: { index }
      });
    };

    const handleMoveUp = () => {
      dispatch({
        type: 'MOVE_INGREDIENT_UP',
        payload: { index }
      });
    };

    const handleClose = () => {
      dispatch({
        type: 'REMOVE_INGREDIENT',
        payload: { index }
      });
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
