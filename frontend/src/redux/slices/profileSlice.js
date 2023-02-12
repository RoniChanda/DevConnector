import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  isLoading: "pending",
  error: {},
};

const profileSlice = createSlice({
  name: "Profile",
  initialState,
  reducers: {
    profileLoading: (state) => {
      state.isLoading = "pending";
    },
    getProfile: (state, { payload }) => {
      state.profile = payload;
      state.isLoading = "idle";
    },
    getAllProfiles: (state, { payload }) => {
      state.profiles = payload;
      state.isLoading = "idle";
    },
    getRepos: (state, { payload }) => {
      state.repos = payload;
      state.isLoading = "idle";
    },
    profileError: (state, { payload }) => {
      state.error = payload;
      state.isLoading = "idle";
    },
    clearProfile: (state) => {
      state.profile = null;
      state.repos = [];
      state.isLoading = "idle";
    },
  },
});

export const profileActions = profileSlice.actions;
export default profileSlice.reducer;
