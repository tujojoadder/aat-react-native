import {View, Text} from 'react-native';
import React from 'react';
import {ActivityIndicator} from 'react-native-paper';

const Activator = () => {
  return (
    <View style={{paddingVertical:8}}>
      <ActivityIndicator color='blue'></ActivityIndicator>
    </View>
  );
};

export default React.memo(Activator);
