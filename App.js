import SplashScreen from 'react-native-splash-screen';
import React, { useEffect } from 'react';
import StackNavigator from './src/navigation/StackNavigation';
import { Provider } from 'react-redux';
import  Reducer from './src/redux/reducer';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';



export const store = createStore(Reducer, applyMiddleware(logger));

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
