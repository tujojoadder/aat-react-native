import {View, Text} from 'react-native';
import React from 'react';
import {Appbar} from 'react-native-paper';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootParamList} from '../../../RootNavigator';
import {useNavigation} from '@react-navigation/native';
type ProfileNavigationProps = NativeStackNavigationProp<
  RootParamList,
  'profile'
>;
export default function Profile() {
  const navigation = useNavigation<ProfileNavigationProps>();

  return (
    <View>
      <Appbar.Header style={{height: 55}}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
      </Appbar.Header>

      <Text>Profile</Text>
    </View>
  );
}
