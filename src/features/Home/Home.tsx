import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  FlatList,
} from 'react-native';
import {
  ActivityIndicator,
  Appbar,
  Button,
  Dialog,
  Paragraph,
  Portal,
} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import * as Keychain from 'react-native-keychain';
import {useLogOutUserMutation} from '../../services/userAuthApi';
import {setAuthenticated} from './HomeSlice';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootParamList} from '../../../RootNavigator';
import HadithStatus from '../../HadithStatus/HadithStatusBar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {RootState} from '../../app/store';
import BPost from '../BPost/BPost';
import {REACT_APP_LARAVEL_URL} from '@env';
import {useGetPostsQuery} from '../../services/postApi';
import ImagePost from '../ImagePost/ImagePost';
import TextPost from './../TextPost/TextPost';

type HomeNavigationProps = NativeStackNavigationProp<RootParamList, 'main'>;

export default function Home() {
  const dispatch = useDispatch();
  const allDayHadith = useSelector(
    (state: RootState) => state.home.allDayHadith,
  );

  const navigation = useNavigation<HomeNavigationProps>();
  const appBarOffset = useSharedValue(0); // For AppBar movement
  const appBarOpacity = useSharedValue(1); // For AppBar fade effect
  const prevScrollY = useRef(0); // Previous scroll position tracker
  const isAppBarHidden = useRef(false); // AppBar visibility tracker
  const scrollThreshold = 10; // Smooth behavior threshold

  /* post data */
  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  const {data, isFetching, error, isError, isSuccess, isLoading} =
    useGetPostsQuery(page);

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
    if (hasMorePosts && !isFetching && !isError) {
      /*       console.log('Loading more posts for page:', page + 1);
       */ setPage(prevPage => prevPage + 1);
    }
  }, [hasMorePosts, isFetching, isError, page]);

  const renderItem = ({item: post}: {item: any}) => {
    // Log the post object to the console


    return (
      <View style={styles.postContainer} key={post.post_id}>
        {post.text_post && !post.image_post && <TextPost post={post} />}
        {!post.text_post && post.image_post && <ImagePost post={post} />}
        {post.text_post && post.image_post && <BPost post={post} />}
      </View>
    );
  };

  // Add a new state for handling the initial load state
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);

  // Mark the initial load as complete when the first successful fetch occurs
  useEffect(() => {
    if (isSuccess && data?.data) {
      setIsInitialLoadComplete(true);
    }
  }, [isSuccess, data]);

  /* App bar */
  const appBarAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: appBarOffset.value}],
      opacity: appBarOpacity.value,
    };
  });
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    /*  console.log('currentScrollY' + currentScrollY);
    console.log('prevScrollY.current' + prevScrollY.current); */
    if (currentScrollY <= 100) {
      appBarOffset.value = withTiming(0, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      });

      appBarOpacity.value = withTiming(1, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      });
      isAppBarHidden.current = false;

      /*  hide */
    } else if (prevScrollY.current - currentScrollY > scrollThreshold) {
      if (isAppBarHidden.current) {
        appBarOffset.value = withTiming(0, {
          duration: 300,
          easing: Easing.inOut(Easing.ease),
        });
        appBarOpacity.value = withTiming(1, {
          duration: 300,
          easing: Easing.inOut(Easing.ease),
        });
        isAppBarHidden.current = false;
      }
    } else if (currentScrollY - prevScrollY.current > scrollThreshold) {
      if (!isAppBarHidden.current) {
        appBarOffset.value = withTiming(-100, {
          duration: 300,
          easing: Easing.inOut(Easing.ease),
        });
        appBarOpacity.value = withTiming(0, {
          duration: 300,
          easing: Easing.inOut(Easing.ease),
        });
        isAppBarHidden.current = true;
      }
    }

    prevScrollY.current = currentScrollY;
  };

  /* make status bar right */
  useFocusEffect(() => {
    StatusBar.setBarStyle('dark-content');
    StatusBar.setBackgroundColor('white');
  });

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Animated.View
        sharedTransitionTag="posted"
        style={[styles.appBar, appBarAnimatedStyle]}>
        <Appbar.Header style={styles.appBarHeader}>
          <Text style={styles.title}>aat</Text>
          <Appbar.Action
            icon={() => (
              <MaterialCommunityIcons
                name="plus-circle"
                size={24}
                color="black"
              />
            )}
            onPress={() => {}}
          />

          <Appbar.Action icon="magnify" color="black" onPress={() => {}} />
          <Appbar.Action
            icon="menu"
            color="black"
            onPress={() => navigation.navigate('menu')}
          />
        </Appbar.Header>
      </Animated.View>

      <Animated.FlatList
        showsVerticalScrollIndicator={false} /* hide the scrollbar */
        onScroll={handleScroll}
        data={allPosts}
        renderItem={renderItem}
        windowSize={100}
        onEndReachedThreshold={7}
        keyExtractor={item => item.post_id.toString()}
        onEndReached={loadMorePosts}
       /*  ListFooterComponent={() =>
          isFetching &&
          allPosts.length > 0 && (
            <ActivityIndicator size="large" color="#0000ff" />
          )
        } */
        ListEmptyComponent={() =>
          !isLoading &&
          !isFetching &&
          allPosts.length === 0 &&
          isInitialLoadComplete ? (
            <Text style={styles.emptyText}>No posts available</Text>
          ) : null
        }
        ListHeaderComponent={
          <View>
            <View style={{height: 70, backgroundColor: '#f9f9f9'}}></View>

            <HadithStatus />
          </View>
        }
        contentContainerStyle={allPosts.length === 0 ? styles.emptyList : null} // Handle empty list styling
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 70,
    zIndex: 1,
    backgroundColor: 'white',
    elevation: 2,
  },
  appBarHeader: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: '100%',
  },
  title: {
    flex: 1,
    color: '#007BFF',
    fontSize: 28,
    fontWeight: '700',
  },
  content: {
    fontSize: 28,
    padding: 16,
    textAlign: 'left',
    lineHeight: 28,
  },

  /* post */
  postContainer: {
    
  },
  postText: {
    fontSize: 16,
    color: '#333',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
