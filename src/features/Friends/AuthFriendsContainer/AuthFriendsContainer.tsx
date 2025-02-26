
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootParamList} from '../../../../RootNavigator';
import {useGetSpecificUserFriendQuery} from '../../../services/profileApi';
import {ActivityIndicator, Appbar} from 'react-native-paper';
import Activator from '../../Activator/Activator';
import FriendItems from '../../Profile/FriendsContainer/FriendItems';
import Animated from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useGetAuthUserfriendRequestQuery } from '../../../services/friendsApi';
import FriendRequestItem from '../FriendRequestItem/FriendRequestItem';

export default function AuthFriendsContainer() {
  // State for pagination
  const [allFriends, setFriends] = useState<any[]>([]);
  const [friendRequestPage, setFriendRequestPage] = useState(1);
  const [hasMoreFriends, setHasMoreFriends] = useState(true);

  // Fetch photos
  const {
    data: friendData,
    isFetching,
    isSuccess,
  } = useGetAuthUserfriendRequestQuery({friendRequestPage});
  if (isSuccess) {
    console.log(friendData);
  }
  // Update photos when new data is fetched
  useEffect(() => {
    if (friendData?.data) {
      if (friendData.data.length === 0) {
        setHasMoreFriends(false);
      } else {
        const newFriends = friendData.data.filter(
          (newFriend: any) =>
            !allFriends.some(friend => friend.friend_request_id === newFriend.friend_request_id),
        );

        if (newFriends.length > 0) {
          setFriends(prev => [...prev, ...newFriends]);
        }
      }

        // If the fetched data is less than perPage, stop further requests
        if (friendData.data.length < 15) {
          setHasMoreFriends(false);
        }
    }
  }, [friendData, isSuccess]);

  // Load more data when reaching the end of the list
  const loadMoreData = useCallback(() => {
    if (hasMoreFriends && !isFetching) {
      setFriendRequestPage(prev => prev + 1);
    }
  }, [hasMoreFriends, isFetching]);

  // Render each image item
  const renderItem = useCallback(({item}: {item: any}) => {
    return <Text>hi</Text> ;
  }, []);

  return (
    <View style={styles.container}>
   
      {/* <FlatList
        data={allFriends}
        renderItem={renderItem}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        keyExtractor={item => item.friend_request_id.toString()}
    
        ListFooterComponent={
          hasMoreFriends && isFetching ? <Activator /> : null
        }
      /> */}
<FriendRequestItem />
<FriendRequestItem />
<FriendRequestItem />
<FriendRequestItem />
<FriendRequestItem />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff'
  },
  animatedAppBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff', // Ensure background color for shadow effect
    zIndex: 1,
  },
  appBar: {
    backgroundColor: '#fff',
    elevation: 3,
    height: 55,
  },

  title: {
    flex: 1,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007BFF',
  },
});
