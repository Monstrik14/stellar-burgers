import { getOrdersApi } from '@api';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export interface OrderState {
  order: TOrder | null;
  orderLoading: boolean;
  orderError: string | null;
}

export const initialState: OrderState = {
  order: null,
  orderLoading: false,
  orderError: null
};

export const fetchOrders = createAsyncThunk(
  'orders/postOrderBurger',
  async () => {
    await getOrdersApi();
  }
);

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  selectors: {
    ordersSelector: (state) => state.order,
    isLoadingSelector: (state) => state.orderLoading,
    errorSelector: (state) => state.orderError
  },
  reducers: {
    clearOrder: (state) => {
      state.order = null;
      state.orderLoading = false;
    },
    },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.orderLoading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orderLoading = false;
        state.order = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.orderLoading = false;
        state.orderError = action.error.message!;
      });
  }
});

export default orderSlice.reducer;
