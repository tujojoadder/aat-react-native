import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootParamList} from '../../../../RootNavigator';
import {useGetSpecificUserFriendQuery} from '../../../services/profileApi';
import {ActivityIndicator, Appbar} from 'react-native-paper';
import Activator from '../../Activator/Activator';
import FriendItems from './FriendItems';
import Animated from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type FriendContainerProps = NativeStackScreenProps<
  RootParamList,
  'friendsContainer'
>;

export default function FriendContainer({
  route,
  navigation,
}: FriendContainerProps) {
  const {userId} = route.params; // ✅ Extract userId from route params
  // State for pagination
  const [allFriends, setFriends] = useState<any[]>([]);
  const [friendPage, setFriendPage] = useState(1);
  const [hasMoreFriends, setHasMoreFriends] = useState(true);

  // Fetch photos
  const {
    data: friendData,
    isFetching,
    isSuccess,
  } = useGetSpecificUserFriendQuery({friendPage, userId});
  if (isSuccess) {
    console.log(friendData);
  }
  // Update photos when new data is fetched
  useEffect(() => {
    if (friendData?.data.data) {
      if (friendData.data.data.length === 0) {
        setHasMoreFriends(false);
      } else {
        const newPosts = friendData.data.data.filter(
          (newPost: any) =>
            !allFriends.some(post => post.user_id === newPost.user_id),
        );

        if (newPosts.length > 0) {
          setFriends(prev => [...prev, ...newPosts]);
        }
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
    return <FriendItems item={item} />;
  }, []);

  return (
    <View style={styles.container}>
      {/* Fixed Appbar */}
      <Animated.View style={[styles.animatedAppBar]}>
        <Appbar.Header style={styles.appBar}>
          {/* back button */}
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          {/* title */}
          <Appbar.Content
            title="Friends"
            titleStyle={{fontSize: 20,
               color: '#333',
                opacity: 1,
                fontWeight:'bold'
              
              }}
          />
        </Appbar.Header>
      </Animated.View>

      <FlatList
        data={allFriends}
        renderItem={renderItem}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        keyExtractor={item => item.user_id.toString()}
        contentContainerStyle={{paddingTop: 55}}
        ListFooterComponent={
          hasMoreFriends || isFetching ? <Activator /> : null
        }
      />
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
