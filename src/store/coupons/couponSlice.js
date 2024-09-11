import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Get token and API URL
const token = localStorage.getItem("authToken");
const apiUrl = process.env.REACT_APP_API_URL;

// Step 1: Create the async thunk
export const fetchOffers = createAsyncThunk(
  'offer/fetchOffers',
  async (_, { rejectWithValue }) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append( "Authorization", `Bearer ${token}` );
      const requestOptions = { method: "GET", headers: myHeaders, redirect: "follow" };

      const response = await fetch(`${apiUrl}/api/offer/get`, requestOptions);
      if (!response.ok) {
        throw new Error('Failed to fetch offers');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createOffers = createAsyncThunk(
  'offer/createOffers',
  async (offerData, { rejectWithValue }) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(offerData),
        redirect: "follow"
      };

      const response = await fetch(`${apiUrl}/api/offer/create`, requestOptions);
      
      if (!response.ok) {
        throw new Error('Failed to create offers');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteOffers = createAsyncThunk(
  'offer/deleteOffers',
  async (offerId, { rejectWithValue }) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow"
      };

      const response = await fetch(`${apiUrl}/api/offer/delete/${offerId}`, requestOptions);

      if (!response.ok) {
        throw new Error('Failed to delete offers');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateOffers = createAsyncThunk(
  'offer/updateOffers',
  async ({ offerId, offerData }, { rejectWithValue }) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(offerData),
        redirect: "follow"
      };

      // Dynamically include the offerId in the API endpoint URL
      const response = await fetch(`${apiUrl}/api/offer/update/${offerId}`, requestOptions);
      
      if (!response.ok) {
        throw new Error('Failed to update offers');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



// Step 2: Create the slice
const couponSlice = createSlice({
  name: 'coupon',
  initialState: {
    coupons: [],
    loading: false,
    error: null
  },
  reducers: {
    // You can define normal reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = action.payload;
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      .addCase(createOffers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOffers.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = action.payload;
      })
      .addCase(createOffers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteOffers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOffers.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = action.payload;
      })
      .addCase(deleteOffers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateOffers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOffers.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = action.payload;
      })
      .addCase(updateOffers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  }
});

// Export the reducer from the slice
export default couponSlice.reducer;