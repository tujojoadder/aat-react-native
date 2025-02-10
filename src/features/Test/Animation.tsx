import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';

export default function Animation() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Left - Image */}
        <Avatar.Image size={50} source={{ uri: 'https://via.placeholder.com/150' }} />
        {/* Title in Center */}
        <View style={styles.titleContainer}>
          <Text numberOfLines={1}  style={styles.title}>
            Turjo Joadder with a Long Name Example
          </Text>
        </View>

        {/* Right - Button */}
        <TouchableOpacity style={styles.button} onPress={() => console.log('Pressed')}>
          <Text style={styles.buttonText}>Click here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    elevation: 3, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  titleContainer: {
    flex: 1,
    marginHorizontal: 10, // Add space between elements
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
