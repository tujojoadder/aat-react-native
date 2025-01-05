import {View, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export default function SearchAnimation() {
  const spin = useSharedValue(0);

  const image2Style = useAnimatedStyle(() => {
    const y = interpolate(spin.value, [0, 1], [0, 180]);
    return {
      transform: [{rotateY: `${y}deg`}],
    };
  });
  const image1Style = useAnimatedStyle(() => {
    const y = interpolate(spin.value, [0, 1], [180, 360]);
    return {
      transform: [{rotateY: `${y}deg`}],
    };
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <View
        style={{
          width: '100%',
          height: 80,
          backgroundColor: 'tomato',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text variant="headlineMedium">Image Fliper</Text>
      </View>

      <View
        style={{
          height: 400,
          marginBottom: 40,
        }}>
        {/* Image1 */}
        <Animated.View
          style={[
            {
              height: 400,
              margin: 20,
              width: '80%',
              alignSelf: 'center',
            },
            image1Style,
          ]}>
          <Image
            style={[{height: 400, width: '100%', borderRadius: 20}]}
            source={{
              uri: 'https://i.ebayimg.com/images/g/xXQAAOSwh0ldgdY-/s-l1200.jpg',
            }}
          />
        </Animated.View>

        {/* Image2 */}
        <Animated.View
          style={[
            {
              height: 400,
              margin: 20,
              width: '80%',
              alignSelf: 'center',
              position: 'absolute',
             backfaceVisibility:'hidden'
            },
            image2Style,
          ]}>
          <Image
            style={[{height: 400, width: '100%', borderRadius: 20,}]}
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTM1Q4yaQHkUCvG4FrN3eUPkDqXvbAZDpCeA&s',
            }}
          />
        </Animated.View>
      </View>

      <TouchableOpacity
        style={{
          margin: 10,
          width: '50%',
          backgroundColor: 'black',
          height: 50,
          borderRadius: 20,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          spin.value=withTiming(spin.value==0?1:0,{duration:1000})
        }}>
        <Text variant="bodyLarge" style={{color: 'white'}}>
          Flip Image
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
