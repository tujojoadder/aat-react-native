// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {REACT_APP_LARAVEL_URL} from '@env';
// Retrieve the token from cookies
const userToken = '120|ZP8C4dGETwsCGSNS8vlH5uxAb8uIADrTyhxYvbWXd8d5a1b1';

// Define a service using a base URL and expected endpoints

export const groupsApi = createApi({
  reducerPath: "groupsApi",
  baseQuery: fetchBaseQuery({
  
    baseUrl: `${REACT_APP_LARAVEL_URL}/api`, 
    prepareHeaders: (headers) => {
      if (userToken) {
        headers.set("authorization", `Bearer ${userToken}`);
      }
      return headers;
    },
  }),
  
  tagTypes: ["Create", "Join","CreatePost","AcceptJoinRequest","ApprovePostOrReject","KickOrMakeAdmin"],
  endpoints: (builder) => ({
 
    /*  get random post */
    getRandomGroupPost: builder.query({
      query: (page = 1) => `group/randomposts?page=${page}`, // Updated to include id
    }),
    /*    get user details */
    getUserDetails: builder.query({
      query: () => {
        return {
          url: "/userdetails",
          method: "GET",
         
        };
      },
    }),

  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
 
  useGetRandomGroupPostQuery,
  useGetUserDetailsQuery
} = groupsApi;
