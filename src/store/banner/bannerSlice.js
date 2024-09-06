import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Get token and API URL
const token = localStorage.getItem("authToken");
const apiUrl = process.env.REACT_APP_API_URL;

export const getBanners = createAsyncThunk(
  'banners/getBanners',
  async (_, { rejectWithValue }) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", token);
      myHeaders.append("Content-Type", "application/json");
      const requestOptions = { method: "GET", headers: myHeaders, redirect: "follow" };

      // Fetch the banners from the API
      const response = await fetch(`${apiUrl}/api/banners/get-banner`, requestOptions);

      // Check if the request was successful
      if (!response.ok) {
        throw new Error('Failed to fetch banners');
      }

      const data = await response.json();
      return data;

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBanner = createAsyncThunk(
  'banners/deleteBanner',
  async (bannerId, { rejectWithValue }) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", token);
      myHeaders.append("Content-Type", "application/json");
      const requestOptions = { method: "DELETE", headers: myHeaders, redirect: "follow" };

      // Fetch the banners from the API
      const response = await fetch(`${apiUrl}/api/banners/delete-banner/${bannerId}`, requestOptions);

      // Check if the request was successful
      if (!response.ok) {
        throw new Error('Failed to delete banner');
      }

      const data = await response.json();
      return data;

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const bannersSlice = createSlice({
  name: 'banners',
  initialState: {
    banners: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload;
      })
      .addCase(getBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload;
      })
      .addCase(deleteBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  }
});

export default bannersSlice.reducer;
