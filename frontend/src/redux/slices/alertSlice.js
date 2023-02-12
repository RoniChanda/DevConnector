import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "Alert",
  initialState: { alerts: [] },
  reducers: {
    setAlert: (state, action) => {
      state.alerts = [...state.alerts, action.payload];
    },
    removeAlert: (state, action) => {
      state.alerts = state.alerts.filter(
        (alert) => alert.id !== action.payload
      );
    },
  },
});

export const alertActions = alertSlice.actions;
export default alertSlice.reducer;
