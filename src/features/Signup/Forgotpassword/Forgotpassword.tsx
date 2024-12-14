import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  TextInput,
  Button,
  Snackbar,
  ActivityIndicator,
  Title,
  Paragraph,
} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {useForgotPasswordMutation} from '../../../services/userLoginApi';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootParamList} from '../../../../RootNavigator';

type LoginProps = NativeStackScreenProps<RootParamList, 'forgotpassword'>;

const ForgotPassword = ({navigation}: LoginProps) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [linkSent, setLinkSent] = useState(false); // To track if the link has been sent
  const dispatch = useDispatch();

  const [forgotPassword] = useForgotPasswordMutation();

  const handleSubmission = async () => {
    if (!email) {
      setSnackbarMessage('Please enter your email address');
      setSnackbarVisible(true);
      return;
    }

    setIsLoading(true);
    try {
      const response = await forgotPassword({email});

      if (response.data) {
        setSnackbarMessage("We've sent a link to your email.");
        setSnackbarVisible(true);
        setLinkSent(true); // Update state when the link is sent
      } else {
        setSnackbarMessage('Failed to send email, please try again.');
        setSnackbarVisible(true);
      }
    } catch (error) {
      // Handle error (e.g., network error)
      setSnackbarMessage('Something went wrong, please try again.');
      setSnackbarVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    // Navigate back to the login page using React Navigation
    navigation.navigate('login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Title style={styles.header}>Forgot Password</Title>

        {/* Conditional message based on linkSent state */}
        <Paragraph
          style={[
            styles.subHeader,
            linkSent && {color: 'red'}, // Set the color to red when linkSent is true
          ]}>
          {linkSent
            ? 'Go to your email and click the link to reset your password.'
            : 'Reset Password link sent to your email'}
        </Paragraph>

        {!linkSent ? (
          <TextInput
            label="Email address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={styles.input}
          />
        ) : null}

        <Button
          mode="contained"
          onPress={handleSubmission}
          disabled={isLoading}
          style={styles.button}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : linkSent ? (
            'Send one more time' // Text changes after link is sent
          ) : (
            'Send link to email'
          )}
        </Button>

        {/* Back to Login button appears if the link is sent */}
        {linkSent && (
          <Button
            mode="text"
            onPress={handleBackToLogin}
            style={styles.backButton}>
            Back to Login Page
          </Button>
        )}
      </View>

      {/* Snackbar at the bottom center */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={styles.snackbar}>
        {snackbarMessage}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  input: {
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
  },
  backButton: {
    marginTop: 20,
    marginBottom: 20,
  },
  snackbar: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    width: '80%', // Adjust width as needed
  },
});

export default ForgotPassword;
