import {
  View,
  StyleSheet,
  Text,
  ListRenderItem,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Segmented} from 'react-native-collapsible-segmented-view';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {RootParamList} from '../../../RootNavigator';
import {ActivityIndicator, Appbar} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProfilePosts from './ProfilePosts';
import ProfileImages from './ProfileImages';
import ProfileAbout from './ProfileAbout';
import {useGetUserDetailsQuery} from '../../services/friendsApi';
import FormateLargeNumber from '../utils/FormateLargeNumber/FormateLargeNumber';
import ProfileSkeleton from './ProfileSkeleton';
interface UserDetails {
  cover_photo: string;
  followers_count: number;
  followings_count: number;
  friends_count: number;
  identifier: string;
  profile_picture: string;
  user_fname: string;
  user_lname: string;
}
interface ApiResponse {
  data: UserDetails;
}
type ProfileScreenProps = NativeStackScreenProps<RootParamList, 'profile'>;

const Header = ({userData}: {userData?: ApiResponse}) => {
  const coverPic = `${process.env.REACT_APP_LARAVEL_URL}/${userData?.data.cover_photo}`;
  const profilePic = `${process.env.REACT_APP_LARAVEL_URL}/${userData?.data.profile_picture}`;
  const {width} = Dimensions.get('window');

  const coverPhotoHeight = width * 0.55;
  const profilePhotoSize = width * 0.35;

  return (
    <View pointerEvents="box-none">
      {/* Cover Photo Section */}
      <View
        style={[
          styles.coverPhotoContainer,
          {marginBottom: profilePhotoSize / 2},
        ]}
        pointerEvents="box-none">
        <Image
          source={{
            uri: coverPic,
          }}
          style={[styles.coverPhoto, {height: coverPhotoHeight}]}
          resizeMode="cover"
        />

        {/* Profile Photo */}
        <Image
          source={{
            uri: profilePic,
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
      <View style={styles.detailsContainer} pointerEvents="box-none">
        <View style={styles.nameSection} pointerEvents="box-none">
          {/* 60% width*/}
          <View style={styles.userName}>
            <Text style={styles.profileName}>
              {userData?.data.user_fname} {userData?.data.user_lname}
            </Text>
            {userData && (
              <Text style={styles.profileIdentifire}>
                @{userData?.data.identifier}
              </Text>
            )}
          </View>
          {/* 40% width (90px button width) */}
          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.followButtonText}>Follow</Text>
          </TouchableOpacity>
        </View>

        {/* Follower and Following Section */}
        <View style={styles.numberSection} pointerEvents="box-none">
          <TouchableOpacity style={styles.numberItem}>
            <Text style={styles.statNumber}>
              <FormateLargeNumber number={userData?.data.friends_count ?? 0} />
            </Text>
            <Text style={styles.statLabel}>Friends</Text>
          </TouchableOpacity>

          {/* Vertical Divider */}
          <View style={styles.verticalLine} />

          <TouchableOpacity style={styles.numberItem}>
            <Text style={styles.statNumber}>
              <FormateLargeNumber
                number={userData?.data.followings_count ?? 0}
              />
            </Text>
            <Text style={styles.statLabel}>Following</Text>
          </TouchableOpacity>

          {/* Vertical Divider */}
          <View style={styles.verticalLine} />

          <TouchableOpacity style={styles.numberItem}>
            <Text style={styles.statNumber}>
              <FormateLargeNumber
                number={userData?.data.followers_count ?? 0}
              />
            </Text>
            <Text style={styles.statLabel}>Followers</Text>
          </TouchableOpacity>
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
              size={23}
              color="#fff"
              style={{marginRight: 8}}
            />
            <Text style={styles.messageText}>Message</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const Profile = ({navigation, route}: ProfileScreenProps) => {
  /* get the user id from route */
  const userId = route.params.authorId;

  // Fetch user profile data with user id
  const {
    data: profileData,
    isFetching,
    isError,
    isSuccess,
  } = useGetUserDetailsQuery(userId);

  if (isFetching) {
    return <ProfileSkeleton />
  }
  return (
    <View style={styles.container}>
      {/* Fixed Appbar */}
      <Appbar.Header style={styles.appBar}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content
          title={`${profileData?.data.user_fname} ${profileData?.data.user_lname}`}
          titleStyle={{fontSize: 18, color: '#333', opacity: 0.8}}
        />
      </Appbar.Header>

      {/* Segmented View with Collapsible Header */}
      <View style={styles.segmentedContainer}>
        <Segmented.View header={() => <Header userData={profileData} />}>
          {/* Pass userId to ProfilePosts */}
          <Segmented.Segment
            label="Posts"
            component={() => <ProfilePosts userId={userId} />}
          />

          {/* Pass userId to ProfileImages */}
          <Segmented.Segment
            label="Photos"
            component={() => <ProfileImages userId={userId} />}
          />

          {/* Pass userId to ProfileAbout */}
          <Segmented.Segment
            label="About"
            component={() => <ProfileAbout userId={userId} />}
          />
        </Segmented.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10, // Ensure it stays on top
    backgroundColor: '#fff',
    elevation: 2,
    height: 50, //app bar size 50px (we need marginTop 50 )
  },
  segmentedContainer: {
    flex: 1,
    marginTop: 50, // Adjust this to match the AppBar height
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 250,
    width: '100%',
  },
  text: {
    fontSize: 32,
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
    marginTop: 3,
  },

  nameSection: {
    flexDirection: 'row', // Aligns username & button in a row
    justifyContent: 'space-between',
    alignItems: 'center', // Vertically aligns elements
    marginBottom: 10, // Adjust spacing
    elevation: 4,
    paddingHorizontal: 16,
  },
  userName: {
    maxWidth: '60%',
  },

  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  profileIdentifire: {
    fontSize: 14,
    color: '#555',
    opacity: 0.6,
  },
  followButton: {
    backgroundColor: 'black', // Blue button color
    paddingVertical: 5,
    paddingHorizontal: 20,

    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    width: 90,
  },
  followButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },

  numberSection: {
    flexDirection: 'row',
    marginTop: 7,
    marginBottom: 20,
    width: '100%',
    justifyContent: 'center',
  },
  verticalLine: {
    width: 1, // Thin line
    height: 30, // Adjust height as needed
    backgroundColor: '#ccc', // Light gray line
    marginHorizontal: 10, // Space between items
    alignSelf: 'center',
  },

  numberItem: {
    padding: 0,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#555',
    opacity: 0.8,
  },
  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'center',
    gap: 15,
  },
  addFriendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    justifyContent: 'center',
    borderRadius: 18,
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
    paddingHorizontal: 12,
    justifyContent: 'center',
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    opacity: 0.96,
  },
  messageText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default Profile;
