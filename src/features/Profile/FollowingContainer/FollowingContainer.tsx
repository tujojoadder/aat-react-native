import {View, Text, FlatList, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootParamList} from '../../../../RootNavigator';
import {useGetSpecificUserFollowingQuery} from '../../../services/profileApi';
import Animated from 'react-native-reanimated';
import { Appbar } from 'react-native-paper';
import Activator from '../../Activator/Activator';
import FollowingIteam from './FollowingIteam/FollowingIteam';

type FollowingContainerProps = NativeStackScreenProps<
  RootParamList,
  'followingContainer'
>;
export default function FollowingContainer({
  navigation,
  route,
}: FollowingContainerProps) {
  const {userId} = route.params; // Extract userId from route params
  // State for pagination
  const [allFollowing, setFollowing] = useState<any[]>([]);
  /* followingPage */

  const [followingPage, setFollowingPage] = useState(1);
  const [hasMoreFollowing, setHasMoreFollowing] = useState(true);

  // Fetch follows
  const {
    data: followingData,
    isFetching,
    isSuccess,
    isError
  } = useGetSpecificUserFollowingQuery({followingPage, userId});

if (isSuccess) {
    console.log(followingData);
}
  // Update photos when new data is fetched
  useEffect(() => {
    if (followingData?.data) {
      if (followingData.data.length === 0) {
        setHasMoreFollowing(false);
      } else {
        const newFollowing = followingData.data.filter(
          (newFollow: any) =>
            !allFollowing.some(follow => follow.user_id === newFollow.user_id),
        );

        if (newFollowing.length > 0) {
          setFollowing(prev => [...prev, ...newFollowing]);
        }
      }

       // If the fetched data is less than perPage, stop further requests
       if (followingData.data.length < 15) {
        setHasMoreFollowing(false);
      }
    }
  }, [followingData, isSuccess]);

  // Load more data when reaching the end of the list
  const loadMoreData = useCallback(() => {
    if (hasMoreFollowing && !isFetching) {
      setFollowingPage(prev => prev + 1);
    }
  }, [hasMoreFollowing, isFetching]);

  // Render each image item
  const renderItem = useCallback(({item}: {item: any}) => {
    return <FollowingIteam item={item} />;
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
            title="Foollowing"
            titleStyle={{
              fontSize: 20,
              color: '#333',
              opacity: 1,
              fontWeight: 'bold',
            }}
          />
        </Appbar.Header>
      </Animated.View>

      <FlatList
        data={allFollowing}
        renderItem={renderItem}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        keyExtractor={item => item.user_id.toString()}
        contentContainerStyle={{paddingTop: 55}}
        ListFooterComponent={
          hasMoreFollowing && isFetching ? <Activator /> : null
        }
      />
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
