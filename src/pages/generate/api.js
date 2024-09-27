import { baseApi } from "../../api"; // Import baseApi

// Extend the base API for user-specific endpoints
export const generateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
    }),
  }),
  overrideExisting: false,
});

// Export the auto-generated hook for the `getUsers` query
export const { useGetUsersQuery } = generateApi;
