import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Easing,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDispatch } from 'react-redux';
import * as ImagePicker from 'react-native-image-picker';
import { useUserPostInsertMutation } from '../../services/profileApi';
import { Appbar, Text, Snackbar } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootParamList } from '../../../RootNavigator';
import { useNavigation } from '@react-navigation/native';

type CreatePostProp = NativeStackNavigationProp<RootParamList>;

export default function CreatePost() {
  const navigation = useNavigation<CreatePostProp>();
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [textValue, setTextValue] = useState('');
  const [message, setMessage] = useState('');
  const [showResetButton, setShowResetButton] = useState(false);
  const [isTextAreaFocused, setIsTextAreaFocused] = useState(false);
  const [audience, setAudience] = useState('public');
  const [fadeAnim] = useState(new Animated.Value(0)); // For fade-in animation
  const [snackbarVisible, setSnackbarVisible] = useState(false); // Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Snackbar message
  const [snackbarType, setSnackbarType] = useState<'success' | 'error'>('success'); // Snackbar type

  const [userPostInsert, { isLoading }] = useUserPostInsertMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    // Fade-in animation when the component mounts
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSelectChange = (value: string) => {
    setAudience(value);
  };

  const handleFileInputChange = () => {
    if (isLoading) return; // Disable file input during loading
    ImagePicker.launchImageLibrary(
      { mediaType: 'photo', selectionLimit: 1 },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else if (
          response.assets &&
          response.assets.length > 0 &&
          response.assets[0].uri
        ) {
          setSelectedFile(response.assets[0].uri);
          setMessage('Image selected');
          setShowResetButton(true);
        }
      },
    );
  };

  const handleTextChange = (text: string) => {
    if (isLoading) return; // Disable text input during loading
    setTextValue(text);
    setShowResetButton(text.trim() !== '' || selectedFile !== null);
  };

  const handleReset = () => {
    if (isLoading) return; // Disable reset during loading
    setTextValue('');
    setSelectedFile(null);
    setMessage('');
    setShowResetButton(false);
    setIsTextAreaFocused(false);
  };

  const handleSubmit = async () => {
    if (isLoading) return; // Prevent multiple submissions

    const formData = new FormData();
    formData.append('text', textValue);
    formData.append('audience', audience);

    if (selectedFile) {
      formData.append('image', {
        uri: selectedFile,
        type: 'image/jpeg',
        name: 'post-image.jpg',
      });
      formData.append('image_or_text', 'image');
    } else {
      formData.append('image_or_text', 'text');
    }

    try {
      const res = await userPostInsert(formData);
      if (res.data) {
        setSnackbarMessage('Post created successfully!');
        setSnackbarType('success');
        setSnackbarVisible(true);
        handleReset();
      } else if (res.error) {
        setSnackbarMessage('Failed to create post. Please try again.');
        setSnackbarType('error');
        setSnackbarVisible(true);
        console.log(res.error);
      }
    } catch (error) {
      setSnackbarMessage('An error occurred. Please try again.');
      setSnackbarType('error');
      setSnackbarVisible(true);
      console.log(error);
    }
  };

  const isPostButtonEnabled = (textValue.trim() !== '' || selectedFile !== null) && !isLoading;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Create Post" titleStyle={styles.headerTitle} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Animated.View style={[styles.postContainer, { opacity: fadeAnim }]}>
          <TextInput
            placeholder="What's on your mind?"
            placeholderTextColor="#888"
            value={textValue}
            onChangeText={handleTextChange}
            multiline={true}
            onFocus={() => setIsTextAreaFocused(true)}
            onBlur={() => setIsTextAreaFocused(false)}
            style={[
              styles.textarea,
              {
                borderColor: isTextAreaFocused ? '#1682e8' : '#E0E0E0',
                maxHeight: 170,
                opacity: isLoading ? 0.6 : 1, // Dim text input during loading
              },
            ]}
            editable={!isLoading} // Disable text input during loading
          />

          {selectedFile && (
            <Image
              source={{ uri: selectedFile }}
              style={[styles.selectedImage, { opacity: isLoading ? 0.6 : 1 }]} // Dim image during loading
            />
          )}

          <View style={styles.actionsContainer}>
            <TouchableOpacity
              onPress={handleFileInputChange}
              style={styles.iconButton}
              disabled={isLoading} // Disable file input during loading
            >
              <Text style={[styles.icon, { opacity: isLoading ? 0.6 : 1 }]}>📷</Text>
            </TouchableOpacity>

            <Picker
              selectedValue={audience}
              style={[styles.picker, { opacity: isLoading ? 0.6 : 1 }]} // Dim picker during loading
              onValueChange={(itemValue) => handleSelectChange(itemValue)}
              enabled={!isLoading} // Disable picker during loading
            >
              <Picker.Item label="Public" value="public" />
              <Picker.Item label="Private" value="private" />
              <Picker.Item label="Only Me" value="only_me" />
            </Picker>

            {showResetButton && (
              <TouchableOpacity
                onPress={handleReset}
                style={styles.resetButton}
                disabled={isLoading} // Disable reset button during loading
              >
                <Text style={[styles.resetIcon, { opacity: isLoading ? 0.6 : 1 }]}>🗑️</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={handleSubmit}
              style={[
                styles.postButton,
                {
                  backgroundColor:
                    isPostButtonEnabled && !isLoading ? '#1682e8' : '#e8dddc',
                },
              ]}
              disabled={!isPostButtonEnabled || isLoading}>
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={[styles.postButtonText, { color: isPostButtonEnabled && !isLoading ? 'white' : 'black' }]}>
                  Post
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {message && <Text style={styles.message}>{message}</Text>}
        </Animated.View>
      </ScrollView>

      {/* Snackbar for success/error messages */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000} // 3 seconds
        style={{
          backgroundColor: snackbarType === 'success' ? '#4CAF50' : '#FF5252',
        }}>
        <Text style={{ color: 'black' }}>{snackbarMessage}</Text>
      </Snackbar>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
  },
  postContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  textarea: {
    width: '100%',
    padding: 12,
    fontSize: 16,
    lineHeight: 24,
    borderRadius: 8,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    textAlignVertical: 'top',
    backgroundColor: '#f8f9fa',
    color: '#333',
    marginBottom: 16,
  },
  selectedImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  iconButton: {
    padding: 8,
  },
  icon: {
    fontSize: 24,
    color: '#1682e8',
  },
  picker: {
    flex: 1,
    height: 40,
    color: '#1682e8',
    marginHorizontal: 12,
  },
  resetButton: {
    padding: 8,
  },
  resetIcon: {
    fontSize: 20,
    color: '#FF5A5A',
  },
  postButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1682e8',
  },
  postButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  message: {
    marginTop: 10,
    color: '#555',
    fontSize: 14,
    textAlign: 'center',
  },
});