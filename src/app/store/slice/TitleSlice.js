import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


export const getAllTitles = createAsyncThunk(
    'titles/all',
    async ({ token }) => {
        const response = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/title`,
            { headers: { Authorization: token } }
        );
        return response.data;
    }
);

export const createTitle = createAsyncThunk(
    'titles/create',
    async ({ title, token }) => {
        const response = await axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/title`,
            { title },
            { headers: { Authorization: token } }
        );
        return response.data;
    }
);

export const updateTitle = createAsyncThunk(
    'titles/update',
    async ({ id, updatedData, token }) => {
        const response = await axios.put(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/title/${id}`,
            updatedData,
            { headers: { Authorization: token } }
        );
        return response.data;
    }
);

export const deleteTitle = createAsyncThunk(
    'titles/delete',
    async ({ id, token }) => {
        await axios.delete(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/title/${id}`,
            { headers: { Authorization: token } }
        );
        return id;
    }
);

export const getTitleById = createAsyncThunk(
    'titles/byId',
    async ({ id, token }) => {
        const response = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/title/${id}`,
            { headers: { Authorization: token } }
        );
        return response.data;
    }
);

export const TitleSlice = createSlice({
    name: 'title',
    initialState: {
        titlesData: []
    },
    reducers: {
        setCompleteTitlesData: (state, action) => {
            state.titlesData = action.payload;
        },
        setCombinedTitlesData: (state, action) => {
            state.titlesData = [...action.payload, ...state.titlesData];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllTitles.fulfilled, (state, action) => {
                state.titlesData = action.payload;
            })
            .addCase(createTitle.fulfilled, (state, action) => {
                state.titlesData.push(action.payload);
            })
            .addCase(updateTitle.fulfilled, (state, action) => {
                const index = state.titlesData.findIndex(title => title.id === action.payload.id);
                if (index !== -1) {
                    state.titlesData[index] = action.payload;
                }
            })
            .addCase(deleteTitle.fulfilled, (state, action) => {
                state.titlesData = state.titlesData.filter(title => title.id !== action.payload);
            })
            .addCase(getTitleById.fulfilled, (state, action) => {
            });
    },
});

export const selectTitlesData = (state) => {
    return state.TitleSlice.titlesData
};
export const { setCompleteTitlesData, setCombinedTitlesData } = TitleSlice.actions;

export default TitleSlice.reducer;
