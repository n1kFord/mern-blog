import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../../utils/axios"

const initialState = {
    posts: [],
    popularPosts: [],
    status: '',
    loading: false,
}

export const createPost = createAsyncThunk('post/createPost', async (list) => {
    try {
        const {data} = await axios.post('/posts', list)
        return data;
    } catch (e) {
        console.log(e);
    }
})

export const getAllPosts = createAsyncThunk('post/getAllPosts', async (å) => {
    try {
        const {data} = await axios.get('/posts')
        return data;
    } catch (e) {
        console.log(e);
    }
})

export const removePost = createAsyncThunk('post/removePost', async (id) => {
    try {
        const {data} = await axios.delete(`/posts/${id}`, id);
        return data;
    } catch (e) {
        console.log(e);
    }
})

export const updatePost = createAsyncThunk('post/updatePost', async (updatedPost) => {
    try {
        const {data} = await axios.put(`/posts/${updatedPost.id}`, updatedPost);
        return data;
    } catch (e) {
        console.log(e);
    }
})

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        clearStatus: (state) => {
            state.status = null;
        }
    },
    extraReducers: {
        [createPost.pending]: (state) => {
            state.loading = true;
        },
        [createPost.fulfilled]: (state, action) => {
            state.loading = false;
            state.posts.push(action.payload)
            state.status = action.payload.message
        },
        [createPost.rejected]: (state, action) => {
            state.loading = false;
            state.status = action.payload.message
        },

        // ______________________

        [getAllPosts.pending]: (state) => {
            state.loading = true;
        },
        [getAllPosts.fulfilled]: (state, action) => {
            state.loading = false;
            state.posts = action.payload.posts;
            state.popularPosts = action.payload.popularPosts;
            state.status = action.payload.message
        },
        [getAllPosts.rejected]: (state, action) => {
            state.loading = false;
            state.status = action.payload.message
        },

        // ______________________

        [removePost.pending]: (state) => {
            state.loading = true;
        },
        [removePost.fulfilled]: (state, action) => {
            state.loading = false;
            state.posts = state.posts.filter((post) => post._id !== action.payload.id);
            state.status = action.payload.message;
        },
        [removePost.rejected]: (state, action) => {
            state.loading = false;
            state.status = action.payload.message;
        },

        // ______________________

        [updatePost.pending]: (state) => {
            state.loading = true;
        },
        [updatePost.fulfilled]: (state, action) => {
            state.loading = false;
            const index = state.posts.findIndex((post) => post.id === action.payload._id);
            state.posts[index] = action.payload.post;
            state.status = action.payload.message;
        },
        [updatePost.rejected]: (state, action) => {
            state.loading = false;
            state.status = action.payload.message;
        },
    }
})

export const {clearStatus} = postSlice.actions