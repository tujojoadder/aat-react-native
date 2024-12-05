import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useGetUserDetailsQuery} from '../services/userAuthApi';
import {PropsWithChildren} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootParamList} from '../../../../RootNavigator';
import {
  setUser_id,
  setProfile_picture,
  setUser_fname,
  setUser_lname,
  setEmail,
  setIdentifier,
  setCover_photo,
  setBirthDate,
  setGender,
} from '../../Home/HomeSlice';

const UserDetailsChecker = ({children}: PropsWithChildren) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();
  const route = useRoute<RouteProp<RootParamList, keyof RootParamList>>();
  const [isLoading, setIsLoading] = useState(true);

  const {
    data: userDetails,
    isSuccess: userDetailsSuccess,
    isError: userDetailsError,
  } = useGetUserDetailsQuery();

  useEffect(() => {
    if (userDetailsSuccess) {
      dispatch(setUser_id(userDetails.data.user_id));
      dispatch(setProfile_picture(userDetails.data.profile_picture));
      dispatch(setUser_fname(userDetails.data.user_fname));
      dispatch(setUser_lname(userDetails.data.user_lname));
      dispatch(setEmail(userDetails.data.email));
      dispatch(setIdentifier(userDetails.data.identifier));
      dispatch(setCover_photo(userDetails.data.cover_photo));
      dispatch(setBirthDate(userDetails.data.birthdate));
      dispatch(setGender(userDetails.data.gender));
      setIsLoading(false);

      // Navigate away from auth screens if already authenticated
      if (
        route.name === 'login' /* ||
        route.name === "ForgotPassword" ||
        route.name === "ResetPassword" */
      ) {
        navigation.navigate('home');
      }
    } else if (userDetailsError) {
      if (
        route.name !== 'login' /* &&
        route.name !== "ForgotPassword" &&
        route.name !== "ResetPassword" */
      ) {
        navigation.reset({
          index: 0,
          routes: [{name: 'login'}],
        });
      } else {
        setIsLoading(false);
      }
    }
  }, [userDetailsSuccess, userDetailsError, route.name]);

  if (isLoading) {
    return null; // Optionally return a loading spinner
  }

  return <>{children}</>;
};

export default UserDetailsChecker;
