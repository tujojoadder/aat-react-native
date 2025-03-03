import {View, StyleSheet, Image} from 'react-native';
import React from 'react';
import {Button, Text, TouchableRipple} from 'react-native-paper'; // Import TouchableRipple
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootParamList} from '../../../../RootNavigator';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../app/store';
import {
  useCancelFriendRequestMutation,
  useSendFriendRequestMutation,
} from '../../../services/friendsApi';
import {setRequestCancel, setRequestSent} from '../../Home/HomeSlice';

type User = {
  identifier: string;
  profile_picture: string;
  user_fname: string;
  user_id: string;
  user_lname: string;
};

type SentRequestItemProp = NativeStackNavigationProp<RootParamList>;

export default function SentRequestItem({item}: {item: User}) {
  const dispatch = useDispatch();
  const profilePic = `${process.env.REACT_APP_LARAVEL_URL}/${item.profile_picture}`;
  const navigation = useNavigation<SentRequestItemProp>();

  const sentRequests = useSelector(
    (state: RootState) => state.home.sentRequests[item.user_id],
  );
  const cancelRequests = useSelector(
    (state: RootState) => state.home.cancelRequests[item.user_id],
  );
  const acceptedRequests = useSelector(
    (state: RootState) => state.home.acceptedRequests[item.user_id],
  );
  const rejectedRequests = useSelector(
    (state: RootState) => state.home.rejectedRequests[item.user_id],
  );

  const [sendFriendRequest, {isLoading: sendingRequest}] =
    useSendFriendRequestMutation();
  const [cancelFriendRequest, {isLoading: cancelingRequest}] =
    useCancelFriendRequestMutation();

  const handleAddButton = async () => {
    try {
      console.log(item.user_id);
      const res = await sendFriendRequest({receiver_id: item.user_id}).unwrap();

      dispatch(setRequestSent({userId: item.user_id}));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelButton = async () => {
    try {
      const res = await cancelFriendRequest({
        receiver_id: item.user_id,
      }).unwrap();

      dispatch(setRequestCancel({userId: item.user_id}));
    } catch (error) {
      console.log(error);
    }
  };
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

        {/* Add Button (outside TouchableRipple's touch area) */}

        {!rejectedRequests &&
        !cancelRequests &&
        !sentRequests &&
        !acceptedRequests ? (
          <>
            <View pointerEvents="box-none">
              <Button
                disabled={cancelingRequest}
                loading={cancelingRequest}
                onPress={handleCancelButton} // Add your button logic here
                style={[{backgroundColor: '#e8dddc'}]}
                labelStyle={{color: 'black', fontWeight: '600'}}>
                Cancel request
              </Button>
            </View>
          </>
        ) : sentRequests ? (
          <>
            <View pointerEvents="box-none">
              <Button
                disabled={cancelingRequest}
                loading={cancelingRequest}
                onPress={handleCancelButton} // Add your button logic here
                style={[{backgroundColor: '#e8dddc'}]}
                labelStyle={{color: 'black', fontWeight: '600'}}>
                Cancel request
              </Button>
            </View>
          </>
        ) : cancelRequests ? (
          <>
            <Text variant="bodyMedium" style={{color: 'red'}}>
              Request Canceled!
            </Text>
          </>
        ) : null}
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
