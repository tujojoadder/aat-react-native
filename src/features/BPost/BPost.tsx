import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

export default function BPost() {
  const [imageHeight, setImageHeight] = useState(0);
  const screenWidth = Dimensions.get('window').width; // Full width of the screen
  const maxHeight = Dimensions.get('window').height /1.3; // Full width of the screen
  const imageUri = `${process.env.REACT_APP_LARAVEL_URL}/storage/mprofile_picture/default_Qje20swa4ND8zJYL3Zdc4vudsyE1wBtQGIjCJzzQ.jpg`;

  useEffect(() => {
    // Get the intrinsic dimensions of the image
    Image.getSize(
      imageUri,
      (width, height) => {
        const aspectRatio = height / width;
        const calculatedHeight = screenWidth * aspectRatio;

        // Ensure the calculated height does not exceed maxHeight
        setImageHeight(Math.min(calculatedHeight, maxHeight));
      },
      (error) => {
        console.error('Error loading image dimensions:', error);
      }
    );
  }, [imageUri, screenWidth]);

  return (
    <View style={styles.container}>
      {/* Post Image */}
      <Image
        source={{ uri: imageUri }}
        style={[styles.image, { height: imageHeight }]}
        resizeMode="contain" // Ensure the image scales without cropping
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  image: {
    width: '100%', // Full width of the container
  },
});
