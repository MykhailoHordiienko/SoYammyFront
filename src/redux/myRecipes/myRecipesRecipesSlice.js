import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { getMyRecipes, removeMyRecipes } from './myRecipesOperations';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
  // isFetching: false,
};

const isPendingAction = action => {
  return action.type.endsWith('pending');
};

export const myRecipesSlice = createSlice({
  name: 'myRecipes',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getMyRecipes.fulfilled, (state, action) => {
        state.error = null;
        state.items = action.payload;
        state.isLoading = false;
      })

      .addCase(removeMyRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.data.findIndex(
          item => item._id === action.payload.data._id
        );
        state.items.data.splice(index, 1);
      })
      .addMatcher(isAnyOf(getMyRecipes.rejected), (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addMatcher(isPendingAction, state => {
        state.isLoading = true;
      });
  },
});

export default myRecipesSlice.reducer;
