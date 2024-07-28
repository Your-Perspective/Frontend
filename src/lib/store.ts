import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./features/counter/counterSlice";
import { apiSlice, rtkQueryErrorLogger } from "./apiSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      count: counterSlice,
      [apiSlice.reducerPath]: apiSlice.reducer,
    }, // all reducers, defined here!
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware, rtkQueryErrorLogger),

    devTools: true,
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
