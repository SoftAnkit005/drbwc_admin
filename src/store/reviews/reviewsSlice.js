import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const apiUrl = process.env.REACT_APP_API_URL;

// Async thunk to fetch reviews from the API
export const fetchReviews = createAsyncThunk('reviews/fetchReviews', async () => {
  const requestOptions = { method: 'GET', redirect: 'follow' };

  const response = await fetch(`${apiUrl}/api/review/get`, requestOptions);
  if (!response.ok) {
    throw new Error('Failed to fetch reviews');
  }

  const data = await response.json();
  return data;
});

export const addReview = createAsyncThunk('reviews/addReview', async (formData, { dispatch }) => {
  const token = localStorage.getItem('authAdminToken');
  const requestOptions = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
    redirect: 'follow',
  };

  const response = await fetch(`${apiUrl}/api/review/create`, requestOptions);
  if (!response.ok) {
    throw new Error('Failed to add review');
  }

  // const data = await response.json();
  const result = await dispatch(fetchReviews()).unwrap();
  return result; // Return the new review data
});

export const updateReview = createAsyncThunk('reviews/updateReview', async (formData, { getState }) => {
  const token = localStorage.getItem('authAdminToken');
  const requestOptions = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
    redirect: 'follow',
  };

  const response = await fetch(`${apiUrl}/api/review/update/${formData.id}`, requestOptions);
  if (!response.ok) {
    throw new Error('Failed to update review');
  }

  const currentState = getState();
  const currentData =  currentState.reviews.reviews.reviews

  const upadatedResult = await response.json();
  
  const updatedData = currentData.map((review) => {
    if (review.id !== upadatedResult.reviews.id) {
      return review;
    }
    return upadatedResult.reviews;
  })

  const data = {success: true, message: 'Reviews updated successfully', reviews: updatedData}
  return data; // Return the updated review data
});

export const deleteReviews = createAsyncThunk('reviews/deleteReviews', async (id, { dispatch }) => {
  const token = localStorage.getItem('authAdminToken');
  const requestOptions = { 
    method: 'DELETE', 
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  };

  const response = await fetch(`${apiUrl}/api/review/delete/${id}`, requestOptions);
  if (!response.ok) {
    throw new Error('Failed to delete review');
  }

  const result = await dispatch(fetchReviews()).unwrap();
  return result;
});

// Slice for handling review-related state
const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    reviews: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    setReviews(state, action) {
      state.reviews = action.payload;
    },
  },
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
      .addCase(addReview.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reviews.push(action.payload); // Add the new review to the state
      })
      .addCase(addReview.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(updateReview.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reviews = action.payload;
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(deleteReviews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteReviews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reviews = state.reviews.filter(review => review.id !== action.payload); // Remove the deleted review from the state
      })
      .addCase(deleteReviews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setReviews } = reviewsSlice.actions;
export default reviewsSlice.reducer;
