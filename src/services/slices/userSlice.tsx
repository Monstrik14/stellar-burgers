import { TOrder, TUser } from '../../utils/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TRegisterData, registerUserApi } from '@api';
import { setCookie } from 'src/utils/cookie';

interface UserState {
  isAuth: boolean;
  logUser: boolean;
  user: TUser | null;
  orders: TOrder[];
  ordersRequest: boolean;
  error: string | null;
}

const initialState: UserState = {
  isAuth: false,
  logUser: false,
  user: null,
  orders: [],
  ordersRequest: false,
  error: null,
};

export const registerUserThunk = createAsyncThunk(
  'users/registerUser',
  async ({ email, name, password }: TRegisterData) =>
    registerUserApi({ email, name, password }).then(
      ({ refreshToken, accessToken, user }) => {
        setCookie('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        return user;
      }
    )
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  selectors: {
    isAuthCheckedSelector: (state) => state.isAuth,
    loginUserRequestSelector: (state) => state.logUser
  },
  reducers: {
    login(state, action) {
      state.isAuth = true;
      state.logUser = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuth = false;
      state.logUser = false;
      state.user = null;
    },
    getUser(state, action) {
      state.user = action.payload;
    },
    getOrders(state, action) {
      state.orders = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.logUser = true;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.logUser = false;
        state.isAuth = true;
        state.user = action.payload;
      })
    }
  })

export const {
  isAuthCheckedSelector,
  loginUserRequestSelector
} = userSlice.selectors;

export default userSlice.reducer;

