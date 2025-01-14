import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import * as Keychain from 'react-native-keychain';
interface LogoutResponse {
  message: string;
}
/* getDayHadiths */
// Define the type for DayHadith and its properties
type DayHadith = {
  // Modify these fields based on the actual properties of the day_hadith object
  day_hadith_id: number;
  isLiked: boolean;
  hadith: string;
  // Add any other properties the `day_hadith` object may have
};

// Define the type for a User, including their dayHadith
type User = {
  user_id: string;
  user_fname: string;
  user_lname: string;
  email: string;
  gender: string;
  birthdate: string;
  blueticks: number;
  cover_photo: string;
  profile_picture: string;
  total_quiz_point: number;
  created_at: string;
  updated_at: string;
  day_hadith: DayHadith[]; // dayHadith is now an array based on the response structure
  // Add other fields as needed
};

// Define the response format for the getDayHadiths query
interface GetDayHadithsResponse {
  data: User[];
}


/* getRandomHadith */
interface RandomHadith {
  data: {
    book: string; // The name of the book (e.g., "SahihBukhari")
    created_at: string; // The timestamp of creation in ISO 8601 format
    hadith: string; // The text of the Hadith
    hadith_id: string; // A unique identifier for the Hadith
    has_ques: "yes" | "no"; // Indicates if there are questions related to the Hadith
    language: string; // The language of the Hadith (e.g., "Bangla")
    updated_at: string; // The timestamp of the last update in ISO 8601 format
  };
}

export const hadithApi = createApi({
  reducerPath: 'hadithApi',
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
    /*    get random hadith for hadithbox */
    getRandomHadith: builder.query<RandomHadith,void>({
      query: () => {
        return {
          url: '/get-random-hadith',
          method: 'GET',
        };
      },
    }),

    // setDayhadith
    setDayhadith: builder.mutation<{data:any},{ hadith_id: string }>({
      query: data => {
        return {
          url: '/setdayhadith',
          method: 'POST',
          body: data,
        };
      },
    }),

    /*  Get all user day hadiths  */
    getDayHadiths: builder.query<GetDayHadithsResponse, void>({
      query: () => {
        return {
          url: '/getdayhadiths',
          method: 'GET',
        };
      },
    }) /* like day hadith */,
    likeDayHadith: builder.mutation({
      query: data => {
        return {
          url: '/likedayhadith',
          method: 'POST',
          body: data,
        };
      },
    }),

    /* Day hadith Details  */
    dayHadithDetails: builder.mutation({
      query: () => {
        return {
          url: '/dayhadithdetails',
          method: 'POST',
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useDayHadithDetailsMutation,
  useGetRandomHadithQuery,
  useSetDayhadithMutation,
  useGetDayHadithsQuery,
  useLikeDayHadithMutation,
} = hadithApi;
