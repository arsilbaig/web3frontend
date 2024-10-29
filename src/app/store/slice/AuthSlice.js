import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const signIn = createAsyncThunk(
    'auth/signIn',
    async (body) => {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/login`, body);
        return response.data;
    }
);

export const signUp = createAsyncThunk(
    'auth/signUp',
    async (body) => {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/auth/register`, body);
        return response.data;
    }
);

export const signOut = createAsyncThunk(
    'auth/signOut',
    async (navigate) => {
        sessionStorage.removeItem("token")
        navigate('/sign-in');
        window.location.reload();
    }
);

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signIn.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(signIn.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(signOut.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
            });
    },
});

export const { resetError } = authSlice.actions;
export const selectAuthUserState = (state) => state.AuthSlice.user;
export default authSlice.reducer;
