import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootParamList} from '../../../../RootNavigator';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../app/store';
import {
  useCancelFriendRequestMutation,
  useSendFriendRequestMutation,
} from '../../../services/friendsApi';
import {setRequestRejected, setRequestSent} from '../../Home/HomeSlice';
import {ActivityIndicator} from 'react-native-paper';

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
const FriendItems = ({item}: {item: Friend}) => {
  const dispatch = useDispatch();

  const [sendFriendRequest, {isLoading: sendingRequest}] =
    useSendFriendRequestMutation();
  const [cancelFriendRequest, {isLoading: cancelingRequest}] =
    useCancelFriendRequestMutation();

  // Redux selectors for request status
  const requestSent = useSelector(
    (state: RootState) => state.home.sentRequests[item.user_id],
  );
  // Local state to manage the friend request status
  const [isFriendRequestSent, setIsFriendRequestSent] = useState(
    item.friend_request_sent,
  );

  /* if (item) {
    console.log(item);
  } */
  const navigation = useNavigation<FriendItemsProps>();
  const profilePic = `${process.env.REACT_APP_LARAVEL_URL}/${item.profile_picture}`;

  const handleAddButton = async () => {
    try {
      console.log(item.user_id);
      const res = await sendFriendRequest({receiver_id: item.user_id});
      if (res.data) {
        dispatch(setRequestSent({userId: item.user_id}));
        setIsFriendRequestSent(true); // Update local state
      } else if (res.error) {
        console.log(res.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelButton = async () => {
    try {
      const res = await cancelFriendRequest({receiver_id: item.user_id});
      if (res.data) {
        dispatch(setRequestRejected({userId: item.user_id}));
        setIsFriendRequestSent(false); // Update local state
      } else if (res.error) {
        console.log(res.error, dispatch);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderButton = () => {
    if (item.is_friend) {
      return null;
    }
    if (isFriendRequestSent || requestSent) {
      // If a friend request is sent, show "Cancel Request" button
      return (
        <View >
          <TouchableOpacity
            onPress={handleCancelButton}
            style={[
              styles.button,
              {backgroundColor: cancelingRequest ? '#c4c4c4' : '#999999'},
            ]}
            disabled={cancelingRequest}>
            {cancelingRequest ? (
              <ActivityIndicator size="small" color="#888" />
            ) : (
              <Text style={[styles.buttonText, {color: 'black'}]}>
                Cancel Request
              </Text>
            )}
          </TouchableOpacity>
        </View>
      );
    } else {
      // If no friend request is sent, show "Add Friend" button
      return (
        <View >
          <TouchableOpacity
            onPress={handleAddButton}
            style={[
              styles.button,
              {backgroundColor: sendingRequest ? '#c4c4c4' : 'black'},
            ]}
            disabled={sendingRequest}>
            {sendingRequest ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <View style={styles.row}>
                {/*  <FontAwesome name="user-plus" size={16} color="white" /> */}
                <Text style={styles.buttonText}> Add friend</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      );
    }
  };

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
      <TouchableOpacity>{renderButton()}</TouchableOpacity>
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


  button: {
    minWidth:118,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
   

  },
  buttonText: {
    fontSize: 14.5,
    color: '#fff',
  
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default React.memo(FriendItems);
