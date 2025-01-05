import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

export default function AnimationImage() {
  const screenWidth = Dimensions.get('window').width; // Get screen width

  /* image property */
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
  const imageHeight = useSharedValue(100);
  const imageWidth = useSharedValue(100);
  const imageY = useSharedValue(0);
  /*  button property */
  const cancelButtonHeight = useSharedValue(25);
  const cancelButtonWidth = useSharedValue(25);
  const cancelButtonScale = useSharedValue(0);
  /* view property */
  const animatedView = useSharedValue(0);

  /* image style */
  const animatedStyle = useAnimatedStyle(() => ({
    height: imageHeight.value,
    width: imageWidth.value,
    transform: [{translateY: imageY.value}],
  }));
  /* button style */
  const cancelButtonStyle = useAnimatedStyle(() => ({
    height: cancelButtonHeight.value,
    width: cancelButtonWidth.value,
    transform: [{scale: cancelButtonScale.value}],
  }));
  /* view style */
  const animatedViewStyle = useAnimatedStyle(() => ({
    transform: [{translateX: animatedView.value}],
  }));

  const handlePress = () => {
    console.log(screenWidth);
    if (imageHeight.value === 100) {
      animatedView.value = withTiming(-screenWidth, {duration: 400});
      cancelButtonScale.value = withTiming(1, {duration: 500});
      imageHeight.value = withSpring(screenWidth);
      imageWidth.value = withSpring(300);
      imageY.value = withSpring(100);
    }
  };

  const handleCancel = () => {
    animatedView.value = withTiming(0, {duration: 400});
    cancelButtonScale.value = withTiming(0, {duration: 500});
    imageHeight.value = withSpring(100);
    imageWidth.value = withSpring(100);
    imageY.value = withSpring(0);
  };

  return (
    <View style={{flex: 1}}>
      <AnimatedTouchable style={[cancelButtonStyle]} onPress={handleCancel}>
        <Image
          style={[{marginTop: 10, marginLeft: 10, height: 25, width: 25}]}
          source={{
            uri: 'https://cdn4.iconfinder.com/data/icons/basic-ui-colour/512/ui-02-512.png',
          }}
        />
      </AnimatedTouchable>
      <TouchableOpacity onPress={handlePress}>
        <Animated.Image
          source={{
            uri: 'https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg',
          }}
          style={[animatedStyle, {marginLeft: 30}]}
          resizeMode="cover"
        />
      </TouchableOpacity>

      <Animated.View
        style={[
          {
            height: 100,
            width: screenWidth,
            backgroundColor: 'gray',
          },
          animatedViewStyle,
        ]}></Animated.View>
    </View>
  );
}
