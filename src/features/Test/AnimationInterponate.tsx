import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

export default function AnimationInterponate() {
  /* track animation state */

  const [animatedBoxClicked, setAnimatedBoxClicked] = useState(false);
  const boxHeight = useSharedValue(100);
  const boxWidth = useSharedValue(100);
  const animatedBox = useSharedValue(0);

  const boxAnimationStyle = useAnimatedStyle(() => ({
       
    height:interpolate(animatedBox.value,[0,1],[100,200]),
    borderRadius:interpolate(animatedBox.value,[0,1],[0,100]),
    width:interpolate(animatedBox.value,[0,1],[100,200]),
    backgroundColor:interpolateColor(animatedBox.value,[0,0.5,1],['green','blue','black']),
  }));

  useEffect(() => {
    animatedBox.value = withRepeat(
      withTiming(1, {duration: 2000}), // Animate to 1 over 2 seconds
      -1, // Repeat indefinitely
      true // Reverse the animation
    );
  }, []); // No dependency array needed for this case
  
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Animated.View
        style={[
          {height: 100, width: 100, backgroundColor: 'red'},
          boxAnimationStyle,
        ]}></Animated.View>

      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          height: 40,
          width: '70%',
          backgroundColor: 'black',
          marginVertical: 20,
          borderRadius: 10,
        }}
        onPress={() => {
          if (!animatedBoxClicked) {
           animatedBox.value=withSpring(1);
          } else {
            animatedBox.value=withSpring(0);
          }
          setAnimatedBoxClicked(!animatedBoxClicked);
        }}>
        <Text style={{color: 'white'}}>Press Me</Text>
      </TouchableOpacity>
    </View>
  );
}
