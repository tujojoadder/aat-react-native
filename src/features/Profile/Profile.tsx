import React, { useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Tabs } from 'react-native-collapsible-tab-view';

const HEADER_HEIGHT = 250;

const Header = () => (
  <View style={styles.header}>
    <Text style={styles.headerText}>Profile</Text>
  </View>
);

const SmoothFlatList = ({ data }:{data:any}) => {
  // Use useCallback to prevent re-creation of renderItem
  const renderItem = useCallback(
    ({ item }:{item:any}) => (
      <View style={styles.item}>
        <Text>{item}</Text>
      </View>
    ),
    []
  );

  return (
    <Tabs.FlatList
      data={data}
      keyExtractor={(item) => item}
      renderItem={renderItem}
      initialNumToRender={10} // Render the first 10 items initially
      maxToRenderPerBatch={10} // Limit rendering to 10 items per batch
      windowSize={5} // Keep 5 screens worth of items in memory
      removeClippedSubviews={true} // Improve memory usage on large lists
      showsVerticalScrollIndicator={false} // Hide vertical scrollbars for better UX
    />
  );
};

const Posts = () => <SmoothFlatList data={Array.from({ length: 20 }, (_, i) => `Post ${i + 1}`)} />;
const Friends = () => <SmoothFlatList data={Array.from({ length: 15 }, (_, i) => `Friend ${i + 1}`)} />;
const Photos = () => <SmoothFlatList data={Array.from({ length: 25 }, (_, i) => `Photo ${i + 1}`)} />;

const Profile = () => {
  return (
    <Tabs.Container
    
      renderHeader={Header}
      headerHeight={HEADER_HEIGHT}
      pagerProps={{

        scrollEnabled: false, // Enable scrolling

      }}
    >
      <Tabs.Tab name="Posts">
        <Posts />
      </Tabs.Tab>
      <Tabs.Tab name="Frieddnds">
        <Friends />
      </Tabs.Tab>
      <Tabs.Tab name="Photdvdos">
        <Photos />
      </Tabs.Tab>

    </Tabs.Container>
  );
};

const styles = StyleSheet.create({
  header: {
    height: HEADER_HEIGHT,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  item: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    height: 200,
  },
});

export default Profile;
