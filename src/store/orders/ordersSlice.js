import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Get token and API URL
const apiUrl = process.env.REACT_APP_API_URL;

// Step 1: Create the async thunk for fetching orders
export const getOrders = createAsyncThunk('orders/getOrders', async (validToken, { rejectWithValue }) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", validToken);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    const response = await fetch(`${apiUrl}/api/orders/get`, requestOptions);

    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }

    const data = await response.json(); // Assuming the API returns JSON
    return data; // This will be the payload in the fulfilled action
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateOrder = createAsyncThunk(
  'order/updateOrder',
  async ({ orderId, status, comments }, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("authAdminToken");
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      myHeaders.append("Content-Type", "application/json");

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({ status, comments }),
        redirect: "follow",
      };

      const response = await fetch(`${apiUrl}/api/orders/update/${orderId}`, requestOptions);

      if (!response.ok) {
        throw new Error('Failed to update order');
      }

      // const result = await response.json();
      const result = await dispatch(getOrders()).unwrap();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Step 2: Create the slice with reducers and extraReducers for handling states
const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderData = action.payload;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ordersSlice.reducer;
