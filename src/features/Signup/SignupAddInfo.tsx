import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootParamList } from '../../../RootNavigator';
import { useAdditionalInformationMutation } from '../../services/userLogin';
import { setAuthenticated } from '../Home/HomeSlice';
import * as Keychain from 'react-native-keychain';
import {
  TextInput,
  Button,
  Snackbar,
  Appbar,
  HelperText,
} from 'react-native-paper';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Picker } from '@react-native-picker/picker';

type NavigationProp = NativeStackNavigationProp<RootParamList, 'signupAddInfo'>;

const SignupAddInfo = ({ route }: { route: { params: { email: string } } }) => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '212461889410-pt3bcbmi4j56lgvvrc7vp21kc8805td2.apps.googleusercontent.com',
    });
  }, []);

  const navigation = useNavigation<NavigationProp>();
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    gender: 'male',
    password: '',
    birthdate_day: '',
    birthdate_month: '',
    birthdate_year: '',
  });

  const [isInProgress, setIsInProgress] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useDispatch();
  const [additionalInformation, { isSuccess, isError, data }] = useAdditionalInformationMutation();

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
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
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Back" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Sign-Up Information</Text>

        <TextInput
          label="First Name"
          value={formData.fname}
          onChangeText={(text) => handleInputChange('fname', text)}
          style={styles.input}
          mode="outlined"
          placeholder="Enter your first name"
        />
        <HelperText type="error" visible={!formData.fname}>
          First Name is required
        </HelperText>

        <TextInput
          label="Last Name"
          value={formData.lname}
          onChangeText={(text) => handleInputChange('lname', text)}
          style={styles.input}
          mode="outlined"
          placeholder="Enter your last name"
        />

        <TextInput
          label="Password"
          secureTextEntry
          value={formData.password}
          onChangeText={(text) => handleInputChange('password', text)}
          style={styles.input}
          mode="outlined"
          placeholder="Create a password"
        />

        <View style={styles.dateRow}>
          <TextInput
            label="Day"
            value={formData.birthdate_day}
            onChangeText={(text) => handleInputChange('birthdate_day', text)}
            style={[styles.input, styles.dateInput]}
            mode="outlined"
            keyboardType="numeric"
            placeholder="DD"
          />
          <TextInput
            label="Month"
            value={formData.birthdate_month}
            onChangeText={(text) => handleInputChange('birthdate_month', text)}
            style={[styles.input, styles.dateInput]}
            mode="outlined"
            keyboardType="numeric"
            placeholder="MM"
          />
          <TextInput
            label="Year"
            value={formData.birthdate_year}
            onChangeText={(text) => handleInputChange('birthdate_year', text)}
            style={[styles.input, styles.dateInput]}
            mode="outlined"
            keyboardType="numeric"
            placeholder="YYYY"
          />
        </View>

        <Text style={styles.label}>Gender</Text>
        <Picker
          selectedValue={formData.gender}
          onValueChange={(value) => handleInputChange('gender', value)}
          style={styles.picker}
        >
          <Picker.Item label="Male"  value="male" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Other" value="others" />
        </Picker>

        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={isInProgress}
          disabled={isInProgress}
          style={styles.button}
          labelStyle={{ color: 'white' }} // Set text color to white
        >
          {isInProgress ? 'Signing Up...' : 'Create account'}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  appbar: {
    backgroundColor: 'transparent',
   
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dateInput: {
    flex: 1,
    marginHorizontal: 8,
  },
  button: {
    marginTop: 20,
    borderRadius: 8,
    padding:2,
    backgroundColor: '#2e2e4a',
    alignSelf: 'center',  // This will center the button based on its content width
  }
  ,
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 15,
 
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
});

export default SignupAddInfo;
