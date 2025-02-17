import {View, Text, FlatList, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootParamList} from '../../../../RootNavigator';
import {useGetSpecificUserFollowerQuery} from '../../../services/profileApi';
import Animated from 'react-native-reanimated';
import { Appbar } from 'react-native-paper';
import Activator from '../../Activator/Activator';
import FollowerItem from './FollowerItem/FollowerItem';

type FollowersContainerProps = NativeStackScreenProps<
  RootParamList,
  'followersContainer'
>;
export default function FollowersContainer({
  navigation,
  route,
}: FollowersContainerProps) {
  const {userId} = route.params; // Extract userId from route params
  // State for pagination
  const [allFollower, setAllFollower] = useState<any[]>([]);
  /* followerPage */
  const [followerPage, setFollowerPage] = useState(1);
  const [hasMoreFollower, setHasMoreFollower] = useState(true);

  // Fetch follows
  const {
    data: followerData,
    isFetching,
    isSuccess,
    isError
  } = useGetSpecificUserFollowerQuery({followerPage, userId});

if (isSuccess) {
    console.log(followerData)
   
}


  // Update photos when new data is fetched
  useEffect(() => {
    if (followerData?.data) {
      if (followerData.data.length === 0) {
        setHasMoreFollower(false);
      } else {
        const newFollower = followerData.data.filter(
          (newFollow: any) =>
            !allFollower.some(follow => follow.user_id === newFollow.user_id),
        );

        if (newFollower.length > 0) {
          setAllFollower(prev => [...prev, ...newFollower]);
        }
      }

       // If the fetched data is less than perPage, stop further requests
       if (followerData.data.length < 15) {
        setHasMoreFollower(false);
      }
    }
  }, [followerData, isSuccess]);

  // Load more data when reaching the end of the list
  const loadMoreData = useCallback(() => {
    if (hasMoreFollower && !isFetching) {
      setFollowerPage(prev => prev + 1);
    }
  }, [hasMoreFollower, isFetching]);

 
  const renderItem = useCallback(({item}: {item: any}) => {
    return <FollowerItem item={item} />;
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
            title="Followers"
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
        data={allFollower}
        renderItem={renderItem}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        keyExtractor={item => item.user_id.toString()}
        contentContainerStyle={{paddingTop: 55}}
        ListFooterComponent={
          hasMoreFollower && isFetching ? <Activator /> : null
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
