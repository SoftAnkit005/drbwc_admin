import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define the initial state of your slice
const initialState = {
  products: [],
  loading: false,
  error: null,
};

// Get token and API URL
const token = localStorage.getItem("authToken");
const apiUrl = process.env.REACT_APP_API_URL;

// Create an async thunk for fetching data
export const fetchProducts = createAsyncThunk( 'products/fetchProducts', async (_, { rejectWithValue }) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", token);
      myHeaders.append("Content-Type", "application/json");
      const requestOptions = { method: "GET", headers: myHeaders, redirect: "follow" };

      const response = await fetch(`${apiUrl}/api/product/get`, requestOptions);
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      return data;
      
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create an async thunk for adding a product
export const addProduct = createAsyncThunk( 'products/addProduct', async (productData, { rejectWithValue }) => {
  console.log(productData);
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", token);
      myHeaders.append("Content-Type", "application/json");

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(productData),
        redirect: "follow"
      };

      const response = await fetch(`${apiUrl}/api/product/create`, requestOptions);

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      const data = await response.json();
      return data;
      
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create a slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = Array.isArray(action.payload.products) ? action.payload : [];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = [...state.products, action.payload];
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default productSlice.reducer;
