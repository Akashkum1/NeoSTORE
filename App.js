import SplashScreen from 'react-native-splash-screen';
import React, { useEffect } from 'react';
import StackNavigator from './src/navigation/StackNavigation';
import { Provider } from 'react-redux';
import store from './src/redux/store';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, [])
  return(
    <Provider store={store}>
      <StackNavigator/> 
    </Provider>
  );
};


export default App;
