import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Get token and API URL
const token = localStorage.getItem("authToken");
const apiUrl = process.env.REACT_APP_API_URL;

// Async thunk for fetching user data
export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (_, { rejectWithValue }) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      const response = await fetch(`${apiUrl}/api/user/get`, requestOptions);

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice for handling user data
const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the reducer to be used in the store
export default userSlice.reducer;
