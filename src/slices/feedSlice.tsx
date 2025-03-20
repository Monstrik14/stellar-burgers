import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi, getOrderByNumberApi } from '../utils/burger-api';
import { TOrder } from '../utils/types';

export interface IFeedsState {
  isOrderLoading: boolean;
  total: number;
  orders: TOrder[];
  isFeedsLoading: boolean;
  error: string | null;
  totalToday: number;
}

const initialState: IFeedsState = {
  orders: [],
  isOrderLoading: false,
  isFeedsLoading: false,
  error: null,
  total: 0,
  totalToday: 0
};

export const getFeedsThunk = createAsyncThunk('feeds/getFeeds', async () =>
  getFeedsApi()
);

export const fetchOrders = createAsyncThunk(
  'feeds/fetchOrders',
  async () => await getFeedsApi()
);

export const feedSlice = createSlice({
  name: 'feeds',
  initialState,
  selectors: {
    ordersSelector: (state) => state.orders,
    isFeedsLoadingSelector: (state: IFeedsState) => state.isFeedsLoading,
    orderSelector: (state) => state.orders,
    isOrderLoadingSelector: (state) => state.isOrderLoading,
    totalSelector: (state) => state.total,
    totalTodaySelector: (state) => state.totalToday
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isFeedsLoading = true;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isFeedsLoading = false;
        state.error = action.error.message!;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isFeedsLoading = false;
        state.orders =
          action.payload.orders || 'Ошибка при обнолении ленты заказов';
      });
  }
});

export const getOrderByNumberThunk = createAsyncThunk(
  'orders/getOrder',
  async (number: number) => getOrderByNumberApi(number)
);

export default feedSlice.reducer;

export const {
  isFeedsLoadingSelector,
  orderSelector,
  isOrderLoadingSelector,
  totalSelector,
  totalTodaySelector,
  ordersSelector
} = feedSlice.selectors;
