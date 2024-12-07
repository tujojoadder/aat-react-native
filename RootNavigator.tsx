import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import * as Keychain from 'react-native-keychain';
import Home from './src/features/Home/Home';
import Login from './src/features/Signup/Login/Login';
import {ActivityIndicator} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from './src/app/store';
import {setAuthenticated} from './src/features/Home/HomeSlice';

export type RootParamList = {
  home: undefined; // No parameters for the "home" screen
  login: undefined; // No parameters for the "login" screen
};
const Stack = createNativeStackNavigator<RootParamList>();

export default function RootNavigator() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.home.isAuthenticated,
  );
  const [isLoading, setIsLoading] = useState(true); // Loading state to track fetching status

  // Fetch the token from Keychain on component mount
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const credentials = await Keychain.getGenericPassword(); // Retrieve the token
        if (credentials) {
          dispatch(setAuthenticated(true));
        } else {
          dispatch(setAuthenticated(false));
        }
      } catch (error) {
        console.error('Error retrieving token from Keychain:', error);
        dispatch(setAuthenticated(false));
      } finally {
        setIsLoading(false); // Stop loading once the token is fetched
      }
    };

    fetchToken(); // Call fetchToken function on mount
  }, []);

  if (isLoading) {
    // Optionally render a loading spinner or a placeholder until the token check is complete
    return <></>; // Or return a loading spinner component
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isAuthenticated ? (
          // If authenticated, show home screen
          <Stack.Screen name="home" component={Home} />
        ) : (
          // If not authenticated, show login screen
          <Stack.Screen name="login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
