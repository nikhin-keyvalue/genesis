import { baseApi } from "../../api"; // Import baseApi

// Extend the base API for user-specific endpoints
export const generateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/health",
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      }),
    }),
    generateQuestions: builder.mutation({
      query: (data) => ({
        url: "/api/agent/chat",
        method: "POST",
        body: data,
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      }),
    }),

    generateAssessmentQuestions: builder.mutation({
      query: (data) => ({
        url: "/api/assessment/chat",
        method: "POST",
        body: data,
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      }),
    }),

    generateUserExplainQuestions: builder.mutation({
      query: (data) => ({
        url: "/api/assessment/chat",
        method: "POST",
        body: data,
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      }),
    }),
  }),
  overrideExisting: false,
});

// Export the auto-generated hook for the `getUsers` query
export const {
  useGetUsersQuery,
  useGenerateQuestionsMutation,
  useGenerateAssessmentQuestionsMutation,
  useGenerateUserExplainQuestionsMutation,
} = generateApi;
