import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

import Home from './Home/Home';
import MenuPage from './Menu/ManuPage';

function ProfileTabBottom() {
  return (
    <View style={styles.screenContainer}>
      <Text>Profile Screen</Text>
    </View>
  );
}

function NotificationsTabBottom() {
  return (
    <View style={styles.screenContainer}>
      <Text>Notifications Screen</Text>
    </View>
  );
}

function SettingsTabBottom() {
  return (
    <View style={styles.screenContainer}>
      <Text>Settings Screen</Text>
    </View>
  );
}

export default function MainScreen() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="HomeBottomTab"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007BFF',
        tabBarInactiveTintColor: '#6c757d',
        tabBarStyle: {
          backgroundColor: '#f8f9fa',
          height: 56,
          padding: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="HomeBottomTab"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileBottomTab"
        component={ProfileTabBottom}
        options={{
          tabBarLabel: 'iChannel',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="mosque" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="MainFeature"
        component={ProfileTabBottom}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, focused }) => (
            <MainFeatureIcon focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsTabBottom}
        options={{
          tabBarLabel: 'Groups',
          tabBarIcon: ({ color, size }) => (
            <Feather name="users" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={MenuPage}
        options={{
          tabBarLabel: 'Message',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="message-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const MainFeatureIcon = ({ focused }:any) => {
  const [scale] = useState(new Animated.Value(1)); // Start with scale 1

  useEffect(() => {
    if (focused) {
      // Pulse effect: scale up and down
      Animated.loop(
        Animated.sequence([
          Animated.timing(scale, {
            toValue: 1.09,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      // Reset scale when not focused
      scale.setValue(1);
    }
  }, [focused, scale]);

  return (
    <Animated.View
      style={[
        styles.circleIcon,
        {
          transform: [{ scale }],
        },
      ]}
    >
      <FontAwesome6 name="book-open-reader" color="#fff" size={29} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  circleIcon: {
    width: 47,
    height: 47,
    backgroundColor: '#007BFF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    marginBottom:7
  },
});
