

import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {Button, TouchableRipple} from 'react-native-paper'; // Import TouchableRipple
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootParamList} from '../../../../RootNavigator';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

type User = {
  identifier: string;
  profile_picture: string;
  user_fname: string;
  user_id: string;
  user_lname: string;
};

type AllFriendItemProp = NativeStackNavigationProp<RootParamList>;

export default function AllFriendItem({item}: {item: User}) {
    
  const profilePic = `${process.env.REACT_APP_LARAVEL_URL}/${item.profile_picture}`;
  const navigation = useNavigation<AllFriendItemProp>();


  return (
    <TouchableRipple
      onPress={() => navigation.navigate('profile', {authorId: item.user_id})}
      rippleColor="rgba(0, 0, 0, 0.1)" // Customize ripple color
      style={styles.card}>
      <>
        {/* Image Section */}
        <Image
          source={{
            uri: profilePic,
          }}
          style={styles.profilePic}
        />
        {/* Content Section */}
        <View style={styles.content}>
          <Text style={styles.userName} numberOfLines={1}>
            {item.user_fname} {item.user_lname}
          </Text>
          <Text style={styles.userIdentifire} numberOfLines={1}>
            @{item.identifier}
          </Text>
        </View>

        
      </>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    gap: 10,
    width: '100%',
  },
  profilePic: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  content: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
  },
  userIdentifire: {
    color: '#888',
  },
});
