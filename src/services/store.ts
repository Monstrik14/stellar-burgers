import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import burgerConstructor from '../slices/constructorSlice';
import feed from '../slices/feedSlice';
import ingredients from '../slices/ingredientsSlice';
import order from '../slices/orderSlice';
import user from '../slices/userSlice';

export const rootReducer = combineReducers({
  burgerConstructor,
  feed,
  ingredients,
  order,
  user
});

const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();

export default store;
