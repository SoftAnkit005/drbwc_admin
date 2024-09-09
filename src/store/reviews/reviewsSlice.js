import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('authToken');
const apiUrl = process.env.REACT_APP_API_URL;


// Async thunk to fetch reviews from the API
export const fetchReviews = createAsyncThunk('reviews/fetchReviews', async () => {
  const requestOptions = { method: 'GET', redirect: 'follow', };

  const response = await fetch(`${apiUrl}/api/review/get`, requestOptions);
  if (!response.ok) {
    throw new Error('Failed to fetch reviews');
  }

  const data = await response.json();
  return data;
});

export const addReview = createAsyncThunk('reviews/addReview', async (formData) => {
  const requestOptions = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(formData),
    redirect: 'follow',
  };
  const response = await fetch(`${apiUrl}/api/review/create`, requestOptions);
  if (!response.ok) {
    throw new Error('Failed to add review');
  }
})

export const updateReview = createAsyncThunk('reviews/updateReview', async (formData) => {
  const requestOptions = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(formData),
    redirect: 'follow',
  };
  const response = await fetch(`${apiUrl}/api/review/update/${formData.id}`, requestOptions);
  if (!response.ok) {
    throw new Error('Failed to update review');
  }
})

export const deleteReviews = createAsyncThunk('reviews/deleteReviews', async (id) => {
  const requestOptions = { 
    method: 'DELETE', 
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  const response = await fetch(`${apiUrl}/api/review/delete/${id}`, requestOptions);
  if (!response.ok) {
    throw new Error('Failed to delete review');
  }

  const data = await response.text();
  return data;
});

// Slice for handling review-related state
const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    reviews: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reviews = action.payload; // Update the state with fetched reviews
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(addReview.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addReview.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(addReview.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(updateReview.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateReview.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(deleteReviews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteReviews.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(deleteReviews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export the reducer to use in the store
export default reviewsSlice.reducer;
