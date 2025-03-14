import { createSlice } from "@reduxjs/toolkit";
import { TConstructorIngredient } from "@utils-types";

interface ConstructorState {
  constructorIngredients: TConstructorIngredient[];
  constructorBun: TConstructorIngredient | null;
}

const initialState: ConstructorState = {
  constructorIngredients: [],
  constructorBun: null
};

export const constructorSlice = createSlice({
  name: "constructor",
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      state.constructorIngredients.push(action.payload);
    },
    removeIngredient: (state, action) => {
      state.constructorIngredients = state.constructorIngredients.filter(
        (item) => item.id !== action.payload
      );
    },
    setConstructorBun: (state, action) => {
      state.constructorBun = action.payload;
    }
  },
});

export const { addIngredient, removeIngredient, setConstructorBun } = constructorSlice.actions;

export default constructorSlice.reducer;
