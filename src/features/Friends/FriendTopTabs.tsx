import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AuthFriendRequestsContainer from './AuthFriendRequestsContainer/AuthFriendRequestsContainer';
import AuthFriendSuggestionsContainer from './AuthFriendSuggestionsContainer/AuthFriendSuggestionsContainer';
import AuthFriendAllFriendContainer from './AuthFriendAllFriendContainer/AuthFriendAllFriendContainer';
import AuthSendRequestContainer from './AuthSendRequestContainer/AuthSendRequestContainer';

// Define the parameter list for the top tabs
export type FriendTopTabsParamList = {
  Tab1: undefined;
  Tab2: undefined;
  Tab3: undefined;
  Tab4: undefined;
  Tab5: undefined;
};

// Create the top tab navigator
const TopTab = createMaterialTopTabNavigator<FriendTopTabsParamList>();


// Define the FriendTopTabs component
const FriendTopTabs = () => {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 15, fontWeight: 'bold' },
        tabBarIndicatorStyle: { backgroundColor: '#6200ee' },
        tabBarActiveTintColor: '#6200ee',
        tabBarInactiveTintColor: '#555',
        tabBarScrollEnabled: true, // Enables horizontal scrolling
        lazy: true, // 🚀 Only loads the active tab
      }}
      style={{ paddingTop: 55 }}
    >
      <TopTab.Screen name="Tab1" component={AuthFriendRequestsContainer} options={{ title: 'Friend Requests' }} />
      <TopTab.Screen name="Tab2" component={AuthFriendSuggestionsContainer} options={{ title: 'Suggestions' }} />
      <TopTab.Screen name="Tab3" component={AuthFriendAllFriendContainer} options={{ title: 'All friends' }} />
      <TopTab.Screen name="Tab4" component={AuthSendRequestContainer} options={{ title: 'Sent requests' }} />

    </TopTab.Navigator>
  );
};

// Styles for the tab components
const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  tabText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default FriendTopTabs;
