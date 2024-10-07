import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Get token and API URL
const token = localStorage.getItem("authAdminToken");
const apiUrl = process.env.REACT_APP_API_URL;

// Headers for API requests
const myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${token}`);
myHeaders.append("Content-Type", "application/json");

// Async thunk to fetch categories
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await fetch(`${apiUrl}/api/categories/get-categories`, {
    method: 'GET',
    headers: myHeaders,
  });
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  const result = await response.json();
  return result;
});

// Async thunk to create a new category
export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (categoryData, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`${apiUrl}/api/categories/create-category`, {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) {
        throw new Error('Failed to create category');
      }

      // const data = await response.json();
      const result = await dispatch(fetchCategories()).unwrap();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/api/categories/delete-category/${id}`, {
        method: 'DELETE',
        headers: myHeaders,
      });

      if (!response.ok) {
        throw new Error('Failed to delete category');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/api/categories/update-category/${categoryData.id}`, {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) {
        throw new Error('Failed to update category');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  } 
);

// Create the category slice
const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    loading: false,
    error: null,
    newCategory: null, // Store the newly created category
  },
  reducers: {
    // You can add other reducers here if needed
  },
  extraReducers: (builder) => {
    // Handling fetchCategories
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // Handling createCategory
    builder
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload; // Store newly created category
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });


    builder
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload; // Store newly created category
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


    builder
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload; // Store newly created category
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default categorySlice.reducer;
