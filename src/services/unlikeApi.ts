// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import * as Keychain from 'react-native-keychain';
export const unlikeApi = createApi({
  reducerPath: "unlikeApi",
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
  
    endpoints: (builder) => ({



 // Define the toggleLove mutation
 toggleUnlike: builder.mutation({
    query: ({ unlikeOnType, unlikeOnId }) => ({
      url: `/toggle-unlike/${unlikeOnType}/${unlikeOnId}`,
      method: 'POST',
    }),
    }),
  



      
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useToggleUnlikeMutation

} = unlikeApi