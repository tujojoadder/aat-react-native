import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export default function GestureAnimation() {
  const x = useSharedValue(0);
  const y = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {startX: number; startY: number}
  >({
    onStart: (event, content) => {
        console.log(event);

       
      content.startX = x.value;
      content.startY = y.value;
    },
    onActive: (event, content) => {
      console.log(event);
      x.value = content.startX + event.translationX;
      y.value = content.startY + event.translationY;
    },
    onEnd: (event, content) => {
      console.log('event');

      x.value = withSpring(0);
      y.value = withSpring(0);
    },
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          style={[
            {
              height: 100,
              width: 100,
              backgroundColor: 'tomato',
              transform: [{translateX: x}, {translateY: y}],
            },
          ]}></Animated.View>
      </PanGestureHandler>
    </SafeAreaView>
  );
}
