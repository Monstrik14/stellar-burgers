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

export const getOrderByNumberThunk = createAsyncThunk(
  'orders/getOrder',
  getOrderByNumberApi
);

export const feedSlice = createSlice({
  name: 'feed',
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
      .addCase(getFeedsThunk.pending, (state) => {
        state.isFeedsLoading = true;
      })
      .addCase(getFeedsThunk.rejected, (state, action) => {
        state.isFeedsLoading = false;
        state.error = action.error.message!;
      })
      .addCase(getFeedsThunk.fulfilled, (state, action) => {
        state.isFeedsLoading = false;
        state.orders =
          action.payload.orders || 'Ошибка при обнолении ленты заказов';
      });
  }
});

export default feedSlice.reducer;

export const {
  isFeedsLoadingSelector,
  orderSelector,
  isOrderLoadingSelector,
  totalSelector,
  totalTodaySelector,
  ordersSelector
} = feedSlice.selectors;
