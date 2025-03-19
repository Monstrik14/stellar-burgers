import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getFeedsApi } from '../utils/burger-api';
import { TOrder } from '../utils/types';
import { RootState } from '../services/store';

export interface IFeedsState {
  orders: TOrder[];
  isFeedsLoading: boolean;
  error: string | null;
}

const initialState: IFeedsState = {
  orders: [],
  isFeedsLoading: false,
  error: null
};

export const feedSlice = createSlice({
  name: 'feeds',
  initialState,
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

export const fetchOrders = createAsyncThunk(
  'feeds/fetchOrders',
  async () => await getFeedsApi()
);

export default feedSlice.reducer;

export const selectedOrders = (state: RootState) => state.feed.orders;
