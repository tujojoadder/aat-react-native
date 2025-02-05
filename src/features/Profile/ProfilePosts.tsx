import {View, Text, ListRenderItem, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Segmented} from 'react-native-collapsible-segmented-view';
import {RootParamList} from '../../../RootNavigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useGetSpecificUserPostQuery} from '../../services/profileApi';
import Activator from '../Activator/Activator';
import TextPost from '../TextPost/TextPost';
import ImagePost from '../ImagePost/ImagePost';
import BPost from '../BPost/BPost';
import {ActivityIndicator} from 'react-native-paper';
// Define the props type
type ProfilePostsProps = {
    userId: string;
  };
  export default function ProfilePosts({userId}: ProfilePostsProps) {


  // State for pagination
  const [allPosts, setPosts] = useState<any[]>([]);
  const [postPage, setPostPage] = useState(1);

  const [hasMorePosts, setHasMorePosts] = useState(true);
  /* get post */

  const {
    data: postData,
    isFetching,
    isError,
    isSuccess,
  } = useGetSpecificUserPostQuery({postPage, userId});

  /* posts */
  useEffect(() => {
    if (postData?.data) {
      if (postData.data.length === 0) {
        setHasMorePosts(false);
      } else {
        const newPosts = postData.data.filter(
          (newPost: any) =>
            !allPosts.some(post => post.post_id === newPost.post_id),
        );

        if (newPosts.length > 0) {
          setPosts(prev => [...prev, ...newPosts]);
        }
      }
    }
  }, [postData, isSuccess]);

  // Load more data when reaching the end of the list
  const loadMoreData = useCallback(() => {
    if (hasMorePosts && !isFetching) {
      setPostPage(prev => prev + 1);
    }
  }, [hasMorePosts, isFetching]);

  // Common List Render Function
  const renderItem = useCallback(({item}: {item: any}) => {
    if (item.text_post && !item.image_post) {
      return <TextPost post={item} />;
    } else if (!item.text_post && item.image_post) {
      return <ImagePost post={item} />;
    } else if (item.text_post && item.image_post) {
      return <BPost post={item} />;
    }
    return null;
  }, []);

  const Footer = React.memo(() => (
    <ActivityIndicator color="blue" style={{marginVertical: 16}} />
  ));

  return (
    <Segmented.FlatList
      data={allPosts}
      renderItem={renderItem}
      onEndReached={loadMoreData}
      keyExtractor={item => item.post_id.toString()}
      ListFooterComponent={hasMorePosts || isFetching ? <Activator /> : null}
    />
  );
}

const styles = StyleSheet.create({
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 250,
    width: '100%',
  },
  text: {
    fontSize: 32,
  },
});
