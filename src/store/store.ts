import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import { authSlice } from "./slices/authSlice";
import { patientSlice } from "./slices/patientSlice";
import { medicationSlice } from "./slices/medicationSlice";
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    patient: patientSlice.reducer,
    medication: medicationSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(apiSlice.middleware),
  devTools: true,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
