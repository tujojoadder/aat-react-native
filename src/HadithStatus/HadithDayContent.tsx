import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Appbar} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'; // Import Reanimated hooks
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {RootParamList} from '../../RootNavigator';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../app/store';
import {useLikeDayHadithMutation} from '../services/hadithApi';
import {setIsLiked} from '../features/Home/HomeSlice';

type HadithProp = NativeStackScreenProps<RootParamList, 'hadithContent'>;

// Define the interface for each item in the allDayHadith array
interface HadithData {
  id: number;
  userFname: string;
  userLname: string;
  Identifier: string;
  profile_picture: string;
  hadith: string;
  loveReactions: number;
}

export default function HadithDayContent({navigation, route}: HadithProp) {
  const {serialNumber} = route.params;
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasReacted, setHasReacted] = useState(false); // Track if the user has reacted
  const heartScale = useSharedValue(1); // Shared value for scaling the heart icon
  const allDayHadith = useSelector(
    (state: RootState) => state.home.allDayHadith,
  );
  // Set currentIndex based on route.serialNumber and redux state serialNumber
  useEffect(() => {
    if (serialNumber && allDayHadith.length > 0) {
      const index = allDayHadith.findIndex(
        hadith => hadith.serialNumber === serialNumber,
      );
      if (index !== -1) {
        setCurrentIndex(index);
      }
    }
  }, [serialNumber]);


  /* handle left right pressing */
  const handleNavigation = (direction: 'previous' | 'next') => {
    if (direction === 'previous' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (direction === 'next') {
      if (currentIndex < allDayHadith.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        // If no more Hadiths, navigate back
        navigation.goBack();
      }
    }
  };

  /* if allDayHadith not setted then navigate to home screen */
  useEffect(() => {
    if (!allDayHadith || allDayHadith.length === 0) {
      navigation.navigate('main'); // Replace 'Home' with your home screen route name
    }
  }, [allDayHadith, navigation]);

/* style of animated love */
  const animatedHeartStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: heartScale.value}],
    };
  });
/* track current hadith  */
  const currentHadith = allDayHadith[currentIndex];

  useEffect(() => {
    // Check if hadith alredy liked
    if (currentHadith) {
      if (currentHadith.day_hadith.isLiked) {
        setHasReacted(true); // Set hasReacted to true if userFname is 'sompa'
      } else {
        setHasReacted(false); // Otherwise, set it to false
      }
    }
  }, [currentHadith]); // This effect runs every time the currentHadith changes


  /* Send request for reacting hadith */
  const [
    LikeDayHadithMutation,
    {
      isSuccess: LikeDayHadithMutationSucess,
      isLoading: LikeDayHadithMutationLoading,
      isError: LikeDayHadithMutationError,
    },
  ] = useLikeDayHadithMutation();

  const likeClickHandle = async () => {
    setHasReacted(true);

    try {

      /* controller will check day_hadith_id as parameter name */
      const res = await LikeDayHadithMutation({
        day_hadith_id: currentHadith.day_hadith.day_hadith_id,
      });

      if (res.data) {
        dispatch(setIsLiked({index: serialNumber}));
      } else if (res.error) {
        console.log(res.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Image
          source={{
            uri: `${process.env.REACT_APP_LARAVEL_URL}/${currentHadith.profile_picture}`,
          }}
          style={styles.profilePicture}
        />
        <View style={styles.userInfo}>
          <Text numberOfLines={1} style={styles.userName}>
            {currentHadith.user_fname} {currentHadith.user_lname}
          </Text>
          <Text numberOfLines={1} style={styles.identifier}>
            @{currentHadith.identifier}
          </Text>
        </View>
      </View>

      {/* Content Section */}

      <View style={styles.contentContainer}>
        {/* Left Tap Zone */}
        <TouchableWithoutFeedback onPress={() => handleNavigation('previous')}>
          <View style={styles.leftTapZone} />
        </TouchableWithoutFeedback>

        {/* Scrollable Content */}
        <ScrollView
          showsVerticalScrollIndicator={false} // Hides the vertical scrollbar
          showsHorizontalScrollIndicator={false} // Hides the horizontal scrollbar (optional)
          contentContainerStyle={styles.scrollContent}>
          <View style={styles.hadithContainer}>
            <Text style={styles.hadithText}>
              {currentHadith.day_hadith.hadith.hadith}
            </Text>
          </View>

          {/* Love Reaction Section */}
          <View style={styles.reactionContainer}>
            <TouchableOpacity onPress={likeClickHandle}>
              <Animated.View style={animatedHeartStyle}>
                <Text>
                  <MaterialCommunityIcons
                    name="heart"
                    size={30}
                    color={hasReacted ? 'red' : '#999'}
                  />{' '}
                  {/* Animated heart icon */}
                </Text>
              </Animated.View>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Right Tap Zone */}
        <TouchableWithoutFeedback onPress={() => handleNavigation('next')}>
          <View style={styles.rightTapZone} />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#fff',
    paddingVertical: 16,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 5,
  },
  userInfo: {
    marginLeft: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  identifier: {
    fontSize: 14,
    color: '#888',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    position: 'relative',
  },
  leftTapZone: {
    position: 'absolute',
    width: '15%',
    height: '100%',
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hadithContainer: {
    paddingHorizontal: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hadithText: {
    fontSize: 18,

    textAlign: 'center',
  },
  rightTapZone: {
    position: 'absolute',
    right: 0,
    width: '20%',
    height: '100%',
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  reactionContainer: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 45,
  },
  reactionCount: {
    fontSize: 16,
    color: '#888',
    marginLeft: 8,
  },
});
