import React from 'react';
import { View, Dimensions } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const ProfileSkeleton = () => {
  const { width } = Dimensions.get('window');

  // Dynamic dimensions
  const coverPhotoHeight = width * 0.6; // 40% of screen width
  const profilePhotoSize = width * 0.25; // 25% of screen width

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <SkeletonPlaceholder borderRadius={4} backgroundColor="#E1E9EE" highlightColor="#F2F8FC">
        <View>
          {/* Cover Photo */}
          <SkeletonPlaceholder.Item
            width={width}
            height={coverPhotoHeight}
       
          />

          {/* Profile Picture */}
          <SkeletonPlaceholder.Item
            position="absolute"
            top={coverPhotoHeight - profilePhotoSize / 2}
            left={15}
            width={profilePhotoSize}
            height={profilePhotoSize}
            borderRadius={profilePhotoSize / 2}
            borderWidth={4}
            borderColor="#fff"
          />

          {/* User Details */}
          <SkeletonPlaceholder.Item alignItems="center" marginTop={profilePhotoSize / 2 + 20}>
            <SkeletonPlaceholder.Item width={120} height={20} borderRadius={4} />
            <SkeletonPlaceholder.Item width={80} height={16} borderRadius={4} marginTop={10} />
            <SkeletonPlaceholder.Item width={200} height={14} borderRadius={4} marginTop={10} />
          </SkeletonPlaceholder.Item>

          
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

export default ProfileSkeleton;