import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Define the Bottom Tab Navigator
const Tab = createBottomTabNavigator();

// Home Component
function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Home Screen!</Text>
    </View>
  );
}

// Group Component
function Group() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Group Screen!</Text>
    </View>
  );
}

// Settings Component (Placeholder)
function Settings() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Settings Screen!</Text>
    </View>
  );
}

// AppStack Component
export default function AppStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Group" component={Group} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

// Styles for the screens
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});
