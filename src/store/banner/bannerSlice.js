import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const token = localStorage.getItem("authAdminToken");
const apiUrl = process.env.REACT_APP_API_URL;

export const getBanners = createAsyncThunk(
  'banners/getBanners',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/api/banners/get-banner`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

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
      const response = await fetch(`${apiUrl}/api/banners/delete-banner/${bannerId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete banner');
      }

      return bannerId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createBanner = createAsyncThunk(
  'banners/createBanner',
  async (bannerData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("title", bannerData.title);
      formData.append("description", bannerData.description);
      formData.append("image", bannerData.image);
      formData.append("status", bannerData.status);

      const response = await axios.post(`${apiUrl}/api/banners/create-banner`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateBanner = createAsyncThunk(
  'banners/updateBanner',
  async ({ id, bannerData }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("title", bannerData.title);
      formData.append("description", bannerData.description);
      formData.append("image", bannerData.image);
      formData.append("status", bannerData.status);

      const response = await axios.post(`${apiUrl}/api/banners/update-banner/${id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
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
        state.banners = state.banners.filter(banner => banner.id !== action.payload);
      })
      .addCase(deleteBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBanner.fulfilled, (state, action) => {
        console.log('State banners:', state.banners);
        console.log('Action payload:', action.payload);

        if (Array.isArray(state.banners)) {
          state.banners = [...state.banners, action.payload];
        } else {
          console.error('Expected state.banners to be an array, but found:', state.banners);
        }

        state.loading = false;
      })
      .addCase(createBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error Occurred";
      })
      .addCase(updateBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = state.banners.map(banner =>
          banner.id === action.payload.id ? action.payload : banner
        );
      })
      .addCase(updateBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error Occurred";
      });
  }
});

export default bannersSlice.reducer;
