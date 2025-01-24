import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {View, Text, StyleSheet} from 'react-native';

const Tab = createMaterialTopTabNavigator();

const PostsScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.text}>Posts Content </Text>
  </View>
);

const ImagesScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.text}>Images Content</Text>
  </View>
);

const FriendsScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.text}>Friends Content</Text>
  </View>
);

export default function TopTabs() {
  return (

      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {fontSize: 14, fontWeight: 'bold'},
          tabBarStyle: {backgroundColor: '#fff'},
          tabBarIndicatorStyle: {backgroundColor: '#007bff', height: 3},
          tabBarActiveTintColor: '#007bff',
          tabBarInactiveTintColor: '#555',
        }}>
        <Tab.Screen name="Posts" component={PostsScreen} />
        <Tab.Screen name="Images" component={ImagesScreen} />
        <Tab.Screen name="Friends" component={FriendsScreen} />
      </Tab.Navigator>
    
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});
