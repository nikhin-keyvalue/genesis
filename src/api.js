import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Base API configuration
export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://e51f-103-138-236-18.ngrok-free.app",
  }),
  prepareHeaders: (headers) => {
    headers.set("ngrok-skip-browser-warning", "true" ); // Example of custom header
    return headers;
  },
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (userData) => ({
        url: '/user/',
        method: 'POST',
        body: userData,
        headers: {
          'Content-Type': 'application/json'
        }
      }),
    }),
    submit: builder.mutation({
      query: (userData) => ({
        url: '/api/assessment/submit',
        method: 'POST',
        body: userData,
        headers: {
          'Content-Type': 'application/json'
        }
      }),
    }),
  }),
});

export const { useCreateUserMutation, useSubmitMutation } = baseApi;