import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://quiz-90mi.onrender.com/api/users',
});

export const signUp = createAsyncThunk('singUp', async (formData, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const { data } = await API.post('/signup', formData);
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const signIn = createAsyncThunk('singIn', async (formData, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const { data } = await API.post('/signin', formData);
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authData: localStorage.getItem('profile')
      ? JSON.parse(localStorage.getItem('profile'))
      : null,
    isError: '',
    isLoading: false,
  },

  reducers: {
    loginGoogle: (state, action) => {
      localStorage.setItem('profile', JSON.stringify(action.payload));
      state.authData = action.payload;
    },

    logOut: (state) => {
      state.authData = null;
      localStorage.clear();
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(signIn.pending, signUp.pending), (state) => {
      state.isLoading = true;
    });

    builder.addMatcher(
      isAnyOf(signIn.fulfilled, signUp.fulfilled),
      (state, action) => {
        state.isLoading = false;
        state.authData = action.payload;
        localStorage.setItem('profile', JSON.stringify(action.payload));
      }
    );

    builder.addMatcher(
      isAnyOf(signIn.rejected, signUp.rejected),
      (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.authData = null;
      }
    );
  },
});

export const { loginGoogle, logOut } = authSlice.actions;
export default authSlice.reducer;
