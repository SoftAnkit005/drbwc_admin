import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Get token from localStorage (or you can pass it in as a prop or context)
const token = localStorage.getItem("authToken");
const apiUrl = process.env.REACT_APP_API_URL;

// Headers for API requests
const myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${token}`);
myHeaders.append("Content-Type", "application/json");

// Async thunk to create a new subcategory
export const createSubcategory = createAsyncThunk(
    'subcategories/createSubcategory',
    async (subcategoryData, { rejectWithValue }) => {
        try {
            const response = await fetch(`${apiUrl}/api/subcategories/create-subcategory`, {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(subcategoryData),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                return rejectWithValue(errorResponse.message);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Subcategory slice
const subcategorySlice = createSlice({
    name: 'subcategories',
    initialState: {
        subcategories: [], // List of subcategories
        loading: false,
        error: null,
        newSubcategory: null, // Store the newly created subcategory
    },
    reducers: {},
    extraReducers: (builder) => {
        // Handle the createSubcategory lifecycle
        builder
            .addCase(createSubcategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createSubcategory.fulfilled, (state, action) => {
                state.loading = false;
                state.newSubcategory = action.payload; // Store the newly created subcategory
                state.subcategories = [...state.subcategories, action.payload]; // Optionally add the new subcategory to the list
            })
            .addCase(createSubcategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default subcategorySlice.reducer;
