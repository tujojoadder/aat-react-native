import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PostTime from '../utils/PostTime/PostTime';
import {useToggleLoveMutation} from '../../services/loveApi';
import {useToggleUnlikeMutation} from '../../services/unlikeApi';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {setLoveReaction, setUnlikeReactions} from '../Home/HomeSlice';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import FormateLargeNumber from '../utils/FormateLargeNumber/FormateLargeNumber';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootParamList} from '../../../RootNavigator';
import {useNavigation} from '@react-navigation/native';
type PostData = {
  approval: number;
  audience: string;
  author: {
    birthdate: string;
    blueticks: number;
    cover_photo: string;
    created_at: string;
    email: string;
    gender: string;
    identifier: string;
    profile_picture: string;
    reported_count: number;
    total_quiz_point: number;
    updated_at: string;
    user_fname: string;
    user_id: string;
    user_lname: string;
  };
  author_id: string;
  created_at: string;
  group_id: string | null;
  iaccount_id: string | null;
  image_post: {
    created_at: string;
    image_posts_id: string;
    post_id: string;
    post_url: string;
    updated_at: string;
  } | null;
  isLove: boolean;
  isUnlike: boolean;
  page_id: string | null;
  post_id: string;
  post_type: string;
  reported_count: number;
  text_post: {
    created_at: string;
    post_id: string;
    post_text: string;
    text_post_id: string;
    updated_at: string;
  } | null;
  timeline_ids: string;
  totalLove: number;
  totalUnlike: number;
  total_comments: number;
  updated_at: string;
};

type ImageNavigationProps = NativeStackNavigationProp<RootParamList, 'main'>;

