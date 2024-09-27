import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const token = localStorage.getItem("authToken");
const apiUrl = process.env.REACT_APP_API_URL;

// Define the async thunk for fetching sections
export const fetchSections = createAsyncThunk(
    "sections/fetchSections",
    async (_, { rejectWithValue }) => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", token);
            const requestOptions = { method: "GET", headers: myHeaders, redirect: "follow" };

            const response = await fetch(`${apiUrl}/api/section/get`, requestOptions);

            if (!response.ok) {
                throw new Error("Failed to fetch sections");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Async thunk for creating a section
export const createSection = createAsyncThunk(
    "sections/createSection",
    async (formData, { rejectWithValue, dispatch }) => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", token);
            // Do not set Content-Type for FormData
            const requestOptions = { method: "POST", body: formData, headers: myHeaders, redirect: "follow" };

            const response = await fetch(`${apiUrl}/api/section/create`, requestOptions);

            if (!response.ok) {
                throw new Error("Failed to create section");
            }

            const result = await dispatch(fetchSections()).unwrap();
            return result;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteSection = createAsyncThunk(
    "sections/deleteSection",
    async (sectionId, { rejectWithValue, dispatch }) => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", token);
            const requestOptions = { method: "DELETE", headers: myHeaders, redirect: "follow" };

            const response = await fetch(`${apiUrl}/api/section/delete/${sectionId}`, requestOptions);

            if (!response.ok) {
                throw new Error("Failed to delete section");
            }

            const result = await dispatch(fetchSections()).unwrap();
            return { sectionId, result };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateSection = createAsyncThunk(
    "sections/updateSection",
    async (formData, { rejectWithValue, dispatch }) => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", token);
            // Do not set Content-Type for FormData
            const requestOptions = { method: "POST", body: formData, headers: myHeaders, redirect: "follow" };

            const response = await fetch(`${apiUrl}/api/section/update/${formData.get("id")}`, requestOptions);

            if (!response.ok) {
                throw new Error("Failed to update section");
            }

            const result = await dispatch(fetchSections()).unwrap();
            return result;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

const sectionSlice = createSlice({
    name: "sections",
    initialState: {
        sections: [],
        loading: false,
        error: null,
        successMessage: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSections.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSections.fulfilled, (state, action) => {
                state.sections = action.payload;
                state.loading = false;
            })
            .addCase(fetchSections.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder
            .addCase(createSection.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createSection.fulfilled, (state, action) => {
                if (Array.isArray(state.sections)) {
                    state.sections.push(action.payload);
                }
                state.loading = false;
            })
            .addCase(createSection.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder
            .addCase(deleteSection.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(deleteSection.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = action.payload.result;
                if (Array.isArray(state.sections)) {
                    state.sections = state.sections.filter(
                        (section) => section.id !== action.payload.sectionId
                    );
                }
            })
            .addCase(deleteSection.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default sectionSlice.reducer;
