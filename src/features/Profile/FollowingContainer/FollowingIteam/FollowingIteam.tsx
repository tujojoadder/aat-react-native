import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {RootParamList} from '../../../../../RootNavigator';

/* getSpecificUserFollowing */
type FollowingData = {
  user_id: string;
  user_fname: string;
  user_lname: string;

  identifier: string;
  profile_picture: string;

  pivot: {
    follower_id: string;
    following_id: string;
  };
};
type FollowingItemsNavigationProp = NativeStackNavigationProp<RootParamList>;

const FollowingItem = ({item}: {item: FollowingData}) => {
  const navigation = useNavigation<FollowingItemsNavigationProp>();

  // Construct the profile picture URL
  const profilePic = `${process.env.REACT_APP_LARAVEL_URL}/${item.profile_picture}`;

  return (
    <View style={styles.friendItemsContainer}>
      {/* Profile Picture */}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('profile', {authorId: item.user_id})
        }>
        <Image source={{uri: profilePic}} style={styles.profilePic} />
      </TouchableOpacity>

      {/* Name + Identifier */}
      <View style={styles.textContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('profile', {authorId: item.user_id})
          }>
          <Text numberOfLines={1} style={styles.names}>
            {item.user_fname} {item.user_lname}
          </Text>
        </TouchableOpacity>
        <Text numberOfLines={1} style={styles.identifier}>
          @{item.identifier}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  friendItemsContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    height: 52,
    width: 52,
    borderRadius: 26,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10, // Space between image and text
  },
  names: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  identifier: {
    fontSize: 14,
    color: '#666',
  },
});

export default React.memo(FollowingItem);
