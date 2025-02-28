import {View, StyleSheet} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function FriendSkeleton() {
  return (
    <View style={styles.container}>
      <SkeletonPlaceholder
        borderRadius={10}
        backgroundColor="#E1E9EE"
        highlightColor="#F2F8FC">
        {/* Wrap all items inside SkeletonPlaceholder.Item */}
        <SkeletonPlaceholder.Item>
          <View style={styles.suggestionContainer}>
            <View style={styles.profilePic} />
            <View style={styles.textContainer}>
              <View style={styles.namePlaceholder} />
              <View style={styles.identifierPlaceholder} />
            </View>
          </View>

          <View style={styles.suggestionContainer}>
            <View style={styles.profilePic} />
            <View style={styles.textContainer}>
              <View style={styles.namePlaceholder} />
              <View style={styles.identifierPlaceholder} />
            </View>
          </View>

          <View style={styles.suggestionContainer}>
            <View style={styles.profilePic} />
            <View style={styles.textContainer}>
              <View style={styles.namePlaceholder} />
              <View style={styles.identifierPlaceholder} />
            </View>
          </View>

          <View style={styles.suggestionContainer}>
            <View style={styles.profilePic} />
            <View style={styles.textContainer}>
              <View style={styles.namePlaceholder} />
              <View style={styles.identifierPlaceholder} />
            </View>
          </View>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  suggestionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  profilePic: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  namePlaceholder: {
    width: '60%',
    height: 15,
    borderRadius: 5,
    marginBottom: 5,
  },
  identifierPlaceholder: {
    width: '40%',
    height: 12,
    borderRadius: 5,
  },
});
