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

export default function App() {
  return (
    
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

          <RootNavigator />
        </PersistGate>
      </ReduxProvider>
    </PaperProvider>
  );
}
