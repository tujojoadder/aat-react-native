import {View, Text} from 'react-native';
import React from 'react';
import Animated, {
  Easing,
  ReduceMotion,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {Button} from 'react-native-paper';
export default function Animation() {
  const animatedValue = useSharedValue(100);

  const handlePress = () => {
    animatedValue.value = withTiming(animatedValue.value + 50, {
      duration: 990,
      easing: Easing.linear,
    });
  };
  return (
    <View style={{flex: 1}}>
      <Animated.View
        style={{
          width: animatedValue,
          height: animatedValue,
          backgroundColor: 'violet',
        }}
      />

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button onPress={handlePress} mode="outlined">
          click
        </Button>
      </View>
    </View>
  );
}
