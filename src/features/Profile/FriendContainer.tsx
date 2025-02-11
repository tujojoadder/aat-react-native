import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootParamList } from '../../../RootNavigator';

type FriendContainerProps = NativeStackScreenProps<RootParamList, 'friendsContainer'>;

export default function FriendContainer({ route, navigation }: FriendContainerProps) {
  const { userId } = route.params; // ✅ Extract userId from route params


  return (
    <View>
      <Text>FriendContainer</Text>
      <Text>Showing friends for User ID {userId}</Text>
    </View>
  );
}
