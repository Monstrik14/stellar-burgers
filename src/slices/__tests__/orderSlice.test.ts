import orderReducer, {
  orderBurgerThunk,
  clearOrder,
  initialState,
  isOrderLoadingSelector,
  orderSelector
} from '../orderSlice';

describe('orderSlice', () => {
  test('should return initial state for unknown action', () => {
    const state = orderReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(initialState);
  });

  test('should handle orderBurgerThunk.pending', () => {
    const action = { type: orderBurgerThunk.pending.type };
    const state = orderReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isOrderLoading: true
    });
  });

  test('should handle orderBurgerThunk.fulfilled', () => {
    const orderMock = {
      _id: 'order1',
      ingredients: ['ing1', 'ing2'],
      status: 'done',
      name: 'Test Burger',
      number: 12345,
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01'
    };

    const action = {
      type: orderBurgerThunk.fulfilled.type,
      payload: { order: orderMock }
    };

    const state = orderReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      order: orderMock,
      isOrderLoading: false,
      error: null
    });
  });

  test('should handle orderBurgerThunk.rejected', () => {
    const action = {
      type: orderBurgerThunk.rejected.type,
      error: { message: 'Failed to create order' }
    };

    const state = orderReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isOrderLoading: false,
      error: 'Failed to create order'
    });
  });

  test('should handle clearOrder action', () => {
    const stateWithOrder = {
      ...initialState,
      order: {
        _id: 'order1',
        ingredients: ['ing1', 'ing2'],
        status: 'done',
        name: 'Test Burger',
        number: 12345,
        createdAt: '2023-01-01',
        updatedAt: '2023-01-01'
      },
      isOrderLoading: true
    };

    const state = orderReducer(stateWithOrder, clearOrder());
    expect(state).toEqual(initialState);
  });

  describe('selectors', () => {
    const testState = {
      order: {
        _id: 'order1',
        ingredients: ['ing1', 'ing2'],
        status: 'done',
        name: 'Test Burger',
        number: 12345,
        createdAt: '2023-01-01',
        updatedAt: '2023-01-01'
      },
      isOrderLoading: true,
      error: null
    };
  });
});
