// taxSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const token = localStorage.getItem("authToken");
const apiUrl = process.env.REACT_APP_API_URL;

// Step 1: Create Async Thunk
export const fetchTaxData = createAsyncThunk('tax/fetchTaxData', async (_, { rejectWithValue }) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    try {
        const response = await fetch(`${apiUrl}/api/tax/get`, requestOptions);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const createTax = createAsyncThunk(
    'tax/createTax',
    async (taxes, { rejectWithValue }) => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");


        const raw = JSON.stringify(taxes);

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        try {
            const response = await fetch(`${apiUrl}/api/tax/create`, requestOptions);
            if (!response.ok) {
                throw new Error('Failed to create tax');
            }
            const result = await response.json();
            return result;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateTax = createAsyncThunk(
    'tax/updateTax',
    async ({ id, taxes }, { rejectWithValue }) => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify(taxes);

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        try {
            const response = await fetch(`${apiUrl}/api/tax/update/${id}`, requestOptions);
            if (!response.ok) {
                throw new Error('Failed to update tax');
            }
            const result = await response.json();
            return result;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const deleteTax = createAsyncThunk(
    'tax/deleteTax',
    async (id, { rejectWithValue }) => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            redirect: "follow"
        };

        try {
            const response = await fetch(`${apiUrl}/api/tax/delete/${id}`, requestOptions);
            if (!response.ok) {
                throw new Error('Failed to delete tax');
            }
            const result = await response.json();
            return result;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

// Step 2: Create a Slice
const taxSlice = createSlice({
    name: 'tax',
    initialState: {
        taxes: [],
        loading: false,
        error: null,
        successMessage: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTaxData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTaxData.fulfilled, (state, action) => {
                state.loading = false;
                state.taxes = action.payload;
            })
            .addCase(fetchTaxData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder
            .addCase(createTax.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(createTax.fulfilled, (state, action) => {
                state.loading = false;
                state.taxData = action.payload;
                state.successMessage = 'Tax created successfully';
            })
            .addCase(createTax.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder
            .addCase(updateTax.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(updateTax.fulfilled, (state, action) => {
                state.loading = false;
                state.taxData = action.payload;
                state.successMessage = 'Tax updated successfully';
            })
            .addCase(updateTax.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder
            .addCase(deleteTax.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(deleteTax.fulfilled, (state, action) => {
                state.loading = false;
                state.taxData = action.payload;
                state.successMessage = 'Tax deleted successfully';
            })
            .addCase(deleteTax.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default taxSlice.reducer;
