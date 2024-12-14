import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
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

  const [login, { isLoading, isError, error }] = useLoginMutation();

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
        <Title style={styles.title}>Welcome Back</Title>
        <Text style={styles.subtitle}>Login to your account</Text>
        
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          style={styles.input}
          placeholder="Enter your email"
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
          placeholder="Enter your password"
        />
        <HelperText type="error" visible={!!errors.password}>
          {errors.password}
        </HelperText>

        <TouchableOpacity
          onPress={() =>
            
            
            
            navigation.navigate('forgotpassword')

          } // Placeholder navigation
          style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

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

        <GoogleSignInButton />

        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b6b6b',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    margin: 0,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  forgotPasswordText: {
    color: '#007bff',
    fontSize: 14,
    fontWeight: '500',
  },
  button: {
    marginTop: 12,
    paddingVertical: 4,
    borderRadius: 10,
  },
  footerText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#6b6b6b',
  },
  signUpText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 8,
  },
});
