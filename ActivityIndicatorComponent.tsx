import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const ActivityIndicatorComponent = () => {
  return (
    <View style={styles.loaderContainer}>
    {/* <ActivityIndicator size={30} color="#007bff" /> */}
  </View>
  );
};

const styles = StyleSheet.create({
    loaderContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f0f0', // Optional: Splash screen style (light background)
    },
  });
  
export default ActivityIndicatorComponent;
