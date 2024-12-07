// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import * as Keychain from 'react-native-keychain';
export const groupsApi = createApi({
  reducerPath: "groupsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_LARAVEL_URL}/api`, // Update this as needed
    prepareHeaders: async (headers) => {
      // Retrieve token from Keychain
      try {
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
          const userToken = credentials.password; // The token is stored as the password
          // Set the token in the authorization header if it exists
          headers.set('Authorization', `Bearer ${userToken}`);
        }
      } catch (error) {
        console.error('Error retrieving token from Keychain:', error);
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
