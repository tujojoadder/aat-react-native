import {useFocusEffect} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Platform,
  ScrollView,
  Pressable,
} from 'react-native';
import {Text, Avatar, Badge, List, Appbar} from 'react-native-paper';
import Animated from 'react-native-reanimated';

const MenuPage = ({navigation}: any) => {
  const layoutRef = useRef({width: 0, height: 0});

  const handleLayout = (event: any) => {
    const {width, height} = event.nativeEvent.layout;
    layoutRef.current = {width, height}; // Update the ref value
    console.log('Layout updated:', layoutRef.current); // Log the current layout
  };
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    photo: 'https://via.placeholder.com/150', // Replace with actual user image
  };

  /* make status bar right */
  useFocusEffect(() => {
    StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor('#007BFF');
  });
  return (
    <SafeAreaView style={[styles.container]}>
      {/* Header Section */}
      <ScrollView
        overScrollMode="never" // Disable overscroll effect on Android
        bounces={false} // Disable bounce effect on iOS
        showsVerticalScrollIndicator={false} // Hides the vertical scrollbar
        showsHorizontalScrollIndicator={false} // Hides the horizontal scrollbar (optional)
        /*     stickyHeaderIndices={[0]} // Index of the header to stick */
      >
        <View>
          <Appbar.Header style={{backgroundColor: '#007BFF'}}>
            <Appbar.Content title="Menu" titleStyle={{color: 'white'}} />
          </Appbar.Header>
        </View>

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
          <MaterialCommunityIcons
            name="chevron-right"
            size={30}
            color="white"
          />
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
            <View style={styles.menuGrid}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate('Home')}
                activeOpacity={0.8}>
                <View style={styles.iconWrapper}>
                  <MaterialCommunityIcons
                    name="home-outline"
                    size={30}
                    color="#4A4A4A"
                  />
                </View>
                <Text style={styles.menuText}>Home</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate('Pages')}
                activeOpacity={0.8}>
                <View style={styles.iconWrapper}>
                  <MaterialCommunityIcons
                    name="file-document-outline"
                    size={30}
                    color="#4A4A4A"
                  />
                  <Badge style={styles.badge}>3</Badge>
                </View>
                <Text style={styles.menuText}>Pages</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate('Groups')}
                activeOpacity={0.8}>
                <View style={styles.iconWrapper}>
                  <MaterialCommunityIcons
                    name="account-group-outline"
                    size={30}
                    color="#4A4A4A"
                  />
                  <Badge style={styles.badge}>5</Badge>
                </View>
                <Text style={styles.menuText}>Groups</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Menu2 */}

          <View>
            <TouchableOpacity style={[styles.menuItem2]}>
              <MaterialCommunityIcons
                name="account-group-outline"
                size={30}
                color="#4A4A4A"
              />
              <Text style={styles.menuText}>Groups</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.menuItem2]}>
              <MaterialCommunityIcons
                name="account-group-outline"
                size={30}
                color="#4A4A4A"
              />
              <Text style={styles.menuText}>Groups</Text>
            </TouchableOpacity>
          </View>

          {/* Logout */}

          <View
            onLayout={handleLayout}
            style={[
              styles.menuItem2,
              {
                width: 'auto',
                paddingHorizontal: 15,
                backgroundColor: '#e1eded',
                elevation: 0,
                marginTop:15
              },
            ]}>
            <MaterialCommunityIcons name="logout" size={30} color="#4A4A4A" />
            <Text style={styles.menuText}>Logout</Text>
          </View>
        </Animated.View>
      </ScrollView>
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
    paddingBottom: 20,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    backgroundColor: '#007BFF',

    borderBottomColor: '#E0E0E0',
    borderEndEndRadius: 0,
    borderStartEndRadius: 40,
    overflow: 'hidden',
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
    width: (width - 50) / 2,
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
  menuItem2: {
    position: 'relative',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
    marginBottom: 8,
    gap: 10,
  },
  iconWrapper: {
    position: 'relative',
    marginBottom: 2,
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