const ImagePost = React.memo(({post}: {post: PostData}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<ImageNavigationProps>();

  const [imageHeight, setImageHeight] = useState(
    Dimensions.get('window').height / 2,
  );
  const [likes, setLikes] = useState(120);
  const [unlikes, setUnlikes] = useState(15);
  const [showOptions, setShowOptions] = useState(false); // Controls the visibility of the options dropdown
  const screenWidth = Dimensions.get('window').width;
  const maxHeight = Dimensions.get('window').height / 1.6;
  const imageUri = `${process.env.REACT_APP_LARAVEL_URL}/${post.image_post?.post_url}`;
  const profilePic = `${process.env.REACT_APP_LARAVEL_URL}/${post.author.profile_picture}`;

  const handleLike = () => setLikes(likes + 1);
  const handleUnlike = () => setUnlikes(unlikes + 1);
  const toggleOptions = () => setShowOptions(!showOptions);

  /*  Love Unlike  */
  const [toggleLove] = useToggleLoveMutation();
  const [toggleUnlike] = useToggleUnlikeMutation();
  const loveScale = useSharedValue(1); // Scale for love icon
  const unlikeScale = useSharedValue(1); // Scale for unlike icon

  /* click on love and unlike */
  // Redux selectors for request status

  const [totalLove, setTotalLove] = useState(post.totalLove);
  const [totalUnLike, setTotalUnlike] = useState(post.totalUnlike);

  const loveReactions = useSelector(
    (state: RootState) => state.home.loveReactions[post.post_id],
  );
  const unlikeReactions = useSelector(
    (state: RootState) => state.home.unlikeReactions[post.post_id],
  );

  /* Initial love and unlike update */
  useEffect(() => {
    if (post.isLove) {
      dispatch(setLoveReaction({postId: post.post_id, isActive: true})); // Activate love reaction
    }
    if (post.isUnlike) {
      dispatch(setUnlikeReactions({postId: post.post_id, isActive: true})); // Activate unlike reaction
    }
  }, []);

  /* handle love click  */
  const handleLoveClick = async () => {
    // Optimistic update

    if (loveReactions) {
      dispatch(setLoveReaction({postId: post.post_id, isActive: false}));
      setTotalLove(value => value - 1);
    } else {
      loveEffect();
      dispatch(setLoveReaction({postId: post.post_id, isActive: true})); // Activate love reaction
      setTotalLove(value => value + 1);
      if (unlikeReactions) {
        setTotalUnlike(value => value - 1);
      }
    }

    try {
      await toggleLove({loveOnType: 'post', loveOnId: post.post_id});
    } catch (error) {
      /*       console.error('Failed to toggle love:', error);
       */
    }
  };

  /* handle unlike click */
  const handleUnlikeClick = async () => {
    // Optimistic update

    if (unlikeReactions) {
      dispatch(setUnlikeReactions({postId: post.post_id, isActive: false})); // Activate unlike reaction
      setTotalUnlike(value => value - 1);
    } else {
      unLikeEffect();
      dispatch(setUnlikeReactions({postId: post.post_id, isActive: true})); // Activate unlike reaction
      setTotalUnlike(value => value + 1);

      if (loveReactions) {
        setTotalLove(value => value - 1);
      }
    }

    try {
      await toggleUnlike({unlikeOnType: 'post', unlikeOnId: post.post_id});
    } catch (error) {
      /*       console.error('Failed to toggle unlike:', error);
       */
    }
  };

  // Animated styles for scaling
  const loveAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: loveScale.value}],
  }));

  const unlikeAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: unlikeScale.value}],
  }));

  // Handle scaling animation for love button
  const loveEffect = () => {
    loveScale.value = withTiming(1.6, {duration: 200}, () => {
      loveScale.value = withTiming(1, {duration: 200});
    });
  };

  // Handle scaling animation for unlike button
  const unLikeEffect = () => {
    unlikeScale.value = withTiming(1.6, {duration: 200}, () => {
      unlikeScale.value = withTiming(1, {duration: 200});
    });
  };

  /* console.log('authorId'+ 'post.author.user_id') */
  return (
    <View style={styles.container}>
      {/* Post Header */}
      <View style={styles.header}>
 
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('profile', {authorId: post.author.user_id})
            }>
            <Image source={{uri: profilePic}} style={styles.profilePic} />
          </TouchableOpacity>

          <View style={[styles.userInfo,{}]}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('profile', {authorId: post.author.user_id})
              }>
              <Text style={styles.userName} numberOfLines={1}>
                {post.author.user_fname} {post.author.user_lname}
              </Text>
            </TouchableOpacity>

            <Text numberOfLines={1} style={styles.identifier}>
              {post.author.identifier}
            </Text>
          </View>
      
        <PostTime createdAt={post.created_at} />
      </View>

      {/* Post Image */}
      <Image
        source={{uri: imageUri}}
        style={[styles.image, {height: imageHeight}]}
        resizeMode="contain" // Ensures the full image is visible
      />

      {/* Reactions Section */}
      <View style={styles.reactions}>
        {/* Love Reaction Button */}
        <TouchableOpacity
          style={styles.reactionButton}
          onPress={handleLoveClick}>
          <Animated.View style={loveAnimatedStyle}>
            <MaterialIcons
              name="favorite"
              size={20}
              color={loveReactions ? '#FF6F61' : '#6C757D'}
            />
          </Animated.View>
          <FormateLargeNumber number={totalLove} />
        </TouchableOpacity>

        {/* Unlike Reaction Button */}
        <TouchableOpacity
          style={styles.reactionButton}
          onPress={handleUnlikeClick}>
          <Animated.View style={unlikeAnimatedStyle}>
            <MaterialIcons
              name="thumb-down"
              size={20}
              color={unlikeReactions ? '#000000' : '#6C757D'}
            />
          </Animated.View>
          <FormateLargeNumber number={totalUnLike} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.reactionButton}>
          <MaterialIcons name="comment" size={20} color="#007BFF" />
          <Text style={styles.reactionText}> 10</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.reactionButton} onPress={toggleOptions}>
          <MaterialIcons name="expand-less" size={21} color="#007BFF" />
        </TouchableOpacity>
      </View>

      {/* Options Dropdown */}
      {showOptions && (
        <View style={styles.optionsBox}>
          <TouchableOpacity style={styles.optionItem}>
            <Text style={styles.optionText}>Block</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionItem}>
            <Text style={styles.optionText}>Report</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionItem}>
            <Text style={styles.optionText}>Share</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
});
export default React.memo(ImagePost);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
    elevation: 2,
    marginBottom: 1,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 2,
    borderColor: '#00A5E5',
    marginRight: 10,
  },
  userInfo: {
    justifyContent: 'center',
    flex:1,
   
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  identifier: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
  },
  postTime: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
  image: {
    width: '100%',
    borderRadius: 12,
    marginBottom: 7,
  },
  reactions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 7,
  },
  reactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reactionText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 5,
  },
  optionsBox: {
    position: 'absolute',
    bottom: 60, // Position above the expand-less button
    right: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000,
  },
  optionItem: {
    padding: 10,
  },
  optionText: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
});
