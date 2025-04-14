import constructorReducer, {
  addIngredient,
  removeIngredient,
  upIngredient,
  downIngredient,
  initialState
} from '../constructorSlice';
import { TConstructorIngredient } from '@utils-types';

describe('constructorSlice', () => {
  initialState

  const mockBun: TConstructorIngredient = {
    id: 'uuid1',
    _id: '1',
    name: 'Булка',
    type: 'bun',
    price: 100,
    proteins: 10,
    fat: 5,
    carbohydrates: 40,
    calories: 200,
    image: 'bun-image.png',
    image_large: 'bun-image-large.png',
    image_mobile: 'bun-image-mobile.png'
  };

  const mockIngredient: TConstructorIngredient = {
    id: 'uuid2',
    _id: '2',
    name: 'Котлета',
    type: 'main',
    price: 50,
    proteins: 20,
    fat: 10,
    carbohydrates: 30,
    calories: 150,
    image: 'ingredient-image.png',
    image_large: 'ingredient-image-large.png',
    image_mobile: 'ingredient-image-mobile.png'
  };

  it('инициализируется с корректным состоянием', () => {
    expect(constructorReducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      initialState
    );
  });


  it('добавляет ингредиент', () => {
    const state = constructorReducer(
      initialState,
      addIngredient(mockIngredient)
    );
    expect(state.burgerConstructor.ingredients).toHaveLength(1);
    expect(state.burgerConstructor.ingredients[0]).toEqual(
      expect.objectContaining({
        _id: mockIngredient._id,
        name: mockIngredient.name,
        type: mockIngredient.type,
        price: mockIngredient.price,
        proteins: mockIngredient.proteins,
        fat: mockIngredient.fat,
        carbohydrates: mockIngredient.carbohydrates,
        calories: mockIngredient.calories,
        image: mockIngredient.image,
        image_large: mockIngredient.image_large,
        image_mobile: mockIngredient.image_mobile
      })
    );
  });

  it('удаляет ингредиент', () => {
    const stateWithIngredient = {
      ...initialState,
      constructorItems: { bun: null, ingredients: [mockIngredient] }
    };

    const state = constructorReducer(
      stateWithIngredient,
      removeIngredient(mockIngredient)
    );
    expect(state.burgerConstructor.ingredients).toHaveLength(0);
  });
});
