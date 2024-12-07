import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  TextInput,
  Button,
  Text,
  Title,
  Provider as PaperProvider,
  Appbar,
} from 'react-native-paper';

import GoogleSignInButton from '../GoogleButton/GoogleSignInButton';
import {RootParamList} from '../../../../RootNavigator';
import * as Keychain from 'react-native-keychain';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
type LoginProps = NativeStackScreenProps<RootParamList, 'login'>;

export default function Login({navigation}: LoginProps) {

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '212461889410-pt3bcbmi4j56lgvvrc7vp21kc8805td2.apps.googleusercontent.com',
    });
  }, []);
 



  useEffect(() => {
    const signOut = async () => {
      try {
        await GoogleSignin.signOut(); // Attempt to sign out

      } catch (error) {
        console.error('Google Sign-Out Error:', error);
       
      }
    };
    signOut();
  }, [])
  


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Logged in with:', email, password);
    // Add login logic here
  };

  const [token, setToken] = useState(''); // State to store the token

  // Fetch the token from Keychain on component mount
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const credentials = await Keychain.getGenericPassword(); // Retrieve the token
        if (credentials) {
          console.log(credentials.password);
          setToken(credentials.password); // Store the token in state
        } else {
          setToken('No token found'); // Handle case where no token is found
        }
      } catch (error) {
        console.error('Error retrieving token from Keychain:', error);
        setToken('Failed to load token'); // Handle error while fetching token
      }
    };

    fetchToken(); // Call fetchToken function on mount
  }, []);

  return (
    <PaperProvider>
      <View style={styles.container}>


        <Title style={styles.title}>Login</Title>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          secureTextEntry
          style={styles.input}
        />
        <Button mode="contained" onPress={handleLogin} style={styles.button}>
          Login
        </Button>

        <Text>{token}</Text>

        <View style={{marginVertical: 10}} />
        <GoogleSignInButton />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  link: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 16,
  },
});
