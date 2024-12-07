import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import * as Keychain from 'react-native-keychain';

// Define a service using a base URL and expected endpoints
export const userLoginApi = createApi({
  reducerPath: 'userLoginApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_LARAVEL_URL}/api`, // Update this as needed
    prepareHeaders: async headers => {
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
  endpoints: builder => ({
    // signin with google
    googleSignIn: builder.mutation({
      query: token => ({
        url: 'google-sign-in', // Endpoint for your backend
        method: 'POST',
        body: {token}, // Send the Google ID token to the backend
      }),
    }),
    additionalInformation: builder.mutation<
      any,
      {formData: any; email: string}
    >({
      query: data => ({
        url: '/additionalinformation',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {useGoogleSignInMutation,useAdditionalInformationMutation} = userLoginApi;
