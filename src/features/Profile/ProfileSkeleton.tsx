// src/features/Profile/ProfileSkeleton.tsx

import React from 'react';
import {View, StyleSheet} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const ProfileSkeleton = () => {
  return (
    <View style={styles.container}>
      <SkeletonPlaceholder>
        {/* Wrap all children inside a single parent View */}
        <View>
          
          <View style={styles.coverPhotoContainer}>
            <View style={styles.coverPhoto} />
            <View style={styles.profilePicContainer}>
              <View style={styles.profilePic} />
            </View>
          </View>

          <View style={styles.content}></View>
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  coverPhotoContainer: {
    height: '30%',
    width: '100%',
    position: 'relative',
  },
  coverPhoto: {
    height: '100%',
    width: '100%',
  },
  profilePicContainer: {
    position: 'absolute',
    bottom: -60,
    left: '5%',
  },
  profilePic: {
    height: 120,
    width: 120,
    borderRadius: 60,
  },
  content: {
    marginTop: 80,
    height: '60%',
    width: '100%',
  },
  contentSkeleton: {
    height: '100%',
    width: '100%',
  },
});

export default ProfileSkeleton;
