import React, {useState} from 'react';
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
  useGetRandomHadithQuery,
  useSetDayhadithMutation,
} from '../../services/hadithApi';
import {Snackbar} from 'react-native-paper';

const HadithBox = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState(''); // State for dynamic message

  const [addButtonDisabled, setAddButtonDisabled] = useState(false);
  const [refreshButtonDisable, setRefreshButtonDisabled] = useState(false);
  const [showJoinedGroups, setShowJoinedGroups] = useState(false);
  const [likeDetails, setLikeDetails] = useState([
    {
      user_fname: 'John',
      user_lname: 'Doe',
      identifier: 'johndoe',
      profile_picture: 'https://via.placeholder.com/40',
    },
    {
      user_fname: 'Jane',
      user_lname: 'Smith',
      identifier: 'janesmith',
      profile_picture: 'https://via.placeholder.com/40',
    },
  ]);

  const hadithDemo = {
    hadith:
      ' ’আলক্বামাহ ইবনু ওয়াক্কাস আল-লায়সী (রহ.) হতে বর্ণিত। আমি ’উমার ইবনুল খাত্তাব (রাঃ)-কে মিম্বারের উপর দাঁড়িয়ে বলতে শুনেছিঃ আমি আল্লাহর রাসূল সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম-কে বলতে শুনেছিঃ কাজ (এর প্রাপ্য হবে) নিয়্যাত অনুযায়ী। আর মানুষ তার নিয়্যাত অনুযায়ী প্রতিফল পাবে। তাই যার হিজরত হবে ইহকাল লাভের অথবা কোন মহিলাকে বিবাহ করার উদ্দেশে- তবে তার হিজরত সে উদ্দেশেই হবে, যে জন্যে, সে হিজরত করেছে।] (৫৪, ২৫২৯, ৩৮৯৮, ৫০৭০, ৬৬৮৯, ৬৯৫৩; মুসলিম ২৩/৪৫ হাঃ ১৯০৭, আহমাদ ১৬৮) ( আধুনিক প্রকাশনী- ১, ইসলামিক ফাউন্ডেশন ১)',
    book: 'Sahih Bukhari',
  };

  /*   const handleAddButtonClick = () => {
    if (addButtonDisabled) return;
    setAddButtonDisabled(true);
    setTimeout(() => {
      Alert.alert('Success', 'Hadith added as your Day Hadith successfully!');
    }, 500);
  };
 */
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
        console.log(res.data);
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

  const handleHeartClick = () => {
    setShowJoinedGroups(!showJoinedGroups);
  };

  const handleRefetchClick = () => {
    setAddButtonDisabled(false); // Disable the button after clicking

    refetch();
  };

  const handleGoBack = () => {};

  return (
    <View style={styles.hadithBox}>
      {/* Header Section */}
      <View style={styles.hadithHead}>
        <TouchableOpacity
          style={[styles.btnAdd, addButtonDisabled ? styles.btnSuccess : null]}
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

        <TouchableOpacity
          disabled={isFetching}
          onPress={handleRefetchClick}
          style={styles.refreshButton}>
          <Icon name="sync-alt" size={18} color="#274a65" />
        </TouchableOpacity>
      </View>

      {/* Content Section */}
      <View
        style={[
          styles.cardBody,
          showJoinedGroups ? styles.cardBodyWhite : styles.cardBodyLight,
        ]}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false} // Hides the vertical scrollbar
          showsHorizontalScrollIndicator={false} // Hides the horizontal scrollbar (optional)
        >
          {showJoinedGroups ? (
            <>
              <Text style={styles.likesText}>
                <Text style={styles.boldText}>
                  You have {likeDetails.length}
                </Text>{' '}
                <Icon name="heart" size={18} color="#e63946" />
              </Text>
              {likeDetails.map((like, index) => (
                <View key={index} style={styles.userItem}>
                  <Image
                    source={{uri: like.profile_picture}}
                    style={styles.userImage}
                  />
                  <Text style={styles.userName}>
                    {like.user_fname} {like.user_lname}
                  </Text>
                </View>
              ))}
            </>
          ) : (
            <Text style={styles.cardText}>{hadith?.data?.hadith}</Text>
          )}
        </ScrollView>
      </View>

      {/* Go Back Button */}
      <View style={styles.goBackContainer}>
        <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
          <Icon name="arrow-left" size={20} color="#fff" />
          <Text style={styles.goBackText}>Go Back</Text>
        </TouchableOpacity>
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
    padding: 10,
  },
  hadithHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    padding: 8,
  },
  cardBody: {
    marginTop: 15,
    borderRadius: 10,
    padding: 15,
  },
  cardBodyWhite: {
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
    paddingVertical: 15,
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
