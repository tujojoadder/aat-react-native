import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
    image_post: null;
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
    } ;
    timeline_ids: string;
    totalLove: number;
    totalUnlike: number;
    total_comments: number;
    updated_at: string;
  };
  
  
 const TextPost=React.memo(({post}:{post:PostData})=>{
  const [imageHeight, setImageHeight] = useState(0);
  const [likes, setLikes] = useState(120);
  const [unlikes, setUnlikes] = useState(15);
  const [isTextExpanded, setIsTextExpanded] = useState(false); // For "See More" functionality
  const [showOptions, setShowOptions] = useState(false); // Controls the visibility of the options dropdown
  const screenWidth = Dimensions.get('window').width;
  const maxHeight = Dimensions.get('window').height / 1.3;


const profilePic=`${process.env.REACT_APP_LARAVEL_URL}/${post.author.profile_picture}`;
 
  

  const handleLike = () => setLikes(likes + 1);
  const handleUnlike = () => setUnlikes(unlikes + 1);

  const toggleText = () => setIsTextExpanded(!isTextExpanded);

  const toggleOptions = () => setShowOptions(!showOptions);

  return (
    <View style={styles.container}>
      {/* Post Header */}
      <View style={styles.header}>
        <View style={styles.leftHeader}>
          <Image source={{uri:profilePic}} style={styles.profilePic} />
          <View style={styles.userInfo}>
            <Text style={styles.userName} numberOfLines={1}>
            {post.author.user_fname} {post.author.user_lname}
            </Text>
            <Text style={styles.identifier}>{post.author.identifier}</Text>
          </View>
        </View>
        <Text style={styles.postTime}>{post.created_at}</Text>
      </View>

      {/* Post Text */}
      <Text style={styles.text}>
        {isTextExpanded
          ? post.text_post?.post_text
          : `${post.text_post?.post_text.split(' ').slice(0, 20).join(' ')}...`}
        {post.text_post.post_text.split(' ').length > 20 && (
          <Text style={styles.seeMore} onPress={toggleText}>
            {isTextExpanded ? ' See Less' : ' See More'}
          </Text>
        )}
      </Text>

    

      {/* Reactions Section */}
      <View style={styles.reactions}>
        <TouchableOpacity style={styles.reactionButton} onPress={handleLike}>
          <MaterialIcons name="favorite" size={20} color="#FF6F61" />
          <Text style={styles.reactionText}> {likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.reactionButton} onPress={handleUnlike}>
          <MaterialIcons name="thumb-down" size={20} color="#6C757D" />
          <Text style={styles.reactionText}> {unlikes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.reactionButton}>
          <MaterialIcons name="comment" size={20} color="#007BFF" />
          <Text style={styles.reactionText}> 22</Text>
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
export default TextPost;


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
    elevation: 2,
    marginBottom:1
    
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  text: {
    fontSize: 15.5,
    color: '#444',
    marginVertical: 10,
    lineHeight: 22,
  },
  seeMore: {
    color: '#007BFF',
    fontWeight: 'bold',
    fontSize: 15,
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
