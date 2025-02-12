
import { View, Text } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootParamList } from '../../../../RootNavigator';

type FollowersContainerProps=NativeStackScreenProps<RootParamList,'followersContainer'>;
export default function FollowersContainer({navigation,route}:FollowersContainerProps) {

    const {userId}=route.params;
  return (
    <View>
      <Text>FollowersContainer {userId}</Text>
    </View>
  )
}