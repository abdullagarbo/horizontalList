import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchListItems = createAsyncThunk('list/fetchListItems', async () => {
  const response = await axios.get(
    'https://acc01.titanos.tv/v1/genres/14/contents?market=es&device=tv&locale=es&page=1&per_page=50'
  );
  return response.data.collection;
});

const listSlice = createSlice({
  name: 'list',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    focusedIndex: 0,
  },
  reducers: {
    focusNextItem: (state) => {
      if (state.focusedIndex < state.items.length - 1) {
        state.focusedIndex += 1;
      }
    },
    focusPrevItem: (state) => {
      if (state.focusedIndex > 0) {
        state.focusedIndex -= 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchListItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchListItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { focusNextItem, focusPrevItem } = listSlice.actions;
export default listSlice.reducer;
export { fetchListItems };
