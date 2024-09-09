// redux/slices/fileUploadSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define the backend URL as a constant
const apiUrl = process.env.REACT_APP_API_URL;

// Thunk for uploading images
export const uploadImages = createAsyncThunk(
  'files/uploadImages',
  async (images, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      images.forEach(image => {
        formData.append('files', image); // 'files' key must match your backend's expectation
      });

      const response = await fetch(`${apiUrl}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload images');
      }

      const data = await response.json();
      return data.fileUrls; // Adjust based on your backend response
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const fileUploadSlice = createSlice({
  name: 'fileUpload',
  initialState: {
    uploadedFilesUrls: [],
    uploading: false,
    error: null,
  },
  reducers: {
    resetUploadState(state) {
      state.uploadedFilesUrls = [];
      state.uploading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadImages.pending, (state) => {
        state.uploading = true;
        state.error = null;
      })
      .addCase(uploadImages.fulfilled, (state, action) => {
        state.uploading = false;
        state.uploadedFilesUrls = action.payload;
      })
      .addCase(uploadImages.rejected, (state, action) => {
        state.uploading = false;
        state.error = action.payload;
      });
  },
});

export const { resetUploadState } = fileUploadSlice.actions;
export default fileUploadSlice.reducer;
