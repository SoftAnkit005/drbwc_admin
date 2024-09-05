// src/features/attribute/attributeSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Get token and API URL
const token = localStorage.getItem("authToken");
const apiUrl = process.env.REACT_APP_API_URL;

// Fetch attributes (GET request)
export const fetchAttributes = createAsyncThunk(
  'attribute/fetchAttributes',
  async (_, { rejectWithValue }) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", token);
      myHeaders.append("Content-Type", "application/json");

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      const response = await fetch(`${apiUrl}/api/attribute/get`, requestOptions);

      if (!response.ok) {
        throw new Error('Failed to fetch attributes');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create attribute (POST request)
export const createAttribute = createAsyncThunk(
  'attribute/createAttribute',
  async (attributeData, { rejectWithValue }) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", token);
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify(attributeData);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      const response = await fetch(`${apiUrl}/api/attribute/create`, requestOptions);

      if (!response.ok) {
        throw new Error('Failed to create attribute');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete attribute (DELETE request)
export const deleteAttribute = createAsyncThunk(
  'attribute/deleteAttribute',
  async (attributeId, { rejectWithValue }) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", token);
      myHeaders.append("Content-Type", "application/json");

      const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow"
      };

      const response = await fetch(`${apiUrl}/api/attribute/delete/${attributeId}`, requestOptions);

      if (!response.ok) {
        throw new Error('Failed to delete attribute');
      }

      return attributeId; // Return the ID of the deleted attribute
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const attributeSlice = createSlice({
  name: 'attribute',
  initialState: {
    attributes: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetch attributes
      .addCase(fetchAttributes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttributes.fulfilled, (state, action) => {
        state.loading = false;
        state.attributes = action.payload;
      })
      .addCase(fetchAttributes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle create attribute
      .addCase(createAttribute.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAttribute.fulfilled, (state, action) => {
        state.loading = false;
        state.attributes.push(action.payload); // Add the new attribute to the list
      })
      .addCase(createAttribute.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle delete attribute
      .addCase(deleteAttribute.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAttribute.fulfilled, (state, action) => {
        state.loading = false;
        state.attributes = state.attributes.filter(attr => attr.id !== action.payload);
      })
      .addCase(deleteAttribute.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default attributeSlice.reducer;