import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';  // Import MaterialIcons

export default function BPost() {
  const [imageHeight, setImageHeight] = useState(0);
  const [likes, setLikes] = useState(120);
  const [unlikes, setUnlikes] = useState(15); // "Unlike" state
  const screenWidth = Dimensions.get('window').width;
  const maxHeight = Dimensions.get('window').height / 1.3;
  const imageUri = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHb4gc3-erZyXJnA3lmSlqh7JLJkRpFJtYfxAP4YsZnYikQTkGRthVo8gKGJ-QCMHikrc&usqp=CAU';

  const post = {
    profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTM1Q4yaQHkUCvG4FrN3eUPkDqXvbAZDpCeA&s',
    userName: 'John Doe ',
    identifier: '@johndoe',
    text: 'Check out my awesome post!',
    comments: 45,
    shares: 10,
    postTime: '2 hours ago', // New field for post time
  };

  useEffect(() => {
    Image.getSize(
      imageUri,
      (width, height) => {
        const aspectRatio = height / width;
        const calculatedHeight = screenWidth * aspectRatio;
        setImageHeight(Math.min(calculatedHeight, maxHeight));
      },
      (error) => {
        console.error('Error loading image dimensions:', error);
      }
    );
  }, [imageUri, screenWidth]);

  const handleLike = () => setLikes(likes + 1);
  const handleUnlike = () => setUnlikes(unlikes + 1);

  return (

    <><View style={styles.container}>
      {/* Post Header */}
      <View style={styles.header}>
        <View style={styles.leftHeader}>
          <Image source={{ uri: post.profilePic }} style={styles.profilePic} />
          <View style={styles.userInfo}>
            <Text  style={styles.userName} numberOfLines={1}>{post.userName}</Text>
            <Text style={styles.identifier}>{post.identifier}</Text>
          </View>
        </View>
        {/* Post Time */}
        <Text style={styles.postTime}>{post.postTime}</Text>
      </View>

      {/* Post Text */}
      <Text style={styles.text}>{post.text}</Text>

      {/* Post Image */}
      <Image source={{ uri: imageUri }} style={[styles.image, { height: imageHeight }]} resizeMode="cover" />

      {/* Reactions Section */}
      <View style={styles.reactions}>
        {/* Like Button */}
        <TouchableOpacity style={styles.reactionButton} onPress={handleLike}>
          <MaterialIcons name="favorite" size={20} color="#D9534F" />
          <Text style={styles.reactionText}> {likes}</Text>
        </TouchableOpacity>

        {/* Unlike Button */}
        <TouchableOpacity style={styles.reactionButton} onPress={handleUnlike}>
          <MaterialIcons name="thumb-down" size={20} color="#D9534F" />
          <Text style={styles.reactionText}> {unlikes}</Text>
        </TouchableOpacity>

        {/* Comment Button */}
        <TouchableOpacity style={styles.reactionButton}>
          <MaterialIcons name="comment" size={20} color="#6C757D" />
          <Text style={styles.reactionText}> {post.comments}</Text>
        </TouchableOpacity>

        {/* Share Button */}
        <TouchableOpacity style={styles.reactionButton}>
          <MaterialIcons name="share" size={20} color="#6C757D" />
          <Text style={styles.reactionText}> {post.shares}</Text>
        </TouchableOpacity>
      </View>
    </View>
    
    
    
    <View style={styles.container}>
      {/* Post Header */}
      <View style={styles.header}>
        <View style={styles.leftHeader}>
          <Image source={{ uri: post.profilePic }} style={styles.profilePic} />
          <View style={styles.userInfo}>
            <Text  style={styles.userName} numberOfLines={1}>{post.userName}</Text>
            <Text style={styles.identifier}>{post.identifier}</Text>
          </View>
        </View>
        {/* Post Time */}
        <Text style={styles.postTime}>{post.postTime}</Text>
      </View>

      {/* Post Text */}
      <Text style={styles.text}>{post.text}</Text>

      {/* Post Image */}
{/*       <Image source={{ uri: imageUri }} style={[styles.image, { height: imageHeight }]} resizeMode="cover" />
 */}
      {/* Reactions Section */}
      <View style={styles.reactions}>
        {/* Like Button */}
        <TouchableOpacity style={styles.reactionButton} onPress={handleLike}>
          <MaterialIcons name="favorite" size={20} color="#D9534F" />
          <Text style={styles.reactionText}> {likes}</Text>
        </TouchableOpacity>

        {/* Unlike Button */}
        <TouchableOpacity style={styles.reactionButton} onPress={handleUnlike}>
          <MaterialIcons name="thumb-down" size={20} color="#D9534F" />
          <Text style={styles.reactionText}> {unlikes}</Text>
        </TouchableOpacity>

        {/* Comment Button */}
        <TouchableOpacity style={styles.reactionButton}>
          <MaterialIcons name="comment" size={20} color="#6C757D" />
          <Text style={styles.reactionText}> {post.comments}</Text>
        </TouchableOpacity>

        {/* Share Button */}
        <TouchableOpacity style={styles.reactionButton}>
          <MaterialIcons name="share" size={20} color="#6C757D" />
          <Text style={styles.reactionText}> {post.shares}</Text>
        </TouchableOpacity>
      </View>
    </View>





    <View style={styles.container}>
      {/* Post Header */}
      <View style={styles.header}>
        <View style={styles.leftHeader}>
          <Image source={{ uri: post.profilePic }} style={styles.profilePic} />
          <View style={styles.userInfo}>
            <Text  style={styles.userName} numberOfLines={1}>{post.userName}</Text>
            <Text style={styles.identifier}>{post.identifier}</Text>
          </View>
        </View>
        {/* Post Time */}
        <Text style={styles.postTime}>{post.postTime}</Text>
      </View>

      {/* Post Text */}
    {/*   <Text style={styles.text}>{post.text}</Text>
 */}
      {/* Post Image */}
      <Image source={{ uri: imageUri }} style={[styles.image, { height: imageHeight }]} resizeMode="cover" />

      {/* Reactions Section */}
      <View style={styles.reactions}>
        {/* Like Button */}
        <TouchableOpacity style={styles.reactionButton} onPress={handleLike}>
          <MaterialIcons name="favorite" size={20} color="#D9534F" />
          <Text style={styles.reactionText}> {likes}</Text>
        </TouchableOpacity>

        {/* Unlike Button */}
        <TouchableOpacity style={styles.reactionButton} onPress={handleUnlike}>
          <MaterialIcons name="thumb-down" size={20} color="#D9534F" />
          <Text style={styles.reactionText}> {unlikes}</Text>
        </TouchableOpacity>

        {/* Comment Button */}
        <TouchableOpacity style={styles.reactionButton}>
          <MaterialIcons name="comment" size={20} color="#6C757D" />
          <Text style={styles.reactionText}> {post.comments}</Text>
        </TouchableOpacity>

        {/* Share Button */}
        <TouchableOpacity style={styles.reactionButton}>
          <MaterialIcons name="share" size={20} color="#6C757D" />
          <Text style={styles.reactionText}> {post.shares}</Text>
        </TouchableOpacity>
      </View>
    </View>
    </>
    
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    shadowRadius: 8,
    elevation: 5,
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Align left and right sections
    marginBottom: 10,
  },
  leftHeader: {
    flexDirection: 'row', // Align profile image and text in a row
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
    fontSize: 18,
    color: '#333',
  },
  identifier: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  postTime: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right', // Align the time to the right
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginVertical: 10,
  },
  image: {
    width: '100%',
    borderRadius: 12,
    marginBottom: 10,
  },
  reactions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  reactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  reactionText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 5,
  },
});
