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

type TabType = 'Posts' | 'Activities' | 'Photos';

const Profile = () => {
  const tabs: TabType[] = ['Posts', 'Activities', 'Photos'];
  const [activeTab, setActiveTab] = useState<TabType>('Posts');

  // State for pagination
  const [posts, setPosts] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [photos, setPhotos] = useState<any[]>([]);

  const [postPage, setPostPage] = useState(1);
  const [activityPage, setActivityPage] = useState(1);
  const [photoPage, setPhotoPage] = useState(1);

  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [hasMoreActivities, setHasMoreActivities] = useState(true);
  const [hasMorePhotos, setHasMorePhotos] = useState(true);

  const userId = '526fa940-c06f-4344-ad54-f723234f2fae';

  // Lazy queries
  const [
    fetchPosts,
    {data: postData, isFetching: isFetchingPosts, isSuccess},
  ] = useLazyGetSpecificUserPostQuery();
  const [
    fetchActivities,
    {data: activitiesData, isFetching: isFetchingActivities},
  ] = useLazyGetSpecificUserFriendQuery();
  const [fetchPhotos, {data: photosData, isFetching: isFetchingPhotos}] =
    useLazyGetSpecificUserPhotoQuery();



  // Fetch data on page change or tab activation
  const fetchData = useCallback(
    (tab: TabType) => {
      if (tab === 'Posts') {
        fetchPosts({page: postPage, userId});
      } else if (tab === 'Activities') {
        fetchActivities(activityPage);
      } else if (tab === 'Photos') {
        fetchPhotos(photoPage);
      }
    },
    [postPage, activityPage, photoPage],
  );

  // Handle data updates and append new results
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
  }, [postData,isSuccess]);

  useEffect(() => {
    if (activitiesData?.data && activeTab === 'Activities') {
      if (activitiesData.data.length === 0) {
        setHasMoreActivities(false);
      } else {
        const newActivities = activitiesData.data.filter(
          (newActivity: any) =>
            !activities.some(
              activity => activity.activity_id === newActivity.activity_id,
            ),
        );
        setActivities(prev => [...prev, ...newActivities]);
      }
    }
  }, [activitiesData]);

  useEffect(() => {
    if (photosData?.data && activeTab === 'Photos') {
      if (photosData.data.length === 0) {
        setHasMorePhotos(false);
      } else {
        const newPhotos = photosData.data.filter(
          (newPhoto: any) =>
            !photos.some(photo => photo.photo_id === newPhoto.photo_id),
        );
        setPhotos(prev => [...prev, ...newPhotos]);
      }
    }
  }, [photosData]);

  // Handle tab changes
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    
  };

  // Load more data when reaching the end of the list

  const loadMoreData = useCallback(() => {
    if (activeTab === 'Posts' && hasMorePosts && !isFetchingPosts) {
      setPostPage((prev) => prev + 1);
    } else if (
      activeTab === 'Activities' &&
      hasMoreActivities &&
      !isFetchingActivities
    ) {
      setActivityPage((prev) => prev + 1);
    } else if (activeTab === 'Photos' && hasMorePhotos && !isFetchingPhotos) {
      setPhotoPage((prev) => prev + 1);
    }
  }, [
    activeTab,
    hasMorePosts,
    isFetchingPosts,
    hasMoreActivities,
    isFetchingActivities,
    hasMorePhotos,
    isFetchingPhotos,
  ]);
  

  // Data for the current tab
  const data = {
    Posts: posts,
    Activities: activities,
    Photos: photos,
  }[activeTab];

  const isLoading = {
    Posts: isFetchingPosts,
    Activities: isFetchingActivities,
    Photos: isFetchingPhotos,
  }[activeTab];

  const isHasData = {
    Posts: hasMorePosts,
    Activities: hasMoreActivities,
    Photos: hasMorePhotos,
  }[activeTab];

  useEffect(() => {
    if (activeTab === 'Posts') {
      fetchPosts({ page: postPage, userId });
    } else if (activeTab === 'Activities') {
      fetchActivities(activityPage);
    } else if (activeTab === 'Photos') {
      fetchPhotos(photoPage);
    }
  }, [postPage, activityPage, photoPage]);
  

  // Render each item
  const renderItem = useCallback(({item}: {item: any}) => {
    if (activeTab === 'Posts') {
      return  <View style={{height:300}}><Text>hi</Text></View>;
    } else if (activeTab === 'Activities') {
      return <View style={{height:300}}><Text>hi</Text></View>;
    } else if (activeTab === 'Photos') {
      return  <View style={{height:300}}><Text>hi</Text></View>;
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
        ListFooterComponent={isHasData || isLoading ?<Activator />:null}
        
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
