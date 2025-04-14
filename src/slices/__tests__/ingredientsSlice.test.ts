import ingredientsReducer, {
  getIngredientsThunk,
  initialState
} from '../ingredientsSlice';

describe('ingredientsSlice', () => {
  test('should return initial state for unknown action', () => {
    const state = ingredientsReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(initialState);
  });

  test('should handle getIngredients.pending', () => {
    const action = { type: getIngredientsThunk.pending.type };
    const state = ingredientsReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isIngredientsLoading: true,
      error: null
    });
  });

  test('should handle getIngredients.fulfilled', () => {
    const ingredientsMock = [
      {
        _id: 'ingredient1',
        name: 'Bun',
        type: 'bun',
        proteins: 10,
        fat: 20,
        carbohydrates: 30,
        calories: 250,
        price: 100,
        image: 'https://example.com/image1.png',
        image_mobile: 'https://example.com/image1-mobile.png',
        image_large: 'https://example.com/image1-large.png',
        __v: 0
      },
      {
        _id: 'ingredient2',
        name: 'Patty',
        type: 'main',
        proteins: 50,
        fat: 40,
        carbohydrates: 20,
        calories: 400,
        price: 200,
        image: 'https://example.com/image2.png',
        image_mobile: 'https://example.com/image2-mobile.png',
        image_large: 'https://example.com/image2-large.png',
        __v: 0
      }
    ];

    const action = {
      type: getIngredientsThunk.fulfilled.type,
      payload: ingredientsMock
    };

    const state = ingredientsReducer(initialState, action);
    
    expect(state).toEqual({
      ...initialState,
      ingredients: ingredientsMock,
      isIngredientsLoading: false,
      error: null
      // Убрано поле bun, так как его нет в реальном состоянии
    });
  });

  test('should handle getIngredients.rejected', () => {
    const action = {
      type: getIngredientsThunk.rejected.type,
      error: { message: 'Ошибка' }
    };
    const state = ingredientsReducer(initialState, action);
    
    expect(state).toEqual({
      ...initialState,
      error: 'Ошибка',
      isIngredientsLoading: false
    });
  });
});
