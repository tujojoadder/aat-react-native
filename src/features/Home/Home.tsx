import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Animated,
  StyleSheet,
  StatusBar,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Easing,
} from 'react-native';
import { Appbar, Button, Dialog, Paragraph, Portal } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import * as Keychain from 'react-native-keychain';
import { useLogOutUserMutation } from '../../services/userAuthApi';
import { setAuthenticated } from './HomeSlice';

const { height } = Dimensions.get('window');

export default function Home() {
  
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const prevScrollY = useRef(0); // Previous scroll position tracker
  const appBarOffset = useRef(new Animated.Value(0)).current; // For AppBar movement
  const appBarOpacity = useRef(new Animated.Value(1)).current; // For AppBar fade effect
  const isAppBarHidden = useRef(false); // AppBar visibility tracker
  const scrollThreshold = 10; // Smooth behavior threshold

  // Scroll handler
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;

    // Show AppBar when near the top
    if (currentScrollY <= 100) {
      Animated.parallel([
        Animated.timing(appBarOffset, {
          toValue: 0, // Reset position
          duration: 300,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(appBarOpacity, {
          toValue: 1, // Fully visible
          duration: 300,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
      isAppBarHidden.current = false;
    } else if (currentScrollY - prevScrollY.current > scrollThreshold) {
      // Scrolling down
      if (!isAppBarHidden.current) {
        Animated.parallel([
          Animated.timing(appBarOffset, {
            toValue: -100, // Move AppBar up
            duration: 300,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(appBarOpacity, {
            toValue: 0, // Fade out
            duration: 300,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]).start();
        isAppBarHidden.current = true;
      }
    } else if (prevScrollY.current - currentScrollY > scrollThreshold) {
      // Scrolling up
      if (isAppBarHidden.current) {
        Animated.parallel([
          Animated.timing(appBarOffset, {
            toValue: 0, // Bring AppBar back
            duration: 300,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(appBarOpacity, {
            toValue: 1, // Fade in
            duration: 300,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]).start();
        isAppBarHidden.current = false;
      }
    }

    prevScrollY.current = currentScrollY;
  };










  const [logOutUser, {isLoading, isSuccess, isError, error}] =
    useLogOutUserMutation();

  const [visible, setVisible] = useState(false); // State for dialog visibility

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const handleLogout = async () => {
    try {
      const data = await logOutUser().unwrap();

      // If logout was successful, clear stored credentials
      await handlePostLogoutActions();
    } catch (error) {
      console.log('Error during logout:', error);
    }
  };

  const handlePostLogoutActions = async () => {
    try {
      await GoogleSignin.signOut();
      const success = await Keychain.resetGenericPassword(); // Deletes the credentials
      if (success) {
        dispatch(setAuthenticated(false)); // Update Redux state
      } else {
        console.log('Failed to delete the token');
      }
    } catch (error) {
      console.error('Error deleting the token:', error);
    }
  };

  // Use `useEffect` to handle side effects after a successful logout
  useEffect(() => {
    if (isSuccess) {
      handlePostLogoutActions();
    }
  }, [isSuccess]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar backgroundColor="white" barStyle="dark-content" translucent />

      {/* Animated AppBar */}
      <Animated.View
        style={[
          styles.appBar,
          {
            transform: [{ translateY: appBarOffset }],
            opacity: appBarOpacity,
          },
        ]}
      >
        <Appbar.Header style={styles.appBarHeader}>
          <Text style={styles.title}>aat</Text>
          <Appbar.Action icon="magnify" color="black" onPress={() => {}} />
          <Appbar.Action icon="bell-outline" color="black" onPress={() => {}} />
        </Appbar.Header>
      </Animated.View>

      {/* Scrollable Content */}
      <Animated.ScrollView
        contentContainerStyle={{ paddingTop: 100 }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View >

        


          <Text style={styles.content}>
     Lorem ipsum dolor sit amet consectetur adipisicing elit. Et maiores facere reprehenderit debitis fuga, numquam molestiae. Eos maxime dolore obcaecati cumque quisquam voluptatem blanditiis! Explicabo recusandae earum aperiam eos quae dignissimos odit illum quis exercitationem corrupti laudantium, autem sint blanditiis, optio ab dolores reprehenderit voluptas odio doloribus aliquam porro. Consequuntur quo id dolores sunt earum quas porro veritatis in numquam? Quidem neque maxime quae eos ullam praesentium vitae sint aut iste velit soluta quam voluptas eius hic vero tempore temporibus fugit voluptatum veniam cum minus, omnis ab provident illo. Soluta mollitia similique esse blanditiis quidem quos harum nisi. Iste perspiciatis fugit, deserunt ut temporibus officiis assumenda harum facere quod. Architecto a ratione quasi sunt quod. Libero neque odio atque. Laudantium, saepe voluptatibus harum, eius, quidem alias ullam error? Velit in explicabo veniam sapiente blanditiis. Porro dolorum amet iure officiis, app bar behavior.
          </Text>
          <Button mode="outlined"  onPress={showDialog}>Delete</Button>

{/* Dialog for confirmation */}
<Portal>
  <Dialog visible={visible} onDismiss={hideDialog}>
    <Dialog.Title>Confirm Logout</Dialog.Title>
    <Dialog.Content>
      <Paragraph>Are you sure you want to logout?</Paragraph>
    </Dialog.Content>
    <Dialog.Actions>
      <Button onPress={hideDialog}>Cancel</Button>
      <Button
        onPress={() => {
          handleLogout();
          hideDialog();
        }}>
        Logout
      </Button>
    </Dialog.Actions>
  </Dialog>
</Portal>

        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    zIndex: 1,
    backgroundColor: 'white',
    borderBottomColor: '#ddd',
    borderBottomWidth: StyleSheet.hairlineWidth,
    elevation: 4, // For Android shadow
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  appBarHeader: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: '100%',
  },
  title: {
    flex: 1,
    color: '#007BFF',
    fontSize: 28,
    fontWeight: '700',
  },
  content: {
    fontSize: 28,
    padding: 16,
    textAlign: 'left',
    lineHeight: 28,
  },
});
