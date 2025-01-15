import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {Appbar, Button, Dialog, Paragraph, Portal} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import * as Keychain from 'react-native-keychain';
import {useLogOutUserMutation} from '../../services/userAuthApi';
import {setAuthenticated} from './HomeSlice';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootParamList} from '../../../RootNavigator';
import HadithStatus from '../../HadithStatus/HadithStatusBar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {RootState} from '../../app/store';
import BPost from '../BPost/BPost';

type HomeNavigationProps = NativeStackNavigationProp<
  RootParamList,
  'main'
>;

const {height} = Dimensions.get('window');

export default function Home() {
  const dispatch = useDispatch();
  const allDayHadith = useSelector(
    (state: RootState) => state.home.allDayHadith,
  );

  const navigation = useNavigation<HomeNavigationProps>();
  const appBarOffset = useSharedValue(0); // For AppBar movement
  const appBarOpacity = useSharedValue(1); // For AppBar fade effect
  const prevScrollY = useRef(0); // Previous scroll position tracker
  const isAppBarHidden = useRef(false); // AppBar visibility tracker
  const scrollThreshold = 10; // Smooth behavior threshold

  const appBarAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: appBarOffset.value}],
      opacity: appBarOpacity.value,
    };
  });

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    /*  console.log('currentScrollY' + currentScrollY);
    console.log('prevScrollY.current' + prevScrollY.current); */
    if (currentScrollY <= 100) {
      appBarOffset.value = withTiming(0, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      });

      appBarOpacity.value = withTiming(1, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      });
      isAppBarHidden.current = false;

      /*  hide */
    } else if (prevScrollY.current - currentScrollY > scrollThreshold) {
      if (isAppBarHidden.current) {
        appBarOffset.value = withTiming(0, {
          duration: 300,
          easing: Easing.inOut(Easing.ease),
        });
        appBarOpacity.value = withTiming(1, {
          duration: 300,
          easing: Easing.inOut(Easing.ease),
        });
        isAppBarHidden.current = false;
      }
    } else if (currentScrollY - prevScrollY.current > scrollThreshold) {
      if (!isAppBarHidden.current) {
        appBarOffset.value = withTiming(-100, {
          duration: 300,
          easing: Easing.inOut(Easing.ease),
        });
        appBarOpacity.value = withTiming(0, {
          duration: 300,
          easing: Easing.inOut(Easing.ease),
        });
        isAppBarHidden.current = true;
      }
    }

    prevScrollY.current = currentScrollY;
  };

  /* make status bar right */
  useFocusEffect(() => {
    StatusBar.setBarStyle('dark-content');
    StatusBar.setBackgroundColor('white');
  });

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Animated.View
        sharedTransitionTag="posted"
        style={[styles.appBar, appBarAnimatedStyle]}>
        <Appbar.Header style={styles.appBarHeader}>
          <Text style={styles.title}>aat</Text>
          <Appbar.Action
            icon={() => (
              <MaterialCommunityIcons
                name="plus-circle"
                size={24}
                color="black"
              />
            )}
            onPress={() => {}}
          />

          <Appbar.Action icon="magnify" color="black" onPress={() => {}} />
          <Appbar.Action
            icon="menu"
            color="black"
            onPress={() => navigation.navigate('menu')}
          />
        </Appbar.Header>
      </Animated.View>

      <Animated.ScrollView
        overScrollMode="never" // Disable overscroll effect on Android
        bounces={false} // Disable bounce effect on iOS
        onScroll={handleScroll}
        showsVerticalScrollIndicator={false} // Hides the vertical scrollbar
        scrollEventThrottle={16}>
        <View>
          <View style={{height: 70, backgroundColor: '#f9f9f9'}}></View>

          <HadithStatus />
          <BPost />
          <Text style={styles.content}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et maiores
          </Text>
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
    height: 70,
    zIndex: 1,
    backgroundColor: 'white',
    borderBottomColor: '#ddd',
    borderBottomWidth: StyleSheet.hairlineWidth,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,

    shadowOffset: {width: 0, height: 2},
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
