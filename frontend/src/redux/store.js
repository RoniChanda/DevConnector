import { configureStore } from "@reduxjs/toolkit";

import alertReducer from "./slices/alertSlice";
import authReducer from "./slices/authSlice";
import profileReducer from "./slices/profileSlice";
import postReducer from "./slices/postSlice";

const store = configureStore({
  reducer: {
    alert: alertReducer,
    auth: authReducer,
    profile: profileReducer,
    post: postReducer,
  },
});

export default store;
