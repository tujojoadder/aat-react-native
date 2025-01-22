import React from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Appbar} from 'react-native-paper';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootParamList} from '../../../RootNavigator';
import {useNavigation} from '@react-navigation/native';

type ProfileNavigationProps = NativeStackNavigationProp<
  RootParamList,
  'profile'
>;

export default function Profile() {
  const navigation = useNavigation<ProfileNavigationProps>();
  const {width} = Dimensions.get('window'); // Get screen width dynamically

  const coverPhotoHeight = width * 0.5; // Adjust height as 50% of screen width
  const profilePhotoSize = width * 0.33; // Profile photo size as 30% of screen width

  return (
    <View style={styles.container}>
      {/* App Bar */}
      <Appbar.Header style={{height: 50}}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
      </Appbar.Header>

      {/* Cover Photo Section */}
      <View
        style={[
          styles.coverPhotoContainer,
          {marginBottom: profilePhotoSize / 2},
        ]}>
        <Image
          source={{
            uri: 'https://www.hindustantimes.com/ht-img/img/2023/04/03/1600x900/Roman_Reigns_1680493737496_1680493761254_1680493761254.jpg',
          }}
          style={[styles.coverPhoto, {height: coverPhotoHeight}]}
          resizeMode="cover"
        />

        {/* Profile Photo */}
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ9uutrjp7JJ_ZmeMkOpQc3n8ql36KbvRiu9wvGrVxq1MYR_UpPAxkA11vzaABGaDoBVI&usqp=CAU',
          }}
          style={[
            styles.profilePhoto,
            {
              width: profilePhotoSize,
              height: profilePhotoSize,
              borderRadius: profilePhotoSize / 2, // Circular profile photo
              bottom: -profilePhotoSize / 2,
            },
          ]}
        />
      </View>

      {/* Profile Details Section */}
      <View style={styles.detailsContainer}>
        <Text style={styles.profileName}>Turjo Joadder</Text>
        <Text style={styles.profileIdentifire}>@turjojoadder123</Text>

        {/* Button Group */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.addFriendButton}>
            <Text style={styles.addFriendText}>Add Friend</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.messageButton}>
            <Text style={styles.messageText}>Message</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.editProfileButton}>
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f4f4',
    flex: 1,
  },

  coverPhotoContainer: {
    position: 'relative', // Relative positioning for profile photo overlap
    width: '100%',
    backgroundColor: '#000', // Fallback color if the image fails to load
  },
  coverPhoto: {
    width: '100%',
    borderBottomLeftRadius: 20, // Adds rounded corners to the bottom
    borderBottomRightRadius: 20,
  },
  profilePhoto: {
    position: 'absolute', // Overlay the profile photo
    left: '5%',
/*>>> we also using bottom on component */
    borderWidth: 4,
    borderColor: '#fff', // Add a white border around the profile photo
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  detailsContainer: {
    
    paddingHorizontal: 16,
    marginTop: 5, // Adjust for spacing
    alignItems:'flex-start'
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',

  },
  profileIdentifire: {
    fontSize: 15,
    color: '#555',
    marginBottom: 16,
    opacity:0.6
  },
  buttonGroup: {
    flexDirection: 'row', // Buttons side by side
    justifyContent: 'center',
    marginBottom: 16, // Space between buttons and Edit Profile
  },
  addFriendButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10, // Space between buttons
  },
  addFriendText: {
    color: '#fff',
    fontWeight: '600',
  },
  messageButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  messageText: {
    color: '#fff',
    fontWeight: '600',
  },
  editProfileButton: {
    backgroundColor: '#6200ee',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  editProfileText: {
    color: '#fff',
    fontWeight: '600',
  },
});
