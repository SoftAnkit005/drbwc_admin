import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define the initial state of your slice
const initialState = {
  products: [],
  loading: false,
  error: null,
};

// Get token and API URL
const token = localStorage.getItem("authAdminToken");
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
      console.log('fetchProducts-data', data);
      return data;
      
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create an async thunk for adding a product
// Define the async thunk
export const addProduct = createAsyncThunk(
  'products/createProduct',
  async (formData, { dispatch, rejectWithValue }) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formData,
      redirect: "follow"
    };

    try {
      const response = await fetch(`${apiUrl}/api/product/create`, requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await dispatch(fetchProducts()).unwrap();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create an async thunk for deleting a product
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId, { dispatch, rejectWithValue }) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", token);
      const formdata = new FormData(); // If you need to send any form data
      const requestOptions = { method: "DELETE", headers: myHeaders, body: formdata, redirect: "follow" };
      const response = await fetch(`${apiUrl}/api/product/delete/${productId}`, requestOptions);

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      // const data = await response.text();
      const result = await dispatch(fetchProducts()).unwrap();
      return { productId, result }; // Return productId to filter it out from the state

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (productData, { dispatch, rejectWithValue }) => {
    const { formData, productId } = productData;

    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      const response = await fetch(`${apiUrl}/api/product/update/${productId}`, {
        method: 'POST',
        headers: myHeaders,
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      // Dispatch fetchProducts and return its result to log it in fulfilled
      const result = await dispatch(fetchProducts()).unwrap();
      return result; // This will be available in updateProduct.fulfilled
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// Create a slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setproducts: (state, action) => {
      state.products = action.payload;
    },
  },
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
        state.status = 'loading';
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(product => product.id !== action.payload.productId);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })      
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { setproducts } = productSlice.actions;
export default productSlice.reducer;
