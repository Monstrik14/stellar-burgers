import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

export interface IngredientDetails {
  ingredients: TIngredient[];
  isLoading: boolean;
  bun: {
    price: 0;
  };
  error: string | null;
}

export const initialState: IngredientDetails = {
  ingredients: [],
  isLoading: false,
  bun: {
    price: 0
  },
  error: null
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    const ingredients = await getIngredientsApi();
    return ingredients;
  }
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.ingredients = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(fetchIngredients.rejected, (state) => {
        state.isLoading = false;
        state.error = 'error';
      });
  }
});

export default ingredientsSlice.reducer;
