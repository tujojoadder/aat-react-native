import { View, Text } from 'react-native'
import React from 'react'
import Animated from 'react-native-reanimated'
import { Appbar } from 'react-native-paper'
import { AppbarStyleSheet } from '../StyleSheet/AppbarStyleSheet/AppbarStyleSheet'
import { ContainerStyleSheet } from '../StyleSheet/ContainerStyleSheet/ContainerStyleSheet'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootParamList } from '../../../RootNavigator'
import { useNavigation } from '@react-navigation/native'
import FriendTopTabs from './FriendTopTabs'

type FriendHomeNavigationProp=NativeStackNavigationProp<RootParamList>;

export default function FriendHome() {

    const navigation=useNavigation<FriendHomeNavigationProp>();
  return (
   <View style={ContainerStyleSheet.container}>
     {/* Fixed Appbar */}
     <Animated.View style={[AppbarStyleSheet.animatedAppBar]}>
       <Appbar.Header style={''}>
         {/* back button */}
         <Appbar.BackAction onPress={() => navigation.goBack()} />
         {/* title */}
         <Appbar.Content
           title="Friends"
           titleStyle={AppbarStyleSheet.title}
         />
       </Appbar.Header>
     </Animated.View>

   {/* body */}
   
   <FriendTopTabs/>
   


   </View>
  )
}