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
      const requestOptions = { method: "POST", headers: myHeaders, body: JSON.stringify(productData), redirect: "follow" };

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

// Create an async thunk for deleting a product
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId, { rejectWithValue }) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", token);
      const formdata = new FormData(); // If you need to send any form data
      const requestOptions = { method: "DELETE", headers: myHeaders, body: formdata, redirect: "follow" };
      const response = await fetch(`${apiUrl}/api/product/delete/${productId}`, requestOptions);

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      const data = await response.text();
      return { productId, data }; // Return productId to filter it out from the state

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (productData, { rejectWithValue }) => {
    try {
      // Define headers and request options
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", token);

      // Construct the request body
      const raw = JSON.stringify(productData);

      const requestOptions = { method: "POST", headers: myHeaders, body: raw, redirect: "follow" };

      // Perform the fetch request
      const response = await fetch(`${apiUrl}/api/product/update/${productData.id}`, requestOptions);

      if (!response.ok) {
        throw new Error('Failed to update product');
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
      })

      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        // Filter out the deleted product from the state
        state.products = state.products.filter(product => product.id !== action.payload.productId);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.map(product => product.id === action.payload.id ? action.payload : product);
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default productSlice.reducer;
