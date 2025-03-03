import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Activator from '../../Activator/Activator';
import {useGetAuthUserFriendsQuery} from '../../../services/friendsApi';
import FriendSkeleton from '../FriendSkeleton/FriendSkeleton';
import AllFriendItem from '../AllFriendItem/AllFriendItem';

export default function AuthFriendAllFriendContainer() {
  // State for pagination
  const [allFriends, setFriends] = useState<any[]>([]);
  const [friendPage, setFriendPage] = useState(1);
  const [hasMoreFriends, setHasMoreFriends] = useState(true);

  // Fetch photos
  const {
    data: friendData,
    isFetching,
    isSuccess,
    isLoading,
  } = useGetAuthUserFriendsQuery({friendPage});
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
            !allFriends.some(friend => friend.user_id === newFriend.user_id),
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
      setFriendPage(prev => prev + 1);
    }
  }, [hasMoreFriends, isFetching]);

  // Render each image item
  const renderItem = useCallback(({item}: {item: any}) => {
    return <AllFriendItem item={item} />;
  }, []);

  if (isLoading) {
    return <FriendSkeleton />;
  }

  /* header */

  const Header = (
    <Text
      style={{
        fontSize: 18,
        paddingVertical: 15,
        paddingHorizontal: 10,
      }}>{`All friends (${friendData?.total})`}</Text>
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <FriendSkeleton /> // Show the skeleton while loading
      ) : (
        <FlatList
          data={allFriends}
          renderItem={renderItem}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.user_id.toString()}
          ListFooterComponent={
            hasMoreFriends && isFetching ? <Activator /> : null
          }
          ListHeaderComponent={Header}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
