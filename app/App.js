import * as React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { enableScreens } from 'react-native-screens';

import { TabNavigation } from './containers/Tab/tab.navigation';

// Importing store
import { store } from './components/Store';


const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#502F4C',
    background: '#FBF7F4',
    text: '#171717',
  },
};

export default function App() {

  enableScreens();

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer theme={Theme}>
          <TabNavigation />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
