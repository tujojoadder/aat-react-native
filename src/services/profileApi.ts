import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import * as Keychain from 'react-native-keychain';

// Define a service using a base URL and expected endpoints
export const profileApi = createApi({
  reducerPath: 'profileApi',
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
  tagTypes: ["CreatePost"],
  endpoints: (builder) => ({
    /* <----  Other's User ---> */

    /*    get specific usrer post for profile */
    getSpecificUserPost: builder.query<any,{postPage:number,userId:string}>({
      query: ({ postPage = 1, userId }) =>
        `getspecificuserposts?page=${postPage}&id=${userId}`, // Updated to include id
    }),

    /*    get specific usrer images for profile */
    getSpecificUserPhoto: builder.query<any,{photoPage:number,userId:string}>({
      query: ({ photoPage = 1, userId }) =>
        `getspecificuserphotos?page=${photoPage}&id=${userId}`, // Updated to include id
    }),

    /* get specific usrer friends for profile */
    getSpecificUserFriend: builder.query<any,{friendPage:number,userId:string}>({
      query: ({ friendPage = 1, userId }) =>
        `getspecificuserfriendids?page=${friendPage}&id=${userId}`, // Updated to include id
    }),

    /* get all followers for specific user on profile*/
    getSpecificUserFollower: builder.query({
      query: ({ followerPage = 1, userId }) =>
        `getspecificuserfollower?page=${followerPage}&id=${userId}`, // Updated to include id
    }),

    /* get all following for specific user on profile*/
    getSpecificUserFollowing: builder.query({
      query: ({ followingPage = 1, userId }) =>
        `getspecificuserfollowing?page=${followingPage}&id=${userId}`, // Updated to include id
    }),

    /*<<<---- Auth user ---->>> */

    /* Create Post user */
    userPostInsert: builder.mutation({
      query: (data) => {
        return {
          url: "/post/create",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["CreatePost"],
    }),

    /*    get specific usrer post for profile */
    getAuthUserPost: builder.query({
      query: ({ page = 1 }) => `getauthuserposts?page=${page}`, // Updated to include id
      providesTags: ["CreatePost"],
    }),

    /*    get specific usrer images for profile */
    getAuthUserPhoto: builder.query({
      query: ({ photoPage = 1 }) => `getauthuserphotos?page=${photoPage}`, // Updated to include id
      providesTags: ["CreatePost"],
    }),

    /* get specific usrer images for profile */
    getAuthUserFriend: builder.query({
      query: ({ friendPage = 1 }) => `getauthuserfriendids?page=${friendPage}`, // Updated to include id
     /*  providesTags: ["AcceptFriendRequest"], //no AcceptFriendRequest has */
    }),

    /* get all followers for specific user on profile*/
    getAuthUserFollower: builder.query({
      query: ({ followerPage = 1 }) =>
        `getauthuserfollower?page=${followerPage}`, // Updated to include id
    }),

    /* get all following for specific user on profile*/
    getAuthUserFollowing: builder.query({
      query: ({ followingPage = 1 }) =>
        `getauthuserfollowing?page=${followingPage}`, // Updated to include id
    }),

    /*<<<---- About ---->*/
    saveAbout: builder.mutation({
      query: (about) => ({
        url: "/about/createorupdate",
        method: "POST",
        body: about,
      }),
    }),

    /* Update birthdate */

    updateBirthdate: builder.mutation({
      query: (birthday) => ({
        url: "/users/updatebirthdate",
        method: "PUT",
        body: birthday,
      }),
    }),

    /* Update gender */
    updateGender: builder.mutation({
      query: (gender) => ({
        url: "/users/updategender",
        method: "PUT",
        body: gender,
      }),
    }),

    /* Get About data */
    getAboutData: builder.query({
      query: () => ({
        url: "/getabout",
        method: "GET",
      }),
    }),

    /* Get About data */
    getSpecificUserAbout: builder.query<any,string>({
      query: (id) => `/about/${id}`, // API endpoint for fetching user about data
    }),

    /* <---- MProfile -----> */
    /* get mphoto to set */
    getMProfilePhotos: builder.query({
      query: ({ photoPage = 1 }) => `viewmpicturestore?page=${photoPage}`, // Updated to include id
    }),

    /* get fphoto to set */
    getFProfilePhotos: builder.query({
      query: ({ photoPage = 1 }) => `viewfpicturestore?page=${photoPage}`, // Updated to include id
    }),

    /* get cover photo to set */
    getCoverPhotos: builder.query({
      query: ({ photoPage = 1 }) => `viewcoverphotostore?page=${photoPage}`, // Updated to include id
    }),

    /* setCoverPhoto */
    setCoverPhoto: builder.mutation({
      query: ({ image_id }) => ({
        url: `setcoverphoto`,
        method: "POST",
        body: { image_id },
      }),
    }),

    /* set MProfile picture */
    setMProfile: builder.mutation({
      query: ({ image_id }) => ({
        url: `setmprofile`,
        method: "POST",
        body: { image_id },
      }),
    }),
    /* setCoverPhoto */
    setFProfile: builder.mutation({
      query: ({ image_id }) => ({
        url: `setfprofile`,
        method: "POST",
        body: { image_id },
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useSetFProfileMutation,
  useGetSpecificUserAboutQuery,
  useSetMProfileMutation,
  useUserPostInsertMutation,
  useSetCoverPhotoMutation,
  useGetCoverPhotosQuery,
  useGetFProfilePhotosQuery,
  useGetMProfilePhotosQuery,
  useGetAboutDataQuery,
  useUpdateGenderMutation,
  useUpdateBirthdateMutation,
  useSaveAboutMutation,
  useGetSpecificUserFollowingQuery,
  useGetSpecificUserFollowerQuery,
  useGetSpecificUserPhotoQuery,
  useGetSpecificUserPostQuery,
  useGetSpecificUserFriendQuery,
  useGetAuthUserPostQuery,
  useGetAuthUserPhotoQuery,
  useGetAuthUserFollowerQuery,
  useGetAuthUserFollowingQuery,
  useGetAuthUserFriendQuery,
} = profileApi;
