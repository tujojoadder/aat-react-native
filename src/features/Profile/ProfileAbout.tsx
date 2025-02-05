import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useGetSpecificUserAboutQuery } from '../../services/profileApi';
import { Segmented } from 'react-native-collapsible-segmented-view';
type ProfileAbout = {
    userId: string;
  };
  export default function ProfileAbout({userId}: ProfileAbout) {
    
  const { data, error, isLoading, isSuccess } = useGetSpecificUserAboutQuery(userId);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Failed to load profile info</Text>
      </View>
    );
  }

  if (!data.data) return null;

  const aboutData = [
    {
      id: '1',
      content: (
        <View style={styles.container}>
          <Text style={styles.header}>About</Text>

          {data.data.work && (
            <View style={styles.row}>
              <MaterialCommunityIcons name="briefcase" size={23} color="#555" />
              <Text style={styles.text}>Works at {data.data.work}</Text>
            </View>
          )}

          {data.data.education && (
            <View style={styles.row}>
              <MaterialCommunityIcons name="school" size={23} color="#555" />
              <Text style={styles.text}>Studied at {data.data.education}</Text>
            </View>
          )}

          {data.data.location && (
            <View style={styles.row}>
              <MaterialCommunityIcons name="map-marker" size={23} color="#555" />
              <Text style={styles.text}>Lives in {data.data.location}</Text>
            </View>
          )}

          {data.data.birthdate && (
            <View style={styles.row}>
              <MaterialCommunityIcons name="calendar" size={23} color="#555" />
              <Text style={styles.text}>Born on {data.data.birthdate}</Text>
            </View>
          )}

          {data.data.gender && (
            <View style={styles.row}>
              <MaterialCommunityIcons name="gender-male-female" size={23} color="#555" />
              <Text style={styles.text}>{data.data.gender.charAt(0).toUpperCase() + data.data.gender.slice(1)}</Text>
            </View>
          )}

          {data.data.relationship_status && (
            <View style={styles.row}>
              <MaterialCommunityIcons name="heart" size={23} color="#555" />
              <Text style={styles.text}>{data.data.relationship_status}</Text>
            </View>
          )}
        </View>
      ),
    },
  ];

  return (
    <Segmented.FlatList
      data={aboutData}
      renderItem={({ item }) => item.content}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    margin: 10,
    elevation: 2, // Shadow for Android
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  text: {
    fontSize: 18,
    color: '#555',
    marginLeft: 8,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 14,
    color: 'red',
  },
});