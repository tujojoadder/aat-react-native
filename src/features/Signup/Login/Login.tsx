import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, ScrollView, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  TextInput,
  Button,
  Text,
  Title,
  HelperText,
} from 'react-native-paper';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import * as Keychain from 'react-native-keychain';
import { useLoginMutation } from '../../../services/userLoginApi';
import { RootParamList } from '../../../../RootNavigator';
import GoogleSignInButton from './../GoogleButton/GoogleSignInButton';
import { setAuthenticated } from '../../Home/HomeSlice';
import { useDispatch } from 'react-redux';
import { getErrorMessage } from '../../../utils/errorUtils';

type LoginProps = NativeStackScreenProps<RootParamList, 'login'>;

export default function Login({ navigation }: LoginProps) {
  const dispatch = useDispatch();
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '212461889410-pt3bcbmi4j56lgvvrc7vp21kc8805td2.apps.googleusercontent.com',
    });
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [token, setToken] = useState<string | null>(null);

  const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation();

  // Normal login logic
  const handleLogin = async () => {
    if (validateForm()) {
      try {
        const result = await login({ email, password }).unwrap();
        if (result.message === 'sucessful') {
          Alert.alert('Success', 'Login successful!');
          await Keychain.setGenericPassword('token', result.token);
          dispatch(setAuthenticated(true));
          setToken(result.token);
        } else {
          Alert.alert('Error', result.message);
        }
      } catch (err: any) {
        Alert.alert('Login failed', err.data.message);
      }
    }
  };

  // Fetch token from Keychain on component mount
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
          setToken(credentials.password);
        }
      } catch (error) {
        console.error('Error retrieving token from Keychain:', error);
      }
    };

    fetchToken();
  }, []);

  // Sign out logic
  const handleSignOut = async () => {
    try {
      await GoogleSignin.signOut();
      await Keychain.resetGenericPassword();
      setToken(null);
      Alert.alert('Signed out', 'You have been signed out successfully');
    } catch (error) {
      console.error('Sign out error', error);
    }
  };

  // Form validation
  const validateForm = () => {
    let valid = true;
    let newErrors = { email: '', password: '' };

    // Validate email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.trim()) {
      newErrors.email = 'Email is required.';
      valid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
      valid = false;
    }

    // Validate password
    if (!password.trim()) {
      newErrors.password = 'Password is required.';
      valid = false;
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
      valid = false;
    } else if (password.length > 50) {
      newErrors.password = 'Password must not exceed 50 characters.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Title style={styles.title}>Login</Title>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          style={styles.input}
        />
        <HelperText type="error" visible={!!errors.email}>
          {errors.email}
        </HelperText>

        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          secureTextEntry
          style={styles.input}
        />
        <HelperText type="error" visible={!!errors.password}>
          {errors.password}
        </HelperText>

        <Button
          mode="contained"
          onPress={handleLogin}
          style={styles.button}
          loading={isLoading}
          disabled={isLoading}>
          Login
        </Button>

        {isError && (
          <Text style={styles.errorText}>{getErrorMessage(error)}</Text>
        )}

        {token && <Text style={styles.tokenText}>Token: {token}</Text>}

        <GoogleSignInButton />

        <Button mode="outlined" onPress={handleSignOut} style={styles.button}>
          Sign Out
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
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
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 8,
  },
  tokenText: {
    marginTop: 20,
    textAlign: 'center',
    color: 'green',
  },
});
