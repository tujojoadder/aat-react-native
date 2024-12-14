import React, {useEffect, useState} from 'react';
import {View, Text, Button, Alert} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import * as Keychain from 'react-native-keychain'; // Import Keychain for storing tokens
import {useGoogleSignInMutation} from '../../../services/userLoginApi';
import { setAuthenticated } from '../../Home/HomeSlice';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootParamList } from '../../../../RootNavigator';

type NavigationProp = NativeStackNavigationProp<RootParamList, 'signupAddInfo'>; // Type for navigating to 'signupAddInfo'

export default function GoogleSignInButton() {
  const navigation = useNavigation<NavigationProp>(); // Get navigation instance
  const dispatch=useDispatch();
  const [isInProgress, setIsInProgress] = useState(false); // State to track sign-in progress
  const [googleSignIn, {isSuccess, isError, data}] = useGoogleSignInMutation(); // RTK Query hook for Google Sign-In API

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '212461889410-pt3bcbmi4j56lgvvrc7vp21kc8805td2.apps.googleusercontent.com',
    });
  }, []);
  const signIn = async () => {
    setIsInProgress(true); // Set progress to true before starting
    try {
      await GoogleSignin.hasPlayServices(); // Check Play Services
      const userInfo = await GoogleSignin.signIn(); // Attempt to sign in

      // Send the Google ID token to the backend for verification and to get an API token
      const res = await googleSignIn(userInfo.data?.idToken); // Send the ID token
      console.log(res);
      if (res?.data?.message=='have account') {
        // Store the token securely in Keychain
        await Keychain.setGenericPassword('authToken', res.data.token);
        dispatch(setAuthenticated(true));
      }else if(res?.data?.message=='no account'){
        navigation.navigate('signupAddInfo', { email: res.data.email });
      }
      
      else {
        console.log(res.error);
      }

      // Store token with a key (e.g., 'authToken')
      /* 
      console.log('Google User Info:', userInfo); */

      Alert.alert('Sign-In Successful');
    } catch (error: any) {
      //deafault is unknown data type for try catch
      console.error('Google Sign-In Error:', error);

      // Handle errors based on their status codes
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Sign-In Cancelled', 'You cancelled the sign-in process.');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert(
          'Sign-In In Progress',
          'Please wait for the ongoing sign-in process to complete.',
        );
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert(
          'Play Services Error',
          'Google Play Services are not available or outdated.',
        );
      } else {
        Alert.alert(
          'Sign-In Error',
          'An unknown error occurred. Please try again.',
        );
      }
    }
    setIsInProgress(false); // Reset progress state after attempt
  };



  return (
    <View>
      <Text style={{fontSize: 20, marginBottom: 10}}>Google Sign-In</Text>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={signIn}
        disabled={isInProgress} // Disable button while in progress
      />
      <View style={{marginVertical: 10}} />
   
    </View>
  );
}
