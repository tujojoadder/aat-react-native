import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {Button} from 'react-native-paper';
import { withDelay } from 'react-native-reanimated';

export default function AnimationStyle() {
  const h = useSharedValue(100);
  const w = useSharedValue(100);
  const r = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    height: h.value,
    width: w.value,
    borderRadius:r.value,
    transform:[{translateX:0}]
  }));

  const handlePress = () => {
   
    if (h.value===100) {
        h.value=withDelay(1000,withSpring(200));
        w.value=withDelay(1000,withSpring(200));
        r.value=withDelay(1000,withSpring(100));


    } else {
        h.value=withDelay(1000,withSpring(100));
        w.value=withDelay(1000,withSpring(100));
        r.value=withDelay(1000,withSpring(0));
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <Animated.View
        style={[animatedStyle, {backgroundColor: 'red'}]}></Animated.View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button onPress={handlePress} mode="outlined">
          click
        </Button>
      </View>
    </SafeAreaView>
  );
}
