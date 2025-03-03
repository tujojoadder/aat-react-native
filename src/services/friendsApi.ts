import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import * as Keychain from 'react-native-keychain';
// Retrieve the token from cookies
/* getUserDetails */
interface UserDetails {
  cover_photo: string;
  followers_count: number;
  followings_count: number;
  friends_count: number;
  identifier: string;
  profile_picture: string;
  user_fname: string;
  user_lname: string;
  is_following: boolean;
  friend_state: string;
  privacy_setting : string;
}
interface ApiResponse {
  data: UserDetails;
}
// Define a service using a base URL and expected endpoints
export const friendsApi = createApi({
  reducerPath: 'friendsApi',
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
  tagTypes: ["RequestOrCancel", "AcceptFriendRequest", "Unfriend"],
  endpoints: (builder) => ({
    //get friend sugestion 5 record for home
    friendSuggestionhome: builder.query({
      query: () => {
        return {
          url: "/friendsuggestionhome",
          method: "GET",
        };
      },
      providesTags: ["RequestOrCancel",'Unfriend'],
    }),

    //get specific user details

    getUserDetails: builder.query<ApiResponse, string>({
      query: (id) => `/userdetails/${id}`,
    }),
    
    /*   is Friend or not */
    getFriendState: builder.query({
      query: (id) => `friend-state/${id}`, // Assuming your API endpoint is '/api/friend-state/:id'
      providesTags: ["AcceptFriendRequest", "RequestOrCancel",'Unfriend'],
    }),

    /* Send Friend Request */
   
      sendFriendRequest: builder.mutation<any,{receiver_id:string}>({
      query: (data) => ({
        url: "/sendfriendrequest",
        method: "POST",
        body:  data 
      }),
      invalidatesTags: ["RequestOrCancel"],
    }),
    

    /* cancel Friend Request */
    cancelFriendRequest: builder.mutation<any,{receiver_id:string}>({
      query: (data) => {
        return {
          url: "/cancelfriendrequest",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["RequestOrCancel"],
    }),

    /* get auth usrer friend list */
    getAuthUserfriendRequest: builder.query<any,{friendRequestPage:number}>({
      query: ({ friendRequestPage = 1 }) =>
        `auth-friend-requests?page=${friendRequestPage}`,
      providesTags:['Unfriend','AcceptFriendRequest']
    }),

    /* get all sented request auuth user did pendding*/
    getAuthUserSentRequest: builder.query({
      query: ({ friendRequestPage = 1 }) =>
        `sentfriendrequest?page=${friendRequestPage}`,
      providesTags: ["RequestOrCancel"],
    }),

    /* <<<<---- Friend Request Page ----->>>> */

    /* friend request --->>>home  */

    getFriendSuggestion: builder.query<any,{friendSuggestionPage:number}>({
      query: ({ friendSuggestionPage = 1 }) =>
        `getsuggestionfriends?page=${friendSuggestionPage}`,
      providesTags: ["RequestOrCancel",'Unfriend'],
    }),

    /* Send Friend Request */
    manageFriendRequest: builder.mutation({
      query: ({ sender_id, decision }) => {
        return {
          url: "/managefriendrequest",
          method: "POST",
          body: { sender_id, decision },
        };
      },
      invalidatesTags: ["AcceptFriendRequest"],
    }),
    /*sss--> getAuthUserFriends */
    getAuthUserFriends: builder.query<any,{friendPage:number}>({
      query: ({ friendPage = 1 }) => `getauthuserfriendids?page=${friendPage}`, // Updated to include id
      providesTags: ["AcceptFriendRequest",'Unfriend','RequestOrCancel'],
    }),

    unfriendUser: builder.mutation({
      query: ({ useridtoremove }) => ({
          url: 'friends/unfriend', // Keep it simple without appending the ID in the URL
          method: 'DELETE', // Assuming you use DELETE to unfriend
          body: { useridtoremove }, // Send the user ID in the request body
      }),
      invalidatesTags:['Unfriend']
  }),


  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useManageFriendRequestMutation,
  useUnfriendUserMutation,
  useGetAuthUserFriendsQuery,
  useGetAuthUserSentRequestQuery,
  useGetFriendSuggestionQuery,
  useGetAuthUserfriendRequestQuery,
  useCancelFriendRequestMutation,
  useSendFriendRequestMutation,
  useGetUserDetailsQuery,
  useGetFriendStateQuery,
  useFriendSuggestionhomeQuery,
} = friendsApi;
