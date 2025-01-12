import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const HadithBox = () => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [showJoinedGroups, setShowJoinedGroups] = useState(false);
  const [likeDetails, setLikeDetails] = useState([
    {
      user_fname: "John",
      user_lname: "Doe",
      identifier: "johndoe",
      profile_picture: "https://via.placeholder.com/40",
    },
    {
      user_fname: "Jane",
      user_lname: "Smith",
      identifier: "janesmith",
      profile_picture: "https://via.placeholder.com/40",
    },
  ]);

  const hadithDemo = {
    hadith: " ’আলক্বামাহ ইবনু ওয়াক্কাস আল-লায়সী (রহ.) হতে বর্ণিত। আমি ’উমার ইবনুল খাত্তাব (রাঃ)-কে মিম্বারের উপর দাঁড়িয়ে বলতে শুনেছিঃ আমি আল্লাহর রাসূল সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম-কে বলতে শুনেছিঃ কাজ (এর প্রাপ্য হবে) নিয়্যাত অনুযায়ী। আর মানুষ তার নিয়্যাত অনুযায়ী প্রতিফল পাবে। তাই যার হিজরত হবে ইহকাল লাভের অথবা কোন মহিলাকে বিবাহ করার উদ্দেশে- তবে তার হিজরত সে উদ্দেশেই হবে, যে জন্যে, সে হিজরত করেছে।] (৫৪, ২৫২৯, ৩৮৯৮, ৫০৭০, ৬৬৮৯, ৬৯৫৩; মুসলিম ২৩/৪৫ হাঃ ১৯০৭, আহমাদ ১৬৮) ( আধুনিক প্রকাশনী- ১, ইসলামিক ফাউন্ডেশন ১)",
    book: "Sahih Bukhari",
  };

  const handleAddButtonClick = () => {
    if (buttonDisabled) return;
    setButtonDisabled(true);
    setTimeout(() => {
      Alert.alert("Success", "Hadith added as your Day Hadith successfully!");
    }, 500);
  };

  const handleHeartClick = () => {
    setShowJoinedGroups(!showJoinedGroups);
  };

  const handleGoBack = () => {
    
  };

  return (
    <View style={styles.hadithBox}>
      {/* Header Section */}
      <View style={styles.hadithHead}>
        <TouchableOpacity
          style={[styles.btnAdd, buttonDisabled ? styles.btnSuccess : null]}
          onPress={handleAddButtonClick}
          disabled={buttonDisabled}
        >
          <Icon
            name={buttonDisabled ? "check" : "plus"}
            size={16}
            color="#fff"
          />
          <Text style={styles.addText}>
            {buttonDisabled ? "Added" : "Add Day"}
          </Text>
        </TouchableOpacity>

        <View style={styles.hadithInfo}>
          <TouchableOpacity
            onPress={handleHeartClick}
            style={styles.heartButton}
          >
            <Icon
              name="heart"
              size={24}
              color={showJoinedGroups ? "#e63946" : "#274a65"}
            />
          </TouchableOpacity>
          <View style={styles.hadithType}>
            <Icon name="book-open" size={18} style={styles.bookIcon} />
            <Text style={styles.bookText}>{hadithDemo.book}</Text>
          </View>
        </View>

        <TouchableOpacity onPress={() => {}} style={styles.refreshButton}>
          <Icon name="sync-alt" size={18} color="#274a65" />
        </TouchableOpacity>
      </View>

      {/* Content Section */}
      <View
        style={[
          styles.cardBody,
          showJoinedGroups ? styles.cardBodyWhite : styles.cardBodyLight,
        ]}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {showJoinedGroups ? (
            <>
              <Text style={styles.likesText}>
                <Text style={styles.boldText}>You have {likeDetails.length}</Text>{" "}
                <Icon name="heart" size={18} color="#e63946" />
              </Text>
              {likeDetails.map((like, index) => (
                <View key={index} style={styles.userItem}>
                  <Image
                    source={{ uri: like.profile_picture }}
                    style={styles.userImage}
                  />
                  <Text style={styles.userName}>
                    {like.user_fname} {like.user_lname}
                  </Text>
                </View>
              ))}
            </>
          ) : (
            <Text style={styles.cardText}>{hadithDemo.hadith}</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  hadithBox: {
    backgroundColor: "#fff",
    flex: 1,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    padding: 10,
  },
  hadithHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnAdd: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#274a65",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 30,
  },
  btnSuccess: {
    backgroundColor: "#28a745",
  },
  addText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "bold",
  },
  hadithInfo: {
    flex: 1,
    alignItems: "center",
  },
  heartButton: {},
  hadithType: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  bookIcon: {
    marginRight: 5,
    color: "#274a65",
  },
  bookText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
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
    backgroundColor: "#f9f9f9",
  },
  cardBodyLight: {
    backgroundColor: "#f0f8ff",
  },
  scrollContent: {
    flexGrow: 1,
  },
  cardText: {
    fontSize: 18,
    lineHeight: 28,
    textAlign: "center",
    color: "#444",
  },
  likesText: {
    marginBottom: 15,
    fontSize: 16,
    color: "#444",
  },
  boldText: {
    fontWeight: "bold",
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
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
    color: "#333",
  },
  goBackContainer: {
    paddingVertical: 15,
    alignItems: "center",
  },
  goBackButton: {
    backgroundColor: "#274a65",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  goBackText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 14,
  },
});

export default HadithBox;
