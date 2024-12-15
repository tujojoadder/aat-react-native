import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import * as Keychain from 'react-native-keychain';
import {Appbar, Button, Dialog, Portal, Paragraph} from 'react-native-paper';
import {setAuthenticated} from './HomeSlice';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useLogOutUserMutation} from '../../services/userAuthApi';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export default function Home() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [logOutUser, {isLoading, isSuccess, isError, error}] =
    useLogOutUserMutation();

  const [visible, setVisible] = useState(false); // State for dialog visibility

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const handleLogout = async () => {
    try {
      const data = await logOutUser().unwrap();

      // If logout was successful, clear stored credentials
      await handlePostLogoutActions();
    } catch (error) {
      console.log('Error during logout:', error);
    }
  };

  const handlePostLogoutActions = async () => {
    try {
      // Sign out from Google
       await GoogleSignin.signOut();
       // If backend logout was successful, clear stored credentials
      const success = await Keychain.resetGenericPassword(); // Deletes the credentials
      if (success) {
        dispatch(setAuthenticated(false)); // Update Redux state
      } else {
        console.log('Failed to delete the token');
      }
    } catch (error) {
      console.error('Error deleting the token:', error);
    }
  };

  // Use `useEffect` to handle side effects after a successful logout
  useEffect(() => {
    if (isSuccess) {
      handlePostLogoutActions();
    }
  }, [isSuccess]);

  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
      </Appbar.Header>
      <Text>Home</Text>
      <Button onPress={showDialog}>Logout</Button>

      {/* Dialog for confirmation */}
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Confirm Logout</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Are you sure you want to logout?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button
              onPress={() => {
                handleLogout();
                hideDialog();
              }}>
              Logout
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
