import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Segmented } from 'react-native-collapsible-segmented-view';
import { ActivityIndicator, Modal, Portal, Button } from 'react-native-paper';
import { useGetSpecificUserPhotoQuery } from '../../services/profileApi';

export default function ProfileImages() {

      // Calculate number of columns dynamically based on screen width
        // Get screen width
  const screenWidth = Dimensions.get('window').width;

  const numColumns = useMemo(() => Math.floor(screenWidth / 150), []);

  const userId = '526fa940-c06f-4344-ad54-f723234f2fae';

  // State for pagination
  const [allPhotos, setPhotos] = useState<any[]>([]);
  const [photoPage, setPhotoPage] = useState(1);
  const [hasMorePhotos, setHasMorePhotos] = useState(true);

  // State for modal
  const [visible, setVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Fetch photos
  const {
    data: photoData,
    isFetching,
    isSuccess,
  } = useGetSpecificUserPhotoQuery({ photoPage, userId });

  // Update photos when new data is fetched
  useEffect(() => {
    if (photoData?.data) {
      if (photoData.data.length === 0) {
        setHasMorePhotos(false);
      } else {
        const newPosts = photoData.data.filter(
          (newPost: any) =>
            !allPhotos.some(post => post.post_id === newPost.post_id),
        );

        if (newPosts.length > 0) {
          setPhotos(prev => [...prev, ...newPosts]);
        }
      }
    }
  }, [photoData, isSuccess]);

  // Load more data when reaching the end of the list
  const loadMoreData = useCallback(() => {
    if (hasMorePhotos && !isFetching) {
      setPhotoPage(prev => prev + 1);
    }
  }, [hasMorePhotos, isFetching]);

  // Open modal with selected image
  const openModal = useCallback((imageUrl: string) => {
    setSelectedImage(imageUrl);
    setVisible(true);
  }, []);

  // Close modal
  const closeModal = () => {
    setVisible(false);
    setSelectedImage(null);
  };

  // Render each image item
  const renderItem = useCallback(({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => openModal(`${process.env.REACT_APP_LARAVEL_URL}/${item.image_post.post_url}`)}
      >
        <Image
          source={{ uri: `${process.env.REACT_APP_LARAVEL_URL}/${item.image_post.post_url}` }}
          style={styles.image}
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
  }, [openModal]);

  // Footer component for loading indicator
  const Footer = React.memo(() => (
    <View style={styles.footer}>
      {hasMorePhotos && <ActivityIndicator color="blue" size="small" />}
    </View>
  ));

  return (
    <View style={{ flex: 1 }}>

      <Segmented.FlatList
        data={allPhotos}
        renderItem={renderItem}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        keyExtractor={item => item.post_id.toString()}
        numColumns={numColumns}
        columnWrapperStyle={styles.columnWrapper}
        ListFooterComponent={Footer}
        contentContainerStyle={styles.listContent}
      />

      {/* Full-Screen Modal */}
      <Portal>
        <Modal visible={visible} onDismiss={closeModal} contentContainerStyle={styles.modalContainer}>
          {selectedImage && (
            <Image source={{ uri: selectedImage }} style={styles.fullscreenImage} resizeMode="contain" />
          )}
          <Button mode="contained" textColor='black' onPress={closeModal} style={styles.closeButton}>
            Close
          </Button>
        </Modal>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: 150,
    height: 120,
    margin: 8,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  columnWrapper: {
    justifyContent: 'center',
  },
  listContent: {
    paddingHorizontal: 8,
  },
  footer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)', // Dark background for better focus
  },
  fullscreenImage: {
    width: '100%',
    height: '80%',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#fff',
    
  },
});
