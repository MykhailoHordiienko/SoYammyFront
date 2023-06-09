import { createSlice } from '@reduxjs/toolkit';
import { getCategories } from './categoriesOperations';
import { setCurrentCategory } from './categoriesOperations';

const initialState = {
  currentCategory: 'Beef',
  list: [],
  isLoading: false,
  error: null,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.list = action.payload;
      })
      .addCase(setCurrentCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.currentCategory = action.payload;
      })
      .addMatcher(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addMatcher(getCategories.pending, state => {
        state.isLoading = true;
      });
  },
});

export default categoriesSlice.reducer;
