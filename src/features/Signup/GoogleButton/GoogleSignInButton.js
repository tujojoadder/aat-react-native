import React, {useEffect, useState} from 'react';
import {View, Text, Button, Alert} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

export default function GoogleSignInButton() {
  const [isInProgress, setIsInProgress] = useState(false); // State to track sign-in progress

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
      console.log('Google User Info:', userInfo);
      Alert.alert('Sign-In Successful');
    } catch (error) {
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

  const signOut = async () => {
    try {
      await GoogleSignin.signOut(); // Attempt to sign out
      Alert.alert('Sign-Out Successful', 'You have successfully signed out.');
    } catch (error) {
      console.error('Google Sign-Out Error:', error);
      Alert.alert(
        'Sign-Out Error',
        'An error occurred while signing out. Please try again.',
      );
    }
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
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
}