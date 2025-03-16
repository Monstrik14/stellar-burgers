import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RootState } from '../store';
import { getOrderByNumberApi } from '@api';

export interface FeedState {
  orders: TOrder[];
  isOrdersLoading: boolean;
  error: string | null;
}

const initialState: FeedState = {
  orders: [],
  isOrdersLoading: false,
  error: null
};

export const fetchFeed = createAsyncThunk(
  'orders/getOrder',
  async (number: number) => getOrderByNumberApi(number)
);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  selectors: {
    isOrdersLoadingSelector: (state: FeedState) => state.isOrdersLoading,
    ordersSelector: (state: FeedState) => state.orders
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.isOrdersLoading = true;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.isOrdersLoading = false;
      })
      .addCase(fetchFeed.rejected, (state) => {
        state.isOrdersLoading = false;
        state.error = 'error';
      });
  }
});

export const { isOrdersLoadingSelector, ordersSelector } = feedSlice.selectors;

export default feedSlice.reducer;
