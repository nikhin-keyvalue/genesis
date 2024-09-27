import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Base API configuration
export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://46d4-103-138-236-18.ngrok-free.app",
  }),
  prepareHeaders: (headers) => {
    headers.set("ngrok-skip-browser-warning", "true" ); // Example of custom header
    return headers;
  },
  endpoints: () => ({}), // Empty endpoints here, will be extended later
});
