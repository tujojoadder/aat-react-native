import {useFocusEffect} from '@react-navigation/native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import {Text, Avatar, Badge, List} from 'react-native-paper';
import Animated from 'react-native-reanimated';

const MenuPage = ({navigation}: any) => {
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    photo: 'https://via.placeholder.com/150', // Replace with actual user image
  };
  const menuItems = [
    {label: 'Home', icon: 'home-outline', route: 'Home', badgeCount: 0},
    {
      label: 'Pages',
      icon: 'file-document-outline',
      route: 'Pages',
      badgeCount: 3,
    },
    {
      label: 'Groups',
      icon: 'account-group-outline',
      route: 'Groups',
      badgeCount: 5,
    },
    {label: 'Settings', icon: 'cog-outline', route: 'Settings', badgeCount: 0},
    {label: 'Logout', icon: 'logout', route: 'Logout', badgeCount: 0},
    {label: 'Home', icon: 'home-outline', route: 'Home', badgeCount: 0},
    {
      label: 'Pages',
      icon: 'file-document-outline',
      route: 'Pages',
      badgeCount: 3,
    },
    {
      label: 'Groups',
      icon: 'account-group-outline',
      route: 'Groups',
      badgeCount: 5,
    },
    {label: 'Settings', icon: 'cog-outline', route: 'Settings', badgeCount: 0},
    {label: 'Logout', icon: 'logout', route: 'Logout', badgeCount: 0},
  ];

  /* make status bar right */
  useFocusEffect(() => {
    StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor('#007BFF');
  });
  return (
    <SafeAreaView style={[styles.container]}>
      {/* Header Section */}
      <View style={styles.header}>
        {/* Left Side: Avatar and User Info */}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 54 / 2,
              backgroundColor: 'white', // Optional for consistent look
            }}>
            <Avatar.Image
              size={54}
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTM1Q4yaQHkUCvG4FrN3eUPkDqXvbAZDpCeA&s',
              }}
            />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
          </View>
        </View>
        {/* Right Side: "hi" Text */}
        <MaterialCommunityIcons name="chevron-right" size={30} color="white" />
      </View>

      {/* Menu Items */}
      <Animated.View style={styles.menuContainer}>
        <View
          style={{
            height: 200,
            width: 200,
            position: 'absolute',
            top: 0,
            right: 0,
            backgroundColor: '#007BFF',
            
          }}></View>
        <View
          style={{
            height: 200,
            width: 200,
            position: 'absolute',
            top: 0,
            right: 0,
            borderTopEndRadius: 200,
            backgroundColor: '#F7F9FC',
            
          }}></View>

        <View style={styles.menuGrid}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => navigation.navigate(item.route)}
              activeOpacity={0.8}>
              <View style={styles.iconWrapper}>
                <List.Icon icon={item.icon} color="#4A4A4A" />
                {item.badgeCount > 0 && (
                  <Badge style={styles.badge}>{item.badgeCount}</Badge>
                )}
              </View>
              <Text style={styles.menuText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    backgroundColor: '#007BFF',

    borderBottomColor: '#E0E0E0',
    borderEndEndRadius: 0,
    borderStartEndRadius: 40,
    
  },
  userInfo: {
    marginLeft: 15,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  userEmail: {
    fontSize: 14,
    color: 'white',
    marginTop: 2,
  },
  menuContainer: {
    flex: 1,
    padding: 15,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuItem: {
    width: (width - 52) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 15,
  },
  iconWrapper: {
    position: 'relative',
    marginBottom: 5,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#E53935',
    color: '#FFFFFF',
    fontSize: 10,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    textAlign: 'center',
  },
  menuText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4A4A4A',
  },
});

export default MenuPage;
