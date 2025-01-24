import React, {useState, useEffect, useCallback} from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  useLazyGetSpecificUserFriendQuery,
  useLazyGetSpecificUserPhotoQuery,
  useLazyGetSpecificUserPostQuery,
} from '../../services/profileApi';
import Activator from '../Activator/Activator';

type TabType = 'Posts' | 'Friends' | 'Photos';

const Profile = () => {
  const tabs: TabType[] = ['Posts', 'Friends', 'Photos'];
  const [activeTab, setActiveTab] = useState<TabType>('Posts');

  // State for pagination
  const [posts, setPosts] = useState<any[]>([]);
  const [friends, setFriends] = useState<any[]>([]);
  const [photos, setPhotos] = useState<any[]>([]);

  const [postPage, setPostPage] = useState(1);
  const [friendPage, setFriendPage] = useState(1);
  const [photoPages, setPhotoPage] = useState(1);
 
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [hasMoreFriends, setHasMoreFriends] = useState(true);
  const [hasMorePhotos, setHasMorePhotos] = useState(true);

  const userId = '526fa940-c06f-4344-ad54-f723234f2fae';

  // Lazy queries
  /* get post */
  const [fetchPosts, {data: postData, isFetching: isFetchingPosts, isSuccess}] =
    useLazyGetSpecificUserPostQuery();
  /* get photos */
  const [
    fetchPhotos,
    {
      data: photosData,
      isFetching: isFetchingPhotos,
      isSuccess: isSuccessPhotos,
    },
  ] = useLazyGetSpecificUserPhotoQuery();
  /* friends */
  const [fetchFriends, {data: friendsData, isFetching: isFetchingFriends,isSuccess:isSucessFriends}] =
    useLazyGetSpecificUserFriendQuery();

  // Fetch data on page change or tab activation
  useEffect(() => {
    if (activeTab === 'Posts') {
      fetchPosts({page:postPage, userId});
    } else if (activeTab === 'Friends') {
      fetchFriends({friendPage,userId});
    } else if (activeTab === 'Photos') {
      fetchPhotos({photoPage:photoPages, userId});
    }
  }, [postPage, friendPage, photoPages]);


  useEffect(() => {
      setPostPage(1);  // Reset post page on tab change
      setFriendPage(1);  // Reset friend page on tab change
   
      setPhotoPage(1);  // Reset photo page on tab change
    
  }, [activeTab]);
  

  // Handle data updates and append new results
  /* posts */
  useEffect(() => {
    if (postData?.data && activeTab === 'Posts') {
      if (postData.data.length === 0) {
        setHasMorePosts(false);
      } else {
        const newPosts = postData.data.filter(
          (newPost: any) =>
            !posts.some(post => post.post_id === newPost.post_id),
        );

        if (newPosts.length > 0) {
          setPosts(prev => [...prev, ...newPosts]);
        }
      }
    }
  }, [postData, isSuccess]);

  /* photos */

  useEffect(() => {
    if (photosData?.data && activeTab === 'Photos') {
      if (photosData.data.length === 0) {
        setHasMorePhotos(false);
      } else {
        const newPhotos = photosData.data.filter(
          (newPhoto: any) =>
            !photos.some(photo => photo.post_id === newPhoto.post_id),
        );
        if (newPhotos.length > 0) {
          setPhotos(prev => [...prev, ...newPhotos]);
        }
      }
    }
  }, [photosData, isSuccessPhotos]);

  /* friends */
  useEffect(() => {
    if (friendsData?.data?.data && activeTab === 'Friends') { // Access the nested data
      if (friendsData.data.data.length === 0) {
        setHasMoreFriends(false);
      } else {
        const newFriends = friendsData.data.data.filter( // Use friendsData.data.data
          (newFriend: any) =>
            !friends.some(friend => friend.user_id === newFriend.user_id),
        );
        if (newFriends.length > 0) {
          setFriends(prev => [...prev, ...newFriends]);
        }
      }
    }
  }, [friendsData, isSucessFriends, activeTab, friends]);
  console.log(friendsData);  

  // Handle tab changes
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  // Load more data when reaching the end of the list

  const loadMoreData = useCallback(() => {
    if (activeTab === 'Posts' && hasMorePosts && !isFetchingPosts) {
      setPostPage(prev => prev + 1);
    } else if (
      activeTab === 'Friends' &&
      hasMoreFriends &&
      !isFetchingFriends
    ) {
      setFriendPage(prev => prev + 1);
    } else if (activeTab === 'Photos' && hasMorePhotos && !isFetchingPhotos) {
      setPhotoPage(prev => prev + 1);
    }
  }, [
    activeTab,
    hasMorePosts,
    isFetchingPosts,
    hasMoreFriends,
    isFetchingFriends,
    hasMorePhotos,
    isFetchingPhotos,
  ]);

  // Data for the current tab
  const data = {
    Posts: posts,
    Friends: friends,
    Photos: photos,
  }[activeTab];

  const isLoading = {
    Posts: isFetchingPosts,
    Friends: isFetchingFriends,
    Photos: isFetchingPhotos,
  }[activeTab];

  const isHasData = {
    Posts: hasMorePosts,
    Friends: hasMoreFriends,
    Photos: hasMorePhotos,
  }[activeTab];

  // Render each item
  const renderItem = useCallback(({item}: {item: any}) => {
    if (activeTab === 'Posts') {
      return (
        <View style={{height: 300}}>
          <Text>hi</Text>
        </View>
      );
    } else if (activeTab === 'Friends') {
      return (
        <View style={{height: 300}}>
          <Text>hi</Text>
        </View>
      );
    } else if (activeTab === 'Photos') {
      return (
        <View style={{height: 300}}>
          <Text>hi</Text>
        </View>
      );
    }
    return null;
  }, []);

  return (
    <View style={{flex: 1}}>
      {/* Tabs */}
      <View style={styles.tabs}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => handleTabChange(tab)}>
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* List */}
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isHasData || isLoading ? <Activator /> : null}
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tab: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#007bff',
  },
  tabText: {
    fontSize: 16,
    color: '#333',
  },
  activeTabText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  item: {
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  loader: {
    paddingVertical: 16,
    alignItems: 'center',
  },
});
