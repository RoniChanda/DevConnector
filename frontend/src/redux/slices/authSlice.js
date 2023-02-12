import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  isLoading: null,
  user: null,
};

const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    userLoaded: (state, { payload }) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user = payload;
    },

    authSuccess: (state, { payload }) => {
      localStorage.setItem("token", payload.token);
      state.token = payload.token;
      state.isAuthenticated = !!payload.token;
      state.isLoading = false;
    },

    authFail: (state) => {
      localStorage.removeItem("token");
      state.token = null;
      state.isAuthenticated = !!localStorage.getItem("token");
      state.isLoading = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
