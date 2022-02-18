import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postService";

const initialState = {
  posts: [],
  post: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// create a new post
export const createNewPost = createAsyncThunk(
  "posts/create",
  async (postData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.createPost(postData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user posts
export const getUserPosts = createAsyncThunk(
  "tickets/getUserAll",
  async (userId, thunkAPI) => {
    try {
      console.log(userId);
      const token = thunkAPI.getState().auth.user.token;
      return await postService.getUserPosts(userId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user posts
export const getUserPost = createAsyncThunk(
  "tickets/getUserPost",
  async ({ userId, postId }, thunkAPI) => {
    try {
      console.log(userId, postId);
      const token = thunkAPI.getState().auth.user.token;
      return await postService.getUserPost({ userId, postId }, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewPost.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createNewPost.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(getUserPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(getUserPosts.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(getUserPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.post = action.payload;
      })
      .addCase(getUserPost.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = postSlice.actions;
export default postSlice.reducer;
