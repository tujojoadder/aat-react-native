import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux'; // Assuming you're using Redux for auth state
import AppStack from './src/features/AppStack';
import {RootState} from './src/app/store';
import Home from './src/features/Home/Home';
import Login from './src/features/Signup/Login/Login';
import UserDetailsChecker from './src/features/Signup/UserDetailsChecker/UserDetailsChecker';
export type RootParamList = {
  home: undefined; // No parameters for the "home" screen
  login: undefined; // No parameters for the "login" screen
};

const Stack = createNativeStackNavigator<RootParamList>();

export default function RootNavigator() {

  return (
    <NavigationContainer>
   
        <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="home" component={Home} />

        </Stack.Navigator>
  
    </NavigationContainer>
  );
}
