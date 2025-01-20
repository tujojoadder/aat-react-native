import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {ActivityIndicator, Appbar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useGetPostsQuery} from '../../services/postApi';
import TextPost from '../TextPost/TextPost';
import ImagePost from '../ImagePost/ImagePost';
import BPost from '../BPost/BPost';

export default function Home() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  const {data, isSuccess, isFetching} = useGetPostsQuery(page);

  const appBarOffset = useSharedValue(0);
  const appBarOpacity = useSharedValue(1);
  const prevScrollY = useRef(0);
  const isAppBarHidden = useRef(false);
  const scrollThreshold = 10;

  useEffect(() => {
    if (isSuccess && data?.data) {
      if (data.data.length === 0) {
        setHasMorePosts(false);
      } else {
        const newPosts = data.data.filter(
          (newPost: any) =>
            !allPosts.some(post => post.post_id === newPost.post_id),
        );
        if (newPosts.length > 0) {
          setAllPosts(prevPosts => [...prevPosts, ...newPosts]);
        }
      }
    }
  }, [data, isSuccess]);

  const loadMorePosts = useCallback(() => {
    if (hasMorePosts && !isFetching) {
      setPage(prevPage => prevPage + 1);
    }
  }, [hasMorePosts, isFetching]);

  const appBarAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: appBarOffset.value}],
    opacity: appBarOpacity.value,
  }));

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;

    if (currentScrollY <= 100) {
      appBarOffset.value = withTiming(0, {duration: 300, easing: Easing.ease});
      appBarOpacity.value = withTiming(1, {duration: 300, easing: Easing.ease});
      isAppBarHidden.current = false;
    } else if (prevScrollY.current - currentScrollY > scrollThreshold) {
      if (isAppBarHidden.current) {
        appBarOffset.value = withTiming(0, {duration: 300, easing: Easing.ease});
        appBarOpacity.value = withTiming(1, {duration: 300, easing: Easing.ease});
        isAppBarHidden.current = false;
      }
    } else if (currentScrollY - prevScrollY.current > scrollThreshold) {
      if (!isAppBarHidden.current) {
        appBarOffset.value = withTiming(-100, {duration: 300, easing: Easing.ease});
        appBarOpacity.value = withTiming(0, {duration: 300, easing: Easing.ease});
        isAppBarHidden.current = true;
      }
    }
    prevScrollY.current = currentScrollY;
  };



  const renderItem = useCallback(
    ({item}: {item: any}) => {
      if (item.text_post && !item.image_post) {
        return <TextPost post={item}  />;
      } else if (!item.text_post && item.image_post) {
        return <ImagePost  post={item}  />;
      } else if (item.text_post && item.image_post) {
        return <BPost  post={item}  />;
      }
      return null;
    },
    [],
  );

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.appBar, appBarAnimatedStyle]}>
        <Appbar.Header style={styles.appBarHeader}>
          <Text style={styles.title}>Home</Text>
          <Appbar.Action
            icon={() => <MaterialCommunityIcons name="plus-circle" size={24} />}
            onPress={() => {}}
          />
        </Appbar.Header>
      </Animated.View>

      <FlatList
        data={allPosts}
        renderItem={renderItem}
        keyExtractor={item => item.post_id.toString()}
        onScroll={handleScroll}
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.5}
        
        contentContainerStyle={allPosts.length === 0 ? styles.emptyList : undefined}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  appBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: 'white',
    zIndex: 1,
    elevation: 4,
  },
  appBarHeader: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    flex: 1,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  postContainer: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    height:300
  },
  postText: {
    fontSize: 16,
    color: '#333',
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
