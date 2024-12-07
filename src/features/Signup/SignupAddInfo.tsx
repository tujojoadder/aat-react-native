import React, { useEffect, useState } from 'react';
import { View, Text, Alert, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootParamList } from '../../../RootNavigator';
import { useAdditionalInformationMutation } from '../../services/userLogin';
import { setAuthenticated } from '../Home/HomeSlice';
import * as Keychain from 'react-native-keychain';
import { TextInput, Button, Snackbar, Appbar } from 'react-native-paper';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

type NavigationProp = NativeStackNavigationProp<RootParamList, 'signupAddInfo'>;

const SignupAddInfo = ({ route }: { route: { params: { email: string } } }) => {

    useEffect(() => {
        GoogleSignin.configure({
          webClientId:
            '212461889410-pt3bcbmi4j56lgvvrc7vp21kc8805td2.apps.googleusercontent.com',
        });
      }, []);


  const navigation = useNavigation<NavigationProp>();
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    gender: 'male', // Default value
    password: '',
    birthdate_day: '',
    birthdate_month: '',
    birthdate_year: '',
  });

  const [isInProgress, setIsInProgress] = useState(false); // For button disable during request
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useDispatch();
  const [additionalInformation, { isSuccess, isError, data }] = useAdditionalInformationMutation();

  // Handle form input change
  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    setIsInProgress(true); // Start loading

    try {
      // Prepare the data to be sent
      const { fname, lname, gender, password, birthdate_day, birthdate_month, birthdate_year } = formData;
      const birthdate = `${birthdate_year}-${birthdate_month}-${birthdate_day}`;

      // Send data using RTK Query
      const res = await additionalInformation({
        formData: { fname, lname, gender, password, birthdate_day, birthdate_month, birthdate_year },
        email: route.params.email,
      }).unwrap();

      if (res.message === 'Registration successful') {
        // Store token and update authenticated state
        await Keychain.setGenericPassword('authToken', res.token);
        dispatch(setAuthenticated(true));
        Alert.alert('Sign Up Successful');

      } else {
        setErrorMessage(res.message); // Show error message
      }
    } catch (error) {
      console.error('Sign-Up Error:', error);
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setIsInProgress(false); // Reset loading state
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust for iOS/Android
    >
    
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Sign-Up Information</Text>

        <TextInput
          label="First Name"
          value={formData.fname}
          onChangeText={(text) => handleInputChange('fname', text)}
          style={styles.input}
          mode="outlined"
        />
        <TextInput
          label="Last Name"
          value={formData.lname}
          onChangeText={(text) => handleInputChange('lname', text)}
          style={styles.input}
          mode="outlined"
        />
        <TextInput
          label="Password"
          secureTextEntry
          value={formData.password}
          onChangeText={(text) => handleInputChange('password', text)}
          style={styles.input}
          mode="outlined"
        />

        {/* Birthdate (Day, Month, Year) Inputs in One Row */}
        <View style={styles.dateRow}>
          <TextInput
            label="Day"
            value={formData.birthdate_day}
            onChangeText={(text) => handleInputChange('birthdate_day', text)}
            style={[styles.input, styles.dateInput]}
            mode="outlined"
            keyboardType="numeric"
          />
          <TextInput
            label="Month"
            value={formData.birthdate_month}
            onChangeText={(text) => handleInputChange('birthdate_month', text)}
            style={[styles.input, styles.dateInput]}
            mode="outlined"
            keyboardType="numeric"
          />
          <TextInput
            label="Year"
            value={formData.birthdate_year}
            onChangeText={(text) => handleInputChange('birthdate_year', text)}
            style={[styles.input, styles.dateInput]}
            mode="outlined"
            keyboardType="numeric"
          />
        </View>

        <TextInput
          label="Gender"
          value={formData.gender}
          onChangeText={(text) => handleInputChange('gender', text)}
          style={styles.input}
          mode="outlined"
        />

        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={isInProgress}
          disabled={isInProgress}
          style={styles.button}
        >
          {isInProgress ? 'Signing Up...' : 'Submit'}
        </Button>

        <Snackbar
          visible={!!errorMessage}
          onDismiss={() => setErrorMessage(null)}
          duration={Snackbar.DURATION_SHORT}
          action={{
            label: 'Dismiss',
            onPress: () => setErrorMessage(null),
          }}
        >
          {errorMessage}
        </Snackbar>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 30, // To ensure there is space at the bottom when the keyboard is visible
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  dateInput: {
    flex: 1,
    marginHorizontal: 5,
  },
  button: {
    marginTop: 20,
  },
});

export default SignupAddInfo;
