import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import api from 'service/Api/axiosBaseURL';

export const getMyRecipes = createAsyncThunk(
  'myRecipes/getRecipes',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get(`/recipes/my`);
      const myRecipes = data.data;
      return myRecipes;
    } catch (error) {
      toast.error('Something went wrong, please try again later', {
        autoClose: 3000,
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeMyRecipes = createAsyncThunk(
  'myRecipes/removeMyRecipes',
  async (recipeId, thunkAPI) => {
    try {
      const { data } = await api.delete(`/recipes/${recipeId}`);
      toast.success('Removed from myRecipes', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return data;
    } catch (error) {
      toast.error('Something went wrong, please try again later', {
        autoClose: 3000,
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
