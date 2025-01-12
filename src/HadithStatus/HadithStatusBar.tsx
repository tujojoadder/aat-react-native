import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {Avatar, Text} from 'react-native-paper';
import {RootParamList} from '../../RootNavigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
type HadithProp = NativeStackNavigationProp<RootParamList, 'hadithContent'>;

const demoData = [
  {
    id: 1,
    name: 'Turjo joadder',
    hadith: 'বিপরীতে হিত ; প্রথমে খারাপ হিসেবে মনে হলেও পরবর্তীতে ভালো হয় ',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'User 2',
    hadith:
      '“Do not waste water, even if performing ablution on the banks of a fast-flowing river.”',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    name: 'User 3',
    hadith: '“The best of you are those who learn the Quran and teach it.”',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 4,
    name: 'User 4',
    hadith:
      '“God does not look at your forms and possessions but He looks at your hearts and deeds.”',
    image: 'https://via.placeholder.com/150',
  },
];

export default function HadithStatusBar() {
  const navigation = useNavigation<HadithProp>(); // Use the correct type

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}>
        {/* Create Component */}
        <TouchableOpacity style={styles.createCard}>
          <Avatar.Icon size={40} icon="plus" style={styles.createIcon} />
          <Text style={[styles.createText, {fontSize: 17}]}>Add</Text>
          <Text style={styles.createText}>Day Hadith</Text>
        </TouchableOpacity>

        {/* User Hadith Cards */}
        {demoData.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.hadithCard}
            onPress={() => {
              navigation.navigate('hadithContent');
            }}>
            <ImageBackground
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTM1Q4yaQHkUCvG4FrN3eUPkDqXvbAZDpCeA&s',
              }}
              resizeMode="cover"
              style={styles.cardBackground}
              imageStyle={{borderTopLeftRadius: 15, borderTopRightRadius: 15}}>
              <View style={styles.overlay}></View>
            </ImageBackground>
            <View style={styles.cardContent}>
              <Text numberOfLines={1} style={styles.cardName}>
                {item.name}
              </Text>
              <Text numberOfLines={2} style={styles.cardHadith}>
                {item.hadith}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    paddingVertical: 15,
  },
  scrollViewContent: {
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  createCard: {
    width: 110,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e0f7fa',
    borderRadius: 15,
    marginRight: 15,
    elevation: 3, // Shadow for modern look
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  createIcon: {
    backgroundColor: '#00796b',
  },
  createText: {
    marginTop: 5,
    fontSize: 14,
    color: '#00796b',
    fontWeight: 'bold',
  },
  hadithCard: {
    width: 140,
    height: 185,
    borderRadius: 15,

    overflow: 'hidden',
    marginRight: 15,
    elevation: 1, // Modern shadow
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  cardBackground: {
    height: 100,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cardContent: {
    padding: 10,
    backgroundColor: '#e0f7fa',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  cardName: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 15,
    paddingBottom: 5,
  },
  cardHadith: {
    paddingTop: 3,
    color: '#555',
    fontSize: 14,
    lineHeight: 16,
  },
});
