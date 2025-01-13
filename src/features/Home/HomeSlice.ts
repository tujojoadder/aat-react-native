import {createSlice} from '@reduxjs/toolkit';
type DayHadith = {
  day_hadith: {
    isLiked: boolean;
    day_hadith_id:string;
    hadith:{
      hadith:string;
    }
  };
  profile_picture:string;
  user_fname:string;
  user_lname:string;
};

interface HomeState {
  isAuthenticated: boolean | null;
  user_id: string;
  profile_picture: string;
  user_fname: string;
  user_lname: string;
  email: string;
  identifier: string;
  cover_photo: string;
  gender: string;
  birthdate: string;
  allDayHadith: DayHadith[];
  
}

const initialState: HomeState = {
  isAuthenticated: null,
  user_id: '',
  profile_picture: '',
  user_fname: '',
  user_lname: '',
  email: '',
  identifier: '',
  cover_photo: '',
  gender: '',
  birthdate: '',
  allDayHadith: [],
};


export const homeSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload; // Directly set to the boolean payload
    },
    setUser_id: (state, action) => {
      state.user_id = action.payload;
    },
    setProfile_picture: (state, action) => {
      state.profile_picture = action.payload;
    },
    setUser_fname: (state, action) => {
      state.user_fname = action.payload;
    },
    setUser_lname: (state, action) => {
      state.user_lname = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setIdentifier: (state, action) => {
      state.identifier = action.payload;
    },
    setCover_photo: (state, action) => {
      state.cover_photo = action.payload;
    },
    setBirthDate: (state, action) => {
      state.birthdate = action.payload;
    },
    setGender: (state, action) => {
      state.gender = action.payload;
    },



    /* Hadith reducers */

    setAllDayHadith: (state, action) => {
      state.allDayHadith = action.payload;
    },

    setIsLiked: (state, action) => {
      const { index } = action.payload;
      state.allDayHadith[index].day_hadith.isLiked = true;
    },





  },
});

export const {
  setAuthenticated,
  setUser_id,
  setProfile_picture,
  setUser_fname,
  setUser_lname,
  setEmail,
  setIdentifier,
  setCover_photo,
  setBirthDate,
  setGender,
  setAllDayHadith,
  setIsLiked
} = homeSlice.actions;

export default homeSlice.reducer;
