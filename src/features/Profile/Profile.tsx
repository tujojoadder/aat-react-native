import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList, Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const { height } = Dimensions.get('window');

type TabScreenProps = {
  data: any[];
};

const Header = () => (
  <View style={styles.header}>
    <Text style={styles.headerText}>Profile</Text>
  </View>
);

const TabContent = ({ data }: TabScreenProps) => (
  <FlatList
    data={data}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({ item, index }) => (
      <View style={styles.item}>
        <Text>{`Item ${item}`}</Text>
      </View>
    )}
    contentContainerStyle={{ paddingBottom: 20 }}
  />
);

const Posts = () => {
  const [posts] = useState(Array.from({ length: 20 }, (_, i) => `Post ${i + 1}`));
  return <TabContent data={posts} />;
};

const Friends = () => {
  const [friends] = useState(Array.from({ length: 15 }, (_, i) => `Friend ${i + 1}`));
  return <TabContent data={friends} />;
};

const Photos = () => {
  const [photos] = useState(Array.from({ length: 25 }, (_, i) => `Photo ${i + 1}`));
  return <TabContent data={photos} />;
};

const Tab = createMaterialTopTabNavigator();

const ProfileTabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarStyle: {
        backgroundColor: '#f8f9fa',
      },
      tabBarIndicatorStyle: {
        backgroundColor: '#007bff',
      },
      tabBarLabelStyle: {
        fontSize: 14,
        fontWeight: '600',
      },
    }}
  >
    <Tab.Screen name="Posts" component={Posts} />
    <Tab.Screen name="Friends" component={Friends} />
    <Tab.Screen name="Photos" component={Photos} />
  </Tab.Navigator>
);

const Profile = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <ProfileTabs />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#007bff',
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
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
  },
});
