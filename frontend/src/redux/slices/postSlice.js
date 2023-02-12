import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  post: null,
  isLoading: "pending",
  error: {},
};

const postSlice = createSlice({
  name: "Post",
  initialState,
  reducers: {
    postLoading: (state) => {
      state.isLoading = "pending";
    },

    getPosts: (state, { payload }) => {
      state.posts = payload;
      state.isLoading = "idle";
    },

    getPost: (state, { payload }) => {
      state.post = payload;
      state.isLoading = "idle";
    },

    addPost: (state, { payload }) => {
      state.posts.unshift(payload);
      state.isLoading = "idle";
    },

    deletePost: (state, { payload }) => {
      state.posts = state.posts.filter((post) => post._id !== payload);
      state.isLoading = "idle";
    },

    postError: (state, { payload }) => {
      state.error = payload;
      state.isLoading = "idle";
    },

    updateLikes: (state, { payload }) => {
      const foundPost = state.posts.findIndex(
        (post) => post._id.toString() === payload.postId
      );
      if (foundPost >= 0) {
        state.posts[foundPost].likes = payload.likes;
      }
      state.isLoading = "idle";
    },

    addComment: (state, { payload }) => {
      state.post.comments = payload;
      state.isLoading = "idle";
    },

    removeComment: (state, { payload }) => {
      state.post.comments = state.post.comments.filter(
        (comment) => comment._id !== payload
      );
      state.isLoading = "idle";
    },
  },
});

export const postActions = postSlice.actions;
export default postSlice.reducer;
