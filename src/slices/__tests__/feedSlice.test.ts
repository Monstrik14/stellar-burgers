import feedReducer, { getFeedsThunk, initialState } from '../feedSlice';

const feedMock = {
  orders: [
    {
      _id: 'order1',
      status: 'done',
      name: 'Burger Deluxe',
      createdAt: '2023-01-01T10:00:00.000Z',
      updatedAt: '2023-01-01T11:00:00.000Z',
      number: 101,
      ingredients: ['ingredient1', 'ingredient2', 'ingredient3']
    },
    {
      _id: 'order2',
      status: 'pending',
      name: 'Veggie Delight',
      createdAt: '2023-01-02T12:00:00.000Z',
      updatedAt: '2023-01-02T13:00:00.000Z',
      number: 102,
      ingredients: ['ingredient4', 'ingredient5']
    }
  ],
  total: 200,
  totalToday: 15
};

describe('feedSlice', () => {
  test('обработка загрузки getFeed.pending', () => {
    const action = { type: getFeedsThunk.pending.type };
    const state = feedReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isFeedsLoading: true,
      error: null
    });
  });

  test('обработка успешного выполнения getFeed.fulfilled', () => {
    const action = {
      type: getFeedsThunk.fulfilled.type,
      payload: feedMock
    };
    const state = feedReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orders: feedMock.orders, 
      isFeedsLoading: false,
      error: null
    });
  });

  test('обработка ошибки getFeed.rejected', () => {
    const action = {
      type: getFeedsThunk.rejected.type,
      error: { message: 'Ошибка' }
    };
    const state = feedReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isFeedsLoading: false,
      error: 'Ошибка'
    });
  });
});
