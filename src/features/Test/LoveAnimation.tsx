import {View, SafeAreaView, ImageBackground, Dimensions} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { TapGestureHandler} from 'react-native-gesture-handler';
export default function LoveAnimation() {
  const scale = useSharedValue(0);
  const loveAnimationStyle = useAnimatedStyle(() => {
    return {
        transform:[{scale:Math.max(scale.value,0)}]
    };
  });

  const doubleTap = () => {
    scale.value=withSpring(1,undefined,isFinish=>{
        if (isFinish) {
            scale.value=withSpring(0);
        }
    })
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TapGestureHandler
          onActivated={doubleTap}
          numberOfTaps={2}
          maxDelayMs={500}>
          <View>
            <ImageBackground
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: Dimensions.get('window').width,
                width: Dimensions.get('window').width,
              }}
              source={{
                uri: 'https://i.ebayimg.com/images/g/xXQAAOSwh0ldgdY-/s-l1200.jpg',
              }}>
              <Animated.Image
                resizeMode="contain"
                
                style={[{height: 150, width: 150, tintColor: 'red'},loveAnimationStyle]}
                source={require('../../../src/offlinephotos/heart.png')}></Animated.Image>
            </ImageBackground>
          </View>
        </TapGestureHandler>
      </View>
    </SafeAreaView>
  );
}