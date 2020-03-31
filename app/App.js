import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import { TabNavigation } from './containers/Tab/tab.navigation';

// Importing store
import { store } from './components/Store';

export default function App() {

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <TabNavigation />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
