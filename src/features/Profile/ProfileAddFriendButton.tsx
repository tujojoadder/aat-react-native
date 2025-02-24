import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Button, ActivityIndicator} from 'react-native-paper';
import {RootState} from '../../app/store';
import {
  useCancelFriendRequestMutation,
  useSendFriendRequestMutation,
  useManageFriendRequestMutation,
  useUnfriendUserMutation,
} from '../../services/friendsApi';
import {
  setRequestSent,
  setRequestRejected,
  setRequestAccepted,
  setRequestCancel,
} from '../Home/HomeSlice';

export default function ProfileAddFriendButton({
  type,
  id,
}: {
  type: string | undefined;
  id: string;
}) {
  const dispatch = useDispatch();

  const [unfriendUser, {isLoading: unFriending}] = useUnfriendUserMutation();
  const sentRequests = useSelector(
    (state: RootState) => state.home.sentRequests[id],
  );
  const cancelRequests = useSelector(
    (state: RootState) => state.home.cancelRequests[id],
  );
  const acceptedRequests = useSelector(
    (state: RootState) => state.home.acceptedRequests[id],
  );
  const rejectedRequests = useSelector(
    (state: RootState) => state.home.rejectedRequests[id],
  );

  const [cancelFriendRequest, {isLoading: cancelingRequest}] =
    useCancelFriendRequestMutation();
  const [sendFriendRequest, {isLoading: sendingRequest}] =
    useSendFriendRequestMutation();
  const [manageFriendRequest] = useManageFriendRequestMutation();

  const [acceptLoading, setAcceptLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);

  const handleAddButton = async () => {
    try {
      const res = await sendFriendRequest({receiver_id: id});
      if (res.data) {
        dispatch(setRequestSent({userId: id}));
      } else if (res.error) {
        //
      }
    } catch (error) {
      //
    }
  };

  const handleCancelButton = async () => {
    try {
      const res = await cancelFriendRequest({receiver_id: id});
      if (res.data) {
        dispatch(setRequestCancel({userId: id}));
      } else if (res.error) {
        //
      }
    } catch (error) {
      //
    }
  };

  const handleAcceptRequest = async () => {
    setAcceptLoading(true);
    try {
      const res = await manageFriendRequest({
        sender_id: id,
        decision: 'accepted',
      }).unwrap();
      dispatch(setRequestAccepted({userId: id}));
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
        sender_id: id,
        decision: 'rejected',
      }).unwrap();
      dispatch(setRequestRejected({userId: id}));
    } catch (error) {
      //
    } finally {
      setRejectLoading(false);
    }
  };

  const handleUnfriend = async () => {
    try {
      await unfriendUser({useridtoremove: id}).unwrap();
      dispatch(setRequestCancel({userId: id}));
    } catch (err) {
      console.error('Failed to unfriend:', err);
    }
  };

  if (sentRequests || cancelRequests || acceptedRequests || rejectedRequests) {
    if (sentRequests) {
      return (
        <Button
          mode="contained"
          onPress={handleCancelButton}
          disabled={cancelingRequest}
          style={{backgroundColor:'#e8dddc'}}
          loading={cancelingRequest}
          icon={() => <MaterialIcons name="cancel" size={20} color="black" />}
          textColor='black'
          >
          Cancel Request
        </Button>
      );
    } else if (cancelRequests) {
      return (
        <Button
          mode="contained"
          onPress={handleAddButton}
          disabled={sendingRequest}
          loading={sendingRequest}
          style={{backgroundColor:'#1682e8'}}
          icon={() => <MaterialIcons name="person-add" size={20} color="white" />}
           
              // Ensure spinner color is white
          >
          Add
        </Button>
      );
    } else if (acceptedRequests) {
      return (
        <Button
          mode="contained"
          onPress={handleUnfriend}
          disabled={unFriending}
          loading={unFriending}
          icon={() => <MaterialIcons name="person-remove" size={20} color="white" />}>
          Unfriend
        </Button>
      );
    } else if (rejectedRequests) {
      return (
        <Button
          mode="contained"
          onPress={handleAddButton}
          disabled={sendingRequest}
          style={{backgroundColor:'#1682e8'}}
          loading={sendingRequest}
          icon={() => <MaterialIcons name="person-add" size={20} color="white" />}
           
              // Ensure spinner color is white
          >
          Add
        </Button>
      );
    }
  } else {
    if (type === 'received') {
      return (
        <>
          <Button
            mode="contained"
            onPress={handleRejectRequest}
            disabled={rejectLoading}
            loading={rejectLoading}
            style={{ backgroundColor: '#ebedf0' }} 
            textColor='black'
            >
            Reject
          </Button>
          <Button
            mode="contained"
            onPress={handleAcceptRequest}
            disabled={acceptLoading}
            loading={acceptLoading}
            style={{backgroundColor:"#1682e8"}}
            >
            Confirm
          </Button>
        </>
      );
    } else if (type === 'sended') {
      return (
        <Button
          mode="contained"
          onPress={handleCancelButton}
          disabled={cancelingRequest}
          loading={cancelingRequest}
          style={{backgroundColor:'#e8dddc'}}
          icon={() => <MaterialIcons name="cancel" size={20} color="black" />}
          textColor='black'
          >
          Cancel Request
        </Button>
      );
    } else if (type === 'not_friend') {
      return (
        <Button
          mode="contained"
          onPress={handleAddButton}
          disabled={sendingRequest}
          style={{backgroundColor:'#1682e8'}}
          loading={sendingRequest}
          icon={() => <MaterialIcons name="person-add" size={20} color="white" />}
           
              // Ensure spinner color is white
          >
          Add
        </Button>
      );
    } else if (type === 'friend') {
      return (
        <Button
          mode="contained"
          onPress={handleUnfriend}
          disabled={unFriending}
          loading={unFriending}
          icon={() => <MaterialIcons name="person-remove" size={20} color="white" />}>
          Unfriend
        </Button>
      );
    }
  }
}