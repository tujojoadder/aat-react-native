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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type ProfileNavigationProps = NativeStackNavigationProp<
  RootParamList,
  'profile'
>;

export default function Profile() {
  const navigation = useNavigation<ProfileNavigationProps>();
  const {width} = Dimensions.get('window');

  const coverPhotoHeight = width * 0.5;
  const profilePhotoSize = width * 0.33;

  return (
    <View style={styles.container}>
      {/* App Bar */}
      <Appbar.Header style={styles.appBar}>
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
              borderRadius: profilePhotoSize / 2,
              bottom: -profilePhotoSize / 2,
            },
          ]}
        />
      </View>

      {/* Profile Details Section */}
      <View style={styles.detailsContainer}>
        
        <View style={styles.userNames}>
        <Text style={styles.profileName}>Turjo Joadder</Text>
        <Text style={styles.profileIdentifire}>@turjojoadder123</Text>
        </View>
        {/* Button Group */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.addFriendButton}>
            <MaterialIcons
              name="person-add"
              size={24}
              color="#fff"
              style={{marginRight: 8}}
            />
            <Text style={styles.addFriendText}>Add Friend</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.messageButton}>
            <MaterialIcons
              name="message"
              size={24}
              color="#fff"
              style={{marginRight: 8}}
            />
            <Text style={styles.messageText}>Message</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f9fa', // Softer background
    flex: 1,
  },
  appBar: {
    height: 50,
    backgroundColor: '#fff',
    elevation: 2,
  },
  coverPhotoContainer: {
    position: 'relative',
    width: '100%',
    backgroundColor: '#000',
  },
  coverPhoto: {
    width: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profilePhoto: {
    position: 'absolute',
    left: '5%',
    borderWidth: 4,
    borderColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  detailsContainer: {
    paddingHorizontal: 16,
    marginTop: 3,
    alignItems: 'flex-start',
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  profileIdentifire: {
    fontSize: 14,
    color: '#555',
    marginBottom: 15,
    opacity: 0.6,
  },
  userNames:{
elevation:4
},
  
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Ensures buttons fill the row
    alignItems: 'center',
    marginBottom: 16,
    
  },
  addFriendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 6,
    flex: 1, // Make it fill half of the row
    justifyContent: 'center', // Center icon and text horizontally
    borderRadius: 8,
    marginRight: 13, // Spacing between the two buttons
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  addFriendText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  messageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingVertical: 6,
    flex: 1, // Make it fill half of the row
    justifyContent: 'center', // Center icon and text horizontally
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
   opacity:0.96
  },
  messageText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});
