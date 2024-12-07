import { View, Text } from 'react-native'
import React from 'react'
import * as Keychain from 'react-native-keychain';
import { Button } from 'react-native-paper';
import { setAuthenticated } from './HomeSlice';
import { useDispatch } from 'react-redux';
export default function Home() {
  const dispatch=useDispatch();

const deleteToken = async () => {
  try {
    const success = await Keychain.resetGenericPassword(); // Deletes the credentials
    if (success) {
      dispatch(setAuthenticated(false));
    } else {
      console.log('Failed to delete the token');
    }
  } catch (error) {
    console.error('Error deleting the token:', error);
  }
};
  return (
    <View>
      <Text>Home</Text>
      <Button onPress={deleteToken}>Delete</Button>
    </View>
  )
}