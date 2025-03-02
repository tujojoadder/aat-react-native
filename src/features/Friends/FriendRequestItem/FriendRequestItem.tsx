import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {memo, useState} from 'react';
import {Button, Text} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootParamList} from '../../../../RootNavigator';
import {useNavigation} from '@react-navigation/native';
import {RootState} from '../../../app/store';
import {useDispatch, useSelector} from 'react-redux';
import {useManageFriendRequestMutation} from '../../../services/friendsApi';
import {setRequestAccepted, setRequestRejected} from '../../Home/HomeSlice';

type FriendRequestNavigationProp = NativeStackNavigationProp<RootParamList>;
interface FriendRequest {
  friend_request_id: string;
  identifier: string;
  profile_picture: string;
  user_fname: string;
  user_id: string;
  user_lname: string;
}

const FriendRequestItem = ({item}: {item: FriendRequest}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<FriendRequestNavigationProp>();
  const profilePic = `${process.env.REACT_APP_LARAVEL_URL}/${item.profile_picture}`;

  /* states to track */
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);

  const [manageFriendRequest] = useManageFriendRequestMutation();

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

  const handleAcceptRequest = async () => {
    setAcceptLoading(true);
    try {
      const res = await manageFriendRequest({
        sender_id: item.user_id,
        decision: 'accepted',
      }).unwrap();
      dispatch(setRequestAccepted({userId: item.user_id}));
    } catch (error) {
      //
    } finally {
      setAcceptLoading(false);
    }
  };

  const handleRejectRequest = async () => {
    setRejectLoading(true);
    try {
      const res = await manageFriendRequest({
        sender_id: item.user_id,
        decision: 'rejected',
      }).unwrap();
      dispatch(setRequestRejected({userId: item.user_id}));
    } catch (error) {
      //
    } finally {
      setRejectLoading(false);
    }
  };

 
  return (
    <View style={styles.card}>
      {/* Profile Picture and Names */}
      <View style={styles.topSection}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('profile', {authorId: item.user_id})
          }>
          <Image
            source={{
              uri: profilePic,
            }}
            style={styles.profilePic}
          />
        </TouchableOpacity>
        <View style={styles.userNames}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('profile', {authorId: item.user_id})
            }>
            <Text style={styles.userNameText} numberOfLines={1}>
              {item.user_fname} {item.user_lname}
            </Text>
          </TouchableOpacity>
          <Text style={styles.userIdentifireText} numberOfLines={1}>
            @{item.identifier}
          </Text>
        </View>
      </View>

      {/* Buttons with Icons */}
      <View style={styles.buttonCollection}>
        {/* Delete Button */}
        {!sentRequests &&
        !cancelRequests &&
        !acceptedRequests &&
        !rejectedRequests ? (
          <>
            <Button
              mode="outlined"
              onPress={handleRejectRequest}
              disabled={rejectLoading}
              loading={rejectLoading}
              labelStyle={{color: 'black', fontWeight: '600'}}
              icon={() => (
                <MaterialIcons name="cancel" size={20} color="black" />
              )}>
              Delete
            </Button>

            {/* Confirm Button */}
            <Button
              mode="outlined"
              onPress={handleAcceptRequest}
              disabled={acceptLoading}
              loading={acceptLoading}
              style={[{backgroundColor: '#1682e8'}]}
              labelStyle={{color: 'white', fontWeight: '600'}}
              icon={() => (
                <MaterialIcons name="check" size={20} color="white" />
              )}>
              Confirm
            </Button>
          </>
        ) : acceptedRequests ? (
          <>
            <Text variant="bodyMedium" style={{color:'#1682e8'}}>Request accepted</Text>
          </>
        ) : rejectedRequests ? (
          <>
            <Text variant="bodyMedium" style={{color:'red'}}>Request canceled</Text>
          </>
        ) : null}
      </View>
    </View>
  );
};

export default memo(FriendRequestItem);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    height: 70,
    width: 70,
    borderRadius: 35,
    marginRight: 10,
  },
  userNames: {
    flex: 1,
  },
  userNameText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userIdentifireText: {
    fontSize: 14,
    color: '#666',
  },
  buttonCollection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',

    gap: 25,
    paddingTop: 5,
  },
});
