import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { redirectToLogin } from "../../utils/history";
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000",
  prepareHeaders: (headers) => {
    headers.set(
      "Authorization",
      `Bearer ${localStorage.getItem("access_token")}`
    );
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // Redirect to login page on 401 error
    localStorage.removeItem("access_token");
    redirectToLogin()
  }
  return result;
};
export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Patient", "Medication"],
  endpoints: (builder) => ({}),
});
