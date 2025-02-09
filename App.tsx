import React from 'react';
import {
  ActivityIndicator,
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {Provider as ReduxProvider} from 'react-redux';
import {persistor, store} from './src/app/store';
import {PersistGate} from 'redux-persist/integration/react';
import {View} from 'react-native';
import RootNavigator from './RootNavigator';
import Animation from './src/features/Test/Animation';
import AnimationStyle from './src/features/Test/AnimationStyle';
import AnimationImage from './src/features/Test/AnimationImage';
import ShopCard from './src/features/Test/ShopCard';
import AnimationInterponate from './src/features/Test/AnimationInterponate';
import Transform from './src/features/Test/Transform';
import ImageFlip from './src/features/Test/ImageFlip';
import GestureAnimation from './src/features/Test/GestureAnimation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LoveAnimation from './src/features/Test/LoveAnimation';

import Home from './src/features/Home/Home';
import SearchAnimation from './src/features/Test/SearchAnimation';
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    onPrimary: 'yellow',
    primary: '#1d1e30',
    onSurface: 'black',
    onBackground: 'darkgray',
  },
};

import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';

// This is the default configuration
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in stricrunsde by default
});

export default function App() {
  return (
    <GestureHandlerRootView >
    <PaperProvider theme={theme}>
      <ReduxProvider store={store}>
        <PersistGate
          loading={
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size="large" color="red" />
            </View>
          }
          persistor={persistor}>
            
           {/*  <Animation/> */}
            {/* <AnimationStyle/> */}
           {/*  <AnimationImage/> */}
            {/*  <ShopCard/> */}
          {/* <AnimationInterponate/> */}
         {/*  <Transform /> */}
          {/* <ImageFlip/> */}
         {/*  <SearchAnimation/> */}
        {/* <GestureAnimation/> */}
          {/* <LoveAnimation/> */}


          <RootNavigator />
        </PersistGate>
      </ReduxProvider>
    </PaperProvider>
    </GestureHandlerRootView>
  );
}
