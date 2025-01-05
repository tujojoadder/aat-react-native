import {View, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Text} from 'react-native-paper';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

export default function ShopCard() {
  const [count, setCount] = useState(0);
  const [buttonDisable, setButtonDisable] = useState(false);

  const animationViewX = useSharedValue(0);
  const animationViewY = useSharedValue(0);
  const viewScale = useSharedValue(0);
  const viewScale2 = useSharedValue(1);

  const animationViewStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: animationViewX.value},
      {translateY: animationViewY.value},
      {scale: viewScale.value},
    ],
  }));

  const viewScale2Style=useAnimatedStyle(()=>({
        transform:[{scale:viewScale2.value}]
  }));

  return (
    <SafeAreaView style={{flex: 1}}>
      <Image
        style={[{height: 300, width: '100%'}]}
        source={{
          uri: 'https://media.istockphoto.com/id/185271138/photo/holiday-concept.jpg?s=612x612&w=0&k=20&c=T0qUyFeffK9Y0Wd3Fy-IIxwsEXUOvYo8iEJDrOEtBYs=',
        }}
      />
      <View style={{margin: 10}}>
        <Text variant="headlineMedium">New bag</Text>

        <Text variant="bodyLarge">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
          nesciunt, explicabo accusamus illo iusto odio porro nisi, non autem
          molestiae ad. Sint, voluptatibus suscipit maxime quaerat cum delectus
          voluptas dolorum!
        </Text>

        
      </View>

      <View
        style={{
          height: 50,
          width: 50,
          borderRadius: 25,
          backgroundColor: 'white',
          position: 'absolute',
          top: 10,
          left: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={[{height: 30, width: 30}]}
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/2662/2662503.png',
          }}
        />

        <Animated.View
          style={[{
            height: 24,
            width: 24,
            borderRadius: 12,
            backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            right: 0,
            bottom: -7,
          },viewScale2Style]}>
          <Text style={{color: 'white'}}>{count}</Text>
        </Animated.View>


        
      </View>
      <Animated.View
          style={[
            {
              height: 24,
              width: 24,
              backgroundColor: 'red',
              borderRadius: 12,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            },
            animationViewStyle,
          ]}>
          <Text style={{color: 'white'}}>+1</Text>
        </Animated.View>

        <TouchableOpacity
          style={{
            width: '90%',
            height: 50,
            backgroundColor: 'black',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            alignSelf: 'center',

          }}
          disabled={buttonDisable}
          onPress={() => {
            setButtonDisable(true);
            viewScale.value = 1;
            animationViewX.value = withTiming(-130, {duration: 800});
            animationViewY.value = withTiming(-457, {duration: 800});
            setTimeout(() => {
              viewScale.value = 0;
              animationViewX.value = 0;
              animationViewY.value = 0;
              viewScale2.value=withSpring(1.5);
              setCount(count+1);
              setButtonDisable(false);
            setTimeout(() => {
                viewScale2.value=withSpring(1);
            }, 150);

            }, 800);
          }}>
          <Text style={{color: 'white'}}>Add new</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
}
