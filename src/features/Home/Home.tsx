import {View, Text} from 'react-native';
import React from 'react';
import * as Keychain from 'react-native-keychain';
import {Appbar, Button} from 'react-native-paper';
import {setAuthenticated} from './HomeSlice';
import {useDispatch} from 'react-redux';
import { useNavigation } from '@react-navigation/native';
export default function Home() {
  const dispatch = useDispatch();
  const navigation = useNavigation();


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

  const _goBack = () => console.log('Went back');

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => console.log('Shown more');
  return (
    <View>
      <Appbar.Header>
      <Appbar.BackAction onPress={() => navigation.goBack()} />
      </Appbar.Header>

      <Text>Home</Text>
      <Button onPress={deleteToken}>Delete</Button>
    </View>
  );
}
