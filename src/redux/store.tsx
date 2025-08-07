import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import snackbarSlice from "./snackbarSlice";

const rootReducer = combineReducers({
  snackbar: snackbarSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
