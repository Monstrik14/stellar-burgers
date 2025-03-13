import { createSlice } from "@reduxjs/toolkit";

export interface IngredientDetails {
  ingredients: [],
  isLoading: false,
  bun: {
    price: 0
  }
}

export const initialState: IngredientDetails = {
  ingredients: [],
  isLoading: false,
  bun: {
    price: 0
  }
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setIngredients: (state, action) => {
      state.ingredients = action.payload;
    },
  },
});
