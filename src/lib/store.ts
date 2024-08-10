import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./api/auth/authSlice";
import { apiSlice, rtkQueryErrorLogger } from "./apiSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice,
      [apiSlice.reducerPath]: apiSlice.reducer,
    }, // all reducers, defined here!
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }).concat(apiSlice.middleware, rtkQueryErrorLogger),

    devTools: true,
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
