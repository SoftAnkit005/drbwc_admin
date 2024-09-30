import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Get API URL from environment variables
const apiUrl = process.env.REACT_APP_API_URL;

// Function to get the token
const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

// Async thunk for fetching user data
export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (_, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
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
      return rejectWithValue(error.message); // Pass the error message for handling in reducers
    }
  }
);

// Async thunk for updating user data
export const updateUserData = createAsyncThunk(
  'user/updateUser',
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const token = getAuthToken();
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      myHeaders.append("Content-Type", "application/json");

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(userData),
        redirect: "follow",
      };

      const response = await fetch(`${apiUrl}/api/user/update`, requestOptions);

      if (!response.ok) {
        throw new Error('Failed to update user data');
      }

      const result = await dispatch(fetchUserData()).unwrap();
      // const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message); // Pass the error message for handling in reducers
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
  reducers: {
    resetUserData: (state) => {
      state.userData = null; // Reset user data
      state.error = null;    // Reset error
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload; // Set user data
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set error message
      })

      .addCase(updateUserData.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload; // Optionally update user data with new values
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set error message
      });
  },
});

// Export the reducer and actions
export const { resetUserData } = userSlice.actions; // Export reset action if needed
export default userSlice.reducer; // Export the reducer to be used in the store
