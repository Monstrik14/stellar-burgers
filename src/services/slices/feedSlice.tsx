import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TOrder } from "@utils-types";
import { RootState } from "../store";

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
  'feed/fetchFeed',
  async () => {
    const response = await fetch('https://norma.nomoreparties.space/api/orders');
    const data = await response.json();
    return data;
  }
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
      .addCase(fetchFeed.fulfilled, (state, action: PayloadAction<TOrder[]>) => {
        state.orders = action.payload;
        state.isOrdersLoading = false;
      })
      .addCase(fetchFeed.rejected, (state) => {
        state.isOrdersLoading = false;
        state.error = 'error';
      });
  }
});

export const feedSelector = (state: RootState) => state.feed

export const { reducer: feedReducer } = feedSlice

export const { isOrdersLoadingSelector, ordersSelector } = feedSlice.selectors

export default feedReducer
