import React, {useState} from 'react';
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
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootParamList } from '../../RootNavigator';
import { useNavigation } from '@react-navigation/native';

type  HadithProp=NativeStackNavigationProp<RootParamList,'hadithContent'>;


// Define the interface for each item in the demoData array
interface HadithData {
  id: number;
  userFname: string;
  userLname: string;
  Identifier: string;
  profile_picture: string;
  hadith: string;
  loveReactions: number;
}

const demoData: HadithData[] = [
  {
    id: 1,
    userFname: 'John',
    userLname: 'Doe',
    Identifier: 'john_doe',
    profile_picture:
      'https://wallpapers.com/images/hd/gallant-roman-reigns-mka85s1lh2ns81kx.jpg',
    hadith: 'ফির্কার লোকেরা ইজমা‘ ও কিয়াসকে ওয়াহীর আসনে বসিয়েছে এবং বলে থাকেঃ শারী‘আহ্‌র ভিত্তি চারটি বিষয়ের উপর। কুরআন, সুন্নাহ, ইজমা‘ ও কিয়াস। বড় আশ্চর্যের বিষয় এই যে, সহাবায়ে কেরাম যাদের উপর আল্লাহ তা‘আলা তার সন্তুষ্টির ঘোষণা দিয়েছেন, তাদেরকে সত্যবাদী বলে স্বীকৃতি দেয়া হয়েছে এবং মুসলিম উম্মাহ এ ব্যাপারে সকলেই একমত। অথচ তারা সহাবায়ে কেরামকে দু’ ভাগে ভাগ করেছেন। (১) ফকীহ (২) গাইরে ফকীহ। আর বলেছেন যে সকল সাহাবী ফকীহ ছিলেন তারা যদি কিয়াসের বিপরীতে হাদীস বর্ণনা করেন তবে তা গ্রহণযোগ্য কিন্তু যে সকল সাহাবী গাইরে ফকীহ অর্থাৎ ফকীহ নন তাঁরা যদি কিয়াসের খেলাফ হাদীস বর্ণনা করেন তাহলে তা গ্রহণযো',
    loveReactions: 5,
  },
  {
    id: 2,
    userFname: 'Jane',
    userLname: 'Smith',
    Identifier: 'jane_smith',
    profile_picture:
      'https://i.ebayimg.com/images/g/xXQAAOSwh0ldgdY-/s-l1200.jpg',
    hadith:
      '’আলক্বামাহ ইবনু ওয়াক্কাস আল-লায়সী (রহ.) হতে বর্ণিত। আমি ’উমার ইবনুল খাত্তাব (রাঃ)-কে মিম্বারের উপর দাঁড়িয়ে বলতে শুনেছিঃ আমি আল্লাহর রাসূল সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম-কে বলতে শুনেছিঃ কাজ (এর প্রাপ্য হবে) নিয়্যাত অনুযায়ী। আর মানুষ তার নিয়্যাত অনুযায়ী প্রতিফল পাবে। তাই যার হিজরত হবে ইহকাল লাভের অথবা কোন মহিলাকে বিবাহ করার উদ্দেশে- তবে তার হিজরত সে উদ্দেশেই হবে, যে জন্যে, সে হিজরত করেছে।] (৫৪, ২৫২৯, ৩৮৯৮, ৫০৭০, ৬৬৮৯, ৬৯৫৩; মুসলিম ২৩/৪৫ হাঃ ১৯০৭, আহমাদ ১৬৮) ( আধুনিক প্রকাশনী- ১, ইসলামিক ফাউন্ডেশন ১) কিন্তু বাতিল ফির্কার লোকেরা ইজমা‘ ও কিয়াসকে ওয়াহীর আসনে বসিয়েছে এবং বলে থাকেঃ শারী‘আহ্‌র ভিত্তি চারটি বিষয়ের উপর। কুরআন, সুন্নাহ, ইজমা‘ ও কিয়াস। বড় আশ্চর্যের বিষয় এই যে, সহাবায়ে কেরাম যাদের উপর আল্লাহ তা‘আলা তার ',
    loveReactions: 3,
  },
  {
    id: 3,
    userFname: 'Ali',
    userLname: 'Khan',
    Identifier: 'ali_khan',
    profile_picture:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTM1Q4yaQHkUCvG4FrN3eUPkDqXvbAZDpCeA&s',
       hadith:
      '’আলক্বামাহ ইবনু ওয়াক্কাস আল-লায়সী (রহ.) হতে বর্ণিত। আমি ’উমার ইবনুল খাত্তাব (রাঃ)-কে মিম্বারের উপর দাঁড়িয়ে বলতে শুনেছিঃ আমি আল্লাহর রাসূল সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম-কে বলতে শুনেছিঃ কাজ (এর প্রাপ্য হবে) নিয়্যাত',
    loveReactions: 8,
  },
];

export default function HadithDayContent() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasReacted, setHasReacted] = useState(false); // Track if the user has reacted
  const heartScale = useSharedValue(1); // Shared value for scaling the heart icon
const navigation=useNavigation<HadithProp>();
  const handleNavigation = (direction: 'previous' | 'next') => {
    if (direction === 'previous' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (direction === 'next' && currentIndex < demoData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleLoveReaction = () => {
    if (!hasReacted) {
      demoData[currentIndex].loveReactions += 1;
      setHasReacted(true); // Set that the user has reacted
      heartScale.value = withSpring(1.5, {damping: 2, stiffness: 150}); // Animate heart scale on press
      setTimeout(() => {
        heartScale.value = withSpring(1); // Return to normal size after the animation
      }, 300);
    }
  };

  const animatedHeartStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: heartScale.value}],
    };
  });

  const currentHadith = demoData[currentIndex];

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Appbar.BackAction onPress={() => {navigation.goBack()}} />
        <Image
          source={{uri: currentHadith.profile_picture}}
          style={styles.profilePicture}
        />
        <View style={styles.userInfo}>
          <Text numberOfLines={1} style={styles.userName}>
            {currentHadith.userFname} {currentHadith.userLname}
          </Text>
          <Text  numberOfLines={1} style={styles.identifier}>@{currentHadith.Identifier}</Text>
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
            <Text style={styles.hadithText}>{currentHadith.hadith}</Text>
          </View>

          {/* Love Reaction Section */}
          <View style={styles.reactionContainer}>
            <TouchableOpacity onPress={handleLoveReaction}>
              <Animated.View style={animatedHeartStyle}>
                <Text>
                  <MaterialCommunityIcons
                    name="heart"
                    size={30}
                    color={hasReacted ? 'red' : '#888'}
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
    paddingVertical:16
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft:5
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
