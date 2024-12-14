import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootParamList} from '../../../RootNavigator';
import {useAdditionalInformationMutation} from '../../services/userLoginApi';
import {setAuthenticated} from '../Home/HomeSlice';
import * as Keychain from 'react-native-keychain';
import {
  TextInput,
  Button,
  Snackbar,
  Appbar,
  HelperText,
} from 'react-native-paper';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Picker} from '@react-native-picker/picker';

type NavigationProp = NativeStackNavigationProp<RootParamList, 'signupAddInfo'>;

const SignupAddInfo = ({route}: {route: {params: {email: string}}}) => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '212461889410-pt3bcbmi4j56lgvvrc7vp21kc8805td2.apps.googleusercontent.com',
    });
  }, []);

  const [errors, setErrors] = useState<any>({
    fname: '',
    lname: '',
    password: '',
    birthdate: '',
  });
  const validateForm = () => {
    let valid = true;
    let newErrors = {fname: '', lname: '', password: '', birthdate: ''};

    // Validate first name
    if (!formData.fname.trim()) {
      newErrors.fname = 'First name is required.';
      valid = false;
    } else if (formData.fname.length > 50) {
      newErrors.fname = 'First name must not exceed 50 characters.';
      valid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(formData.fname)) {
      newErrors.fname = 'First name must contain only letters.';
      valid = false;
    }

    // Validate last name
    if (!formData.lname.trim()) {
      newErrors.lname = 'Last name is required.';
      valid = false;
    } else if (formData.lname.length > 50) {
      newErrors.lname = 'Last name must not exceed 50 characters.';
      valid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(formData.lname)) {
      newErrors.lname = 'Last name must contain only letters.';
      valid = false;
    }

    // Validate password
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required.';
      valid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
      valid = false;
    } else if (formData.password.length > 50) {
      newErrors.password = 'Password must not exceed 50 characters.';
      valid = false;
    }

    // Validate birthdate
    // Validate birthdate
    const {birthdate_day, birthdate_month, birthdate_year} = formData;
    const selectedDate = new Date(
      parseInt(birthdate_year, 10),
      parseInt(birthdate_month, 10) - 1, // Months are 0-indexed in JavaScript Date
      parseInt(birthdate_day, 10),
    );
    const today = new Date();
    const fiveYearsAgo = new Date(
      today.getFullYear() - 5,
      today.getMonth(),
      today.getDate(),
    );

    if (
      selectedDate.getFullYear() !== parseInt(birthdate_year, 10) ||
      selectedDate.getMonth() !== parseInt(birthdate_month, 10) - 1 ||
      selectedDate.getDate() !== parseInt(birthdate_day, 10)
    ) {
      newErrors.birthdate = 'Invalid date selected.';
      valid = false;
    } else if (selectedDate > today) {
      newErrors.birthdate = 'Birthdate cannot be in the future.';
      valid = false;
    } else if (selectedDate > fiveYearsAgo) {
      newErrors.birthdate = 'You must be at least 5 years old.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const navigation = useNavigation<NavigationProp>();
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    gender: 'male',
    password: '',
    birthdate_day: '1',
    birthdate_month: '1',
    birthdate_year: '2000',
  });

  const [isInProgress, setIsInProgress] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useDispatch();
  const [additionalInformation] = useAdditionalInformationMutation();

  const handleInputChange = (field: string, value: string) => {
    setFormData({...formData, [field]: value});

    // Clear errors dynamically
    if (errors[field]) {
      setErrors({...errors, [field]: ''});
    }
  };
  const handleSubmit = async () => {
    if (validateForm()) {
      setIsInProgress(true);
      try {
        const {
          fname,
          lname,
          gender,
          password,
          birthdate_day,
          birthdate_month,
          birthdate_year,
        } = formData;
        const birthdate = `${birthdate_year}-${birthdate_month}-${birthdate_day}`;

        const res = await additionalInformation({
          formData: {
            fname,
            lname,
            gender,
            password,
            birthdate_day,
            birthdate_month,
            birthdate_year,
          },
          email: route.params.email,
        }).unwrap();

        if (res.message === 'Registration successful') {
          await Keychain.setGenericPassword('authToken', res.token);
          dispatch(setAuthenticated(true));
          Alert.alert('Sign Up Successful');
        } else {
          setErrorMessage(res.message);
        }
      } catch (error) {
        setErrorMessage('An error occurred. Please try again.');
      } finally {
        setIsInProgress(false);
      }
    }
  };

  const days = Array.from({length: 31}, (_, i) => (i + 1).toString());
  const months = [
    {label: 'Jan', value: '1'},
    {label: 'Feb', value: '2'},
    {label: 'Mar', value: '3'},
    {label: 'Apr', value: '4'},
    {label: 'May', value: '5'},
    {label: 'Jun', value: '6'},
    {label: 'Jul', value: '7'},
    {label: 'Aug', value: '8'},
    {label: 'Sep', value: '9'},
    {label: 'Oct', value: '10'},
    {label: 'Nov', value: '11'},
    {label: 'Dec', value: '12'},
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({length: 100}, (_, i) =>
    (currentYear - i).toString(),
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Sign-Up Information</Text>
        <TextInput
          label="First Name"
          value={formData.fname}
          onChangeText={text => handleInputChange('fname', text)}
          style={styles.input}
          placeholder="Enter your first name"
        />
        <HelperText type="error" visible={!!errors.fname}>
          {errors.fname}
        </HelperText>
        <TextInput
          label="Last Name"
          value={formData.lname}
          onChangeText={text => handleInputChange('lname', text)}
          style={styles.input}
          placeholder="Enter your last name"
        />
        <HelperText type="error" visible={!!errors.lname}>
          {errors.lname}
        </HelperText>
        <TextInput
          label="Password"
          secureTextEntry
          value={formData.password}
          onChangeText={text => handleInputChange('password', text)}
          style={styles.input}
          placeholder="Create a password"
        />
        <HelperText type="error" visible={!!errors.password}>
          {errors.password}
        </HelperText>
        <Text style={styles.label}>Birthdate</Text>
        <View style={styles.dateSection}>
          <View style={styles.dateColumn}>
            <Text style={styles.dateLabel}>Day</Text>
            <Picker
              selectedValue={formData.birthdate_day}
              onValueChange={value => handleInputChange('birthdate_day', value)}
              style={styles.picker}>
              {days.map(day => (
                <Picker.Item key={day} label={day} value={day} />
              ))}
            </Picker>
          </View>
          <View style={styles.dateColumn}>
            <Text style={styles.dateLabel}>Month</Text>
            <Picker
              selectedValue={formData.birthdate_month}
              onValueChange={value =>
                handleInputChange('birthdate_month', value)
              }
              style={styles.picker}>
              {months.map(({label, value}) => (
                <Picker.Item key={value} label={label} value={value} />
              ))}
            </Picker>
          </View>
          <View style={styles.dateColumn}>
            <Text style={styles.dateLabel}>Year</Text>
            <Picker
              selectedValue={formData.birthdate_year}
              onValueChange={value =>
                handleInputChange('birthdate_year', value)
              }
              style={styles.picker}>
              {years.map(year => (
                <Picker.Item key={year} label={year} value={year} />
              ))}
            </Picker>
          </View>
        </View>
        <HelperText type="error" visible={!!errors.birthdate}>
          {errors.birthdate}
        </HelperText>
        <Text style={styles.label}>Gender</Text>
        <Picker
          selectedValue={formData.gender}
          onValueChange={value => handleInputChange('gender', value)}
          style={styles.picker}>
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Others" value="others" />
        </Picker>
        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={isInProgress}
          disabled={isInProgress}
          style={styles.button}
          labelStyle={{color: 'white'}}>
          {isInProgress ? 'Signing Up...' : 'Create account'}
        </Button>
        {/* //Show error message */}
        <Snackbar
          visible={!!errorMessage}
          onDismiss={() => setErrorMessage(null)}
          duration={Snackbar.DURATION_SHORT}
          action={{
            label: 'Dismiss',
            onPress: () => setErrorMessage(null),
          }}>
          {errorMessage}
        </Snackbar>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f7fa',/*  // Light background */
  },
  appbar: {
    backgroundColor: 'transparent',
    elevation: 0, // Removes shadow for clean look
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 13,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,

    elevation: 2, // Subtle shadow for card effect
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#4A90E2', // Modern blue accent
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#f8f8ff',
    borderRadius: 8,
  },
  dateSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 2,
  },
  dateColumn: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  dateLabel: {
    fontSize: 14,
    marginBottom: 5,
    color: '#555',
  },
  button: {
    marginTop: 20,
    borderRadius: 8,

    backgroundColor: '#5569ff', // Professional blue tone
    alignSelf: 'center',
  },
  picker: {
    width: '100%',
    backgroundColor: '#f0f4f8',
    borderRadius: 8,
    elevation: 1,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
    fontWeight: '500',
  },
  snackbar: {
    backgroundColor: '#e74c3c', // Error red
  },
});

export default SignupAddInfo;
