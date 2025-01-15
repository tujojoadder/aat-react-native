import React, {useCallback, useEffect, useState} from 'react';
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
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useGetDayHadithsQuery} from '../services/hadithApi';
import {RootState} from '../app/store';
import {setAllDayHadith} from '../features/Home/HomeSlice';
type HadithProp = NativeStackNavigationProp<RootParamList, 'hadithContent'>;

export default function HadithStatusBar() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(''); // For Snackbar error message
  const navigation = useNavigation<HadithProp>(); // Use the correct type
  const {
    data: GetDayHadithsQuery,
    isSuccess: GetDayHadithsQuerySuccess,
    isLoading: GetDayHadithsQueryLoading,
    isError: GetDayHadithsQueryError,
    error, // error is automatically provided by the hook
    refetch,
  } = useGetDayHadithsQuery();
  const allDayHadith = useSelector(
    (state: RootState) => state.home.allDayHadith,
  );

  // Trigger refetch when this screen is focused
  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      refetch()
        .then(response => {
          if (response?.data) {
            const dataWithSerialNumbers = response.data.data.map(
              (item, index) => ({
                ...item,
                serialNumber: index,
              }),
            );
           
            dispatch(setAllDayHadith(dataWithSerialNumbers));
          }
        })
        .catch(error => {
          setErrorMessage('Failed to fetch Hadiths. Please try again.');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, [refetch, dispatch]),
  );

  if (GetDayHadithsQueryLoading) {
    return <Text>Loading...</Text>;
  }

  if (GetDayHadithsQueryError) {
    console.log('Error:', error); // Print the error
    return <Text>Error occurred while fetching day hadiths.</Text>;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}>
        {/* Create Component */}
        <TouchableOpacity 
        style={styles.createCard}
        onPress={()=>{
          navigation.navigate('hadithBox');
        }}
        >
          <Avatar.Icon size={40} icon="plus" style={styles.createIcon} />
          <Text style={[styles.createText, {fontSize: 17}]}>Add</Text>
          <Text style={styles.createText}>Day Hadith</Text>
        </TouchableOpacity>

        {/* User Hadith Cards */}

        {/* User Hadith Cards */}
        {allDayHadith &&
          allDayHadith.length > 0 &&
          allDayHadith.map(item => (
            <TouchableOpacity
              key={item.day_hadith.day_hadith_id}
              style={styles.hadithCard}
              onPress={() =>
                navigation.navigate('hadithContent', {
                  serialNumber: item.serialNumber,
                })
              }
              
              >
              <ImageBackground
                source={{
                  uri: `${process.env.REACT_APP_LARAVEL_URL}/${item.profile_picture}`,
                }}
                resizeMode="cover"
                style={styles.cardBackground}
                imageStyle={{
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                }}>
                <View style={styles.overlay}></View>
              </ImageBackground>
              <View style={styles.cardContent}>
                <Text numberOfLines={1} style={styles.cardName}>
                  {item.user_fname} {item.user_lname}
                </Text>
                <Text numberOfLines={3} style={styles.cardHadith}>
                  {item.day_hadith.hadith.hadith}
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
    backgroundColor: 'white',
    paddingVertical: 15,
  },
  scrollViewContent: {
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  createCard: {
    width: 110,
    height: 170,
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
    height: 200,
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
    height: 95,
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
