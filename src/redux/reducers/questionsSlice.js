import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getQuestions = createAsyncThunk(
  'getQuestions',
  async (formData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.get(
        `https://opentdb.com/api.php?amount=${formData.number}&category=${formData.category}&difficulty=${formData.difficulty}&type=multiple`
      );
      return data.results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const questionsSlice = createSlice({
  name: 'questions',
  initialState: {
    questions: JSON.parse(localStorage.getItem('questions')) || [],
    isLoading: false,
    isError: '',
  },

  extraReducers: (builder) => {
    builder.addCase(getQuestions.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getQuestions.fulfilled, (state, action) => {
      state.isLoading = false;
      state.questions = action.payload;
      localStorage.setItem('questions', JSON.stringify(action.payload));
    });
    builder.addCase(getQuestions.rejected, (state, action) => {
      state.isLoading = false;
      state.questions = [];
      state.isError = action.payload;
    });
  },
});

export default questionsSlice.reducer;
