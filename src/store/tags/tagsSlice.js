import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('authToken');
const apiUrl = process.env.REACT_APP_API_URL;

// Async thunk to fetch tags from the API
export const fetchTags = createAsyncThunk('tags/fetchTags', async () => {
  const requestOptions = { method: 'GET', redirect: 'follow' };
  const response = await fetch(`${apiUrl}/api/tag/get`, requestOptions);

  if (!response.ok) {
    throw new Error('Failed to fetch tags');
  }

  const data = await response.json(); // Assuming the response is JSON
  return data;
});

export const addTags = createAsyncThunk('tags/addTags', async (tagData, { dispatch }) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(tagData),
    redirect: 'follow',
  };
  const response = await fetch(`${apiUrl}/api/tag/create`, requestOptions);
  if (!response.ok) { throw new Error('Failed to add tag'); }

  // const data = await response.json();
  const result = await dispatch(fetchTags()).unwrap();
  return result;
});

export const updateTags = createAsyncThunk('tags/updateTags', async (tagData, { dispatch }) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(tagData),
    redirect: 'follow',
  };
  const response = await fetch(`${apiUrl}/api/tag/update/${tagData.id}`, requestOptions);
  if (!response.ok) { throw new Error('Failed to update tag'); }

  // const data = await response.json();
  const result = await dispatch(fetchTags()).unwrap();
  return result;
});

export const deleteTags = createAsyncThunk('tags/deleteTags', async (id, { dispatch }) => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
  };
  const response = await fetch(`${apiUrl}/api/tag/delete/${id}`, requestOptions);
  if (!response.ok) {
    throw new Error('Failed to delete tag');
  }

  // const data = await response.json();
  const result = await dispatch(fetchTags()).unwrap();
  return result;
});

// Slice for handling tag-related state
const tagsSlice = createSlice({
  name: 'tags',
  initialState: {
    tags: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    // If you have additional reducers, you can add them here
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tags = action.payload; // Update the state with fetched tags
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(addTags.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addTags.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tags.push(action.payload);
      })
      .addCase(addTags.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(updateTags.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateTags.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tags = state.tags.map((tag) => (tag.id === action.payload.id ? action.payload : tag));
      })
      .addCase(updateTags.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(deleteTags.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteTags.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tags = state.tags.filter((tag) => tag.id !== action.payload.id);
      })
      .addCase(deleteTags.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export the reducer to use in the store
export default tagsSlice.reducer;
