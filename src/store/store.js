import { configureStore } from "@reduxjs/toolkit";
import { generateApi } from "../pages/generate/api";
import { baseApi } from "../api"; // Import baseApi

export const store = configureStore({
  reducer: {
    [generateApi.reducerPath]: generateApi.reducer, // Add the API reducer
    [baseApi.reducerPath]: baseApi.reducer, // Add base API reducer
  },
  // Adding the api middleware enables caching, invalidation, and other features
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(generateApi.middleware),
});
