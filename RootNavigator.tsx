import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux'; // Assuming you're using Redux for auth state
import AuthStack from './src/features/AuthStack';
import AppStack from './src/features/AppStack';
import { RootState } from './src/app/store';

const RootStack = createNativeStackNavigator();

export default function RootNavigator() {
  const isLoggedIn = useSelector((state:RootState) => state.home.isLogin); // Replace with your auth logic

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <RootStack.Screen name="AppStack" component={AppStack} />
        ) : (
          <RootStack.Screen name="AuthStack" component={AuthStack} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
