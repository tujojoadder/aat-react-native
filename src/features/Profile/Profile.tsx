import React, { useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Tabs } from 'react-native-collapsible-tab-view';

const HEADER_HEIGHT = 250;

const Header = () => (
  <View style={styles.header} pointerEvents="box-none">
    <Text style={styles.headerText}>Profile</Text>
  </View>
);

const SmoothFlatList = ({ data }: { data: any }) => {
  const renderItem = useCallback(
    ({ item }: { item: any }) => (
      <View style={styles.item}>
        <Text>{item}</Text>
      </View>
    ),
    []
  );

  return (
    <Tabs.FlatList
      overScrollMode="never"
      data={data}
      keyExtractor={(item) => item}
      renderItem={renderItem}
      getItemLayout={(data, index) => ({
        length: 200, // Fixed height for each item
        offset: 200 * index,
        index,
      })}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
      removeClippedSubviews={false} // Can be set to false for smoother scrolling
      showsVerticalScrollIndicator={false}
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
        scrollEnabled: true, // Enable smooth scrolling for the pager
      }}
    >
      <Tabs.Tab name="Posts" label="Posts">
        <Posts />
      </Tabs.Tab>
      <Tabs.Tab name="Friends" label="Friends">
        <Friends />
      </Tabs.Tab>
      <Tabs.Tab name="Photos" label="Photos">
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
    overflow: 'hidden', // Enable hardware acceleration
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
