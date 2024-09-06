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

// Async thunk to fetch subcategories
export const getsubcategories = createAsyncThunk(
    'subcategories/getsubcategories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${apiUrl}/api/subcategories/get-subcategories`, {
                method: 'GET',
                headers: myHeaders,
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

// Async thunk to update a subcategory
export const updatesubcategory = createAsyncThunk(
    'subcategories/updatesubcategory',
    async (subcategoryData, { rejectWithValue }) => {
        try {
            const response = await fetch(`${apiUrl}/api/subcategories/update-subcategory/${subcategoryData.id}`, {
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

// Async thunk to delete a subcategory
export const deleteSubCategory = createAsyncThunk(
    'subcategories/deleteSubCategory',
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`${apiUrl}/api/subcategories/delete-subcategory/${id}`, {
                method: 'DELETE',
                headers: myHeaders,
            });
            if (!response.ok) {
                const errorResponse = await response.json();
                return rejectWithValue(errorResponse.message);
            }

            return id; // Return the deleted subcategory's ID
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Subcategory slice
const subcategorySlice = createSlice({
    name: 'subcategories',
    initialState: {
        subcategories: [], // Ensure it's an array
        loading: false,
        error: null,
        newSubcategory: null, // Store the newly created subcategory
    },
    reducers: {},
    extraReducers: (builder) => {
        // Handle the createSubcategory lifecycle
        builder
            // Handle the getsubcategories lifecycle
            .addCase(getsubcategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getsubcategories.fulfilled, (state, action) => {
                state.loading = false;
                state.subcategories = action.payload;
            })
            .addCase(getsubcategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(createSubcategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createSubcategory.fulfilled, (state, action) => {
                state.loading = false;
                state.newSubcategory = action.payload; // Store the newly created subcategory
                state.subcategories = [...state.subcategories, action.payload]; // Add the new subcategory to the list
            })
            .addCase(createSubcategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(deleteSubCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteSubCategory.fulfilled, (state, action) => {
                state.loading = false;
                // Filter out the deleted subcategory by its ID
                state.subcategories = state.subcategories.filter(
                    (subcategory) => subcategory.id !== action.payload
                );
            })
            .addCase(deleteSubCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(updatesubcategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatesubcategory.fulfilled, (state, action) => {
                state.loading = false;
                // Update the subcategory in the list
                state.subcategories = state.subcategories.map((subcategory) =>
                    subcategory.id === action.payload.id ? action.payload : subcategory
                );
            })
            .addCase(updatesubcategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default subcategorySlice.reducer;
    