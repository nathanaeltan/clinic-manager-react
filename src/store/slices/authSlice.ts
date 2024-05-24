import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  access_token: string | null;
  isAuthenticated: boolean;
};
const initialState: AuthState = {
  access_token: localStorage.getItem("access_token"),
  isAuthenticated: false,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser(state, action: PayloadAction<{ access: string }>) {
      state.isAuthenticated = action.payload.access ? true : false;
      state.access_token = action.payload.access;
      localStorage.setItem("access_token", action.payload.access);
    },
  },
});

export const { loginUser } = authSlice.actions;
