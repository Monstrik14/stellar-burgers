import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';
import { getFeedsApi, getOrderByNumberApi } from '@api';

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

export const fetchOrders = createAsyncThunk<TOrdersData>('feed/fetchOrders', getFeedsApi)

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
      .addCase(fetchOrders.pending, (state) => {
        state.isOrdersLoading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.isOrdersLoading = false;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.isOrdersLoading = false;
        state.error = 'error';
      });
  }
});

export const { isOrdersLoadingSelector, ordersSelector } = feedSlice.selectors;

export default feedSlice.reducer;
