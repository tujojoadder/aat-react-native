import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootParamList} from '../../../../RootNavigator';
import {useNavigation} from '@react-navigation/native';

type Friend = {
  friend_request_sent: boolean;
  identifier: string;
  is_friend: boolean;
  profile_picture: string;
  user_fname: string;
  user_id: string;
  user_lname: string;
};

type FriendItemsProps = NativeStackNavigationProp<RootParamList>;
const FriendItems=({item}: {item: Friend})=> {
  /* if (item) {
    console.log(item);
  } */
  const navigation = useNavigation<FriendItemsProps>();
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

      {/* Add Button */}
      <TouchableOpacity>
        <Text style={styles.addButton}>Add friend</Text>
      </TouchableOpacity>
    </View>
  );
}

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

  addButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    fontSize: 15,
    backgroundColor: 'black',
    color: 'white',
    borderRadius: 20,
  },
});

export default React.memo(FriendItems);