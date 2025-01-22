import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  useDayHadithDetailsMutation,
  useGetRandomHadithQuery,
  useSetDayhadithMutation,
} from '../../services/hadithApi';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Snackbar} from 'react-native-paper';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootParamList} from '../../../RootNavigator';
import {useNavigation} from '@react-navigation/native';
type User = {
  identifier: string;
  profile_picture: string;
  user_fname: string;
  user_id: string;
  user_lname: string;
};

type LikeDetail = {
  created_at: string | null;
  day_hadith_id: string;
  day_likes_id: string;
  updated_at: string | null;
  user: User;
  user_id: string;
};

type LikeDetailsResponse = LikeDetail[];
type HadithBoxNavigationProps = NativeStackNavigationProp<
  RootParamList,
  'main'
>;

const HadithBox = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState(''); // State for dynamic message
  const [likeDetails, setLikeDetails] = useState<LikeDetailsResponse>([]);
  const [addButtonDisabled, setAddButtonDisabled] = useState(false);
  const [refreshButtonDisable, setRefreshButtonDisabled] = useState(false);
  const [showJoinedGroups, setShowJoinedGroups] = useState(false);


  const navigation = useNavigation<HadithBoxNavigationProps>();

  const heartScale = useSharedValue(0); // Initial scale value

  useEffect(() => {
    // Start the scale animation when the component mounts
    if (showJoinedGroups) {
      heartScale.value = withSpring(1);
    }
  }, [showJoinedGroups]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: heartScale.value}],
  }));
  const {
    data: hadith,
    isFetching,
    isError,
    refetch,
  } = useGetRandomHadithQuery();

  const [
    setDayHadith,
    {
      isSuccess: setDayHadithSuccess,
      isLoading: setDayHadithLoading,
      isError: setDayHadithError,
    },
  ] = useSetDayhadithMutation();

  const [
    DayHadithDetailsMutation,
    {
      isSuccess: DayHadithDetailsMutationSucess,
      isLoading: DayHadithDetailsMutationLoading,
      isError: DayHadithDetailsMutationError,
    },
  ] = useDayHadithDetailsMutation();
  const handleAddButtonClick = async () => {
    if (isFetching || setDayHadithLoading || !hadith?.data?.hadith_id) {
      // Avoid making the call if still fetching or if hadith_id is undefined
      return;
    }

    try {
      const res = await setDayHadith({hadith_id: hadith.data.hadith_id});

      if (res.data) {
        setAddButtonDisabled(true); // Disable the button after clicking
        onToggleSnackBar('Day hadith added sucessfully');
      } else if (res.error) {
        onToggleSnackBar('plz try again');
      }
    } catch (error) {
      onToggleSnackBar('plz try again');
    }
  };

  // Function to show the snackbar with a custom message
  // Function to show snackbar with dynamic message
  const onToggleSnackBar = (message: string) => {
    setMessage(message); // Set the custom message passed as an argument
    setVisible(true); // Show the Snackbar

    // After 2 seconds, hide the snackbar automatically
    setTimeout(() => {
      setVisible(false);
    }, 2000);
  };

  const handleHeartClick = async () => {
    setShowJoinedGroups(!showJoinedGroups);
    try {
      const res = await DayHadithDetailsMutation();

      if (res.data) {
        setLikeDetails(
          res.data.message.length > 0 ? res.data.message[0].likes : [], // Remove the outer array wrapping
        );
      } else if (res.error) {
      }
    } catch (error) {}
  };

  const handleRefetchClick = () => {
    if (isFetching) return;
    setAddButtonDisabled(false); // Disable the button after clicking

    refetch();
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.hadithBox}>
      {/* Header Section */}

      <View style={styles.hadithHead}>
        {!showJoinedGroups ? (
          <TouchableOpacity
            style={[
              styles.btnAdd,
              addButtonDisabled ? styles.btnSuccess : null,
            ]}
            onPress={handleAddButtonClick}
            disabled={addButtonDisabled}>
            <Icon
              name={addButtonDisabled ? 'check' : 'plus'}
              size={16}
              color="#fff"
            />
            <Text style={styles.addText}>
              {addButtonDisabled ? 'Added' : 'Add Day'}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.btnAdd, {backgroundColor: 'white'}]}
            onPress={() => setShowJoinedGroups(false)}>
            <Icon name="arrow-left" size={16} color="black" />
            <Text style={[styles.addText, {color: 'black', fontSize: 17.5}]}>
              Back
            </Text>
          </TouchableOpacity>
        )}

        <View style={styles.hadithInfo}>
          <TouchableOpacity
            onPress={handleHeartClick}
            style={styles.heartButton}>
            <Icon
              name="heart"
              size={24}
              color={showJoinedGroups ? '#e63946' : '#274a65'}
            />
          </TouchableOpacity>
          <View style={styles.hadithType}>
            <Icon name="book-open" size={18} style={styles.bookIcon} />
            <Text style={styles.bookText}>{hadith?.data.book}</Text>
          </View>
        </View>
        {!showJoinedGroups && (
          <TouchableOpacity
            disabled={isFetching}
            onPress={handleRefetchClick}
            style={styles.refreshButton}>
            <Icon name="sync-alt" size={18} color="#274a65" />
          </TouchableOpacity>
        )}
      </View>

      {/* Content Section */}
      <View
        style={[
          styles.cardBody,
          showJoinedGroups ? styles.cardBodyWhite : styles.cardBodyLight,
        ]}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {showJoinedGroups ? (
            <>
              <Text style={styles.likesText}>
                <Text style={styles.boldText}>
                  You have {likeDetails.length}
                </Text>{' '}
                {/* Example Animated Heart Icon */}
                <Animated.View style={animatedStyle}>
                  <MaterialCommunityIcons name="heart" size={26} color="red" />
                </Animated.View>
              </Text>

              {likeDetails.map((like, index) => (
                <View key={index} style={styles.userItem}>
                  <Image
                    source={{
                      uri: `${process.env.REACT_APP_LARAVEL_URL}/${like.user.profile_picture}`,
                    }}
                    style={styles.userImage}
                  />
                  <Text style={styles.userName}>
                    {like.user.user_fname} {like.user.user_lname}
                  </Text>
                </View>
              ))}
            </>
          ) : (
            <Text style={styles.cardText}>{hadith?.data?.hadith}</Text>
          )}

          {/* Go Back Button */}
          {!showJoinedGroups && (
            <View style={styles.goBackContainer}>
              <TouchableOpacity
                style={styles.goBackButton}
                onPress={handleGoBack}>
                <Icon name="arrow-left" size={20} color="#fff" />
                <Text style={styles.goBackText}>Go Back</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>

      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={2000} // Optional, in case you want to set duration for automatic hiding
      >
        {message}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  hadithBox: {
    backgroundColor: '#fff',
    flex: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  hadithHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 7,
    paddingTop: 5,
    borderBottomColor: '#274a65',
    borderBottomWidth: 1.5,
  },
  btnAdd: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#274a65',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 30,
  },
  btnSuccess: {
    backgroundColor: '#28a745',
  },
  addText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 14,
    fontWeight: 'bold',
  },
  hadithInfo: {
    flex: 1,
    alignItems: 'center',
  },
  heartButton: {},
  hadithType: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  bookIcon: {
    marginRight: 5,
    color: '#274a65',
  },
  bookText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  refreshButton: {
    padding: 12,
  },
  cardBody: {
    borderRadius: 10,
    padding: 15,
  },
  cardBodyWhite: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  cardBodyLight: {},
  scrollContent: {
    flexGrow: 1,
  },
  cardText: {
    fontSize: 18,
    lineHeight: 28,
    textAlign: 'center',
    color: '#444',
  },
  likesText: {
    marginBottom: 15,
    fontSize: 16,
    color: '#444',
  },
  boldText: {
    fontWeight: 'bold',
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  userName: {
    fontSize: 16,
    color: '#333',
  },
  goBackContainer: {
    marginBottom: 100,
    marginTop: 20,
    alignItems: 'center',
  },
  goBackButton: {
    backgroundColor: '#274a65',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  goBackText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 14,
  },
});

export default HadithBox;
