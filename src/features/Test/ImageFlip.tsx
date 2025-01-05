import {SafeAreaView, TouchableOpacity, View, Image} from 'react-native';
import React, {useState} from 'react';
import {Text} from 'react-native-paper';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

export default function ImageFlip() {
  const spin = useSharedValue(0);

  /* backface is  */
  const animatedImage1Style = useAnimatedStyle(() => {
    const spinValue = interpolate(spin.value, [0, 1], [0, 180]);

    return {
      transform: [{rotateY: `${spinValue}deg`}],
    };
  });
  const animatedImage2Style = useAnimatedStyle(() => {
    const spinValue = interpolate(spin.value, [0, 1], [180, 360]);

    return {
      transform: [{rotateY: `${spinValue}deg`}],
    };
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text
        variant="titleLarge"
        style={{textAlign: 'center', marginVertical: 20}}>
        Image Flip
      </Text>

      <View style={{position: 'relative', height: 400, marginBottom: 30}}>
        <Animated.View
          style={[
            {
              height: 400,
              width: '80%',
              marginVertical: 10,
              alignSelf: 'center',
              position: 'absolute',
            },
            animatedImage1Style,
          ]}>
          <Image
            style={[{height: 400, width: '100%', borderRadius: 20}]}
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTM1Q4yaQHkUCvG4FrN3eUPkDqXvbAZDpCeA&s',
            }}
          />
        </Animated.View>

        <Animated.View
          style={[
            {
              height: 400,
              width: '80%',
              marginVertical: 10,
              alignSelf: 'center',
              position: 'absolute',
              backfaceVisibility: 'hidden',
            },
            animatedImage2Style,
          ]}>
          <Image
            style={[{height: 400, width: '100%', borderRadius: 20}]}
            source={{
              uri: 'https://i.ebayimg.com/images/g/xXQAAOSwh0ldgdY-/s-l1200.jpg',
            }}
          />
        </Animated.View>
      </View>
      <TouchableOpacity
        onPress={() => {
          if (spin.value == 0) {
            spin.value = withTiming(1, {duration: 5000});
          } else {
            spin.value = withTiming(0, {duration: 5000});
          }
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          height: 40,
          width: '70%',
          backgroundColor: 'black',
          marginVertical: 20,
          borderRadius: 10,
        }}>
        <Text style={{color: 'white'}}>Flip Image</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
