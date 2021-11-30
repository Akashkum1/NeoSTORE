import SplashScreen from 'react-native-splash-screen';
import React ,{useEffect} from 'react';

import StackNavigator from './src/navigation/StackNavigation';
import { Provider } from 'react-redux';
import  Reducer from './src/redux/reducer';
import { createStore,applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/lib/integration/react';
import logger from 'redux-logger';
import Home from './src/screens/HomeScreens/HomeScreen';
import Login from './src/screens/AuthorizationScreens/LoginScreen';
import AddAddress from './src/screens/AddressScreens/AddAddressScreen';
import EditAddress from './src/screens/AddressScreens/EditAddress';
import EditProfile from './src/screens/UserAccountScreens/EditProfileScreen';
import ResetPassword from './src/screens/UserAccountScreens/ResetPasswordScreen';
import SignUp from './src/screens/AuthorizationScreens/SignUpScreen';
import ShippingAddress from './src/screens/AddressScreens/ShippingAddress';
import HeaderScreen from './src/components/Header';
import ProductDetails from './src/screens/ProductScreens/ProductDetailsScreen';
import StoreLocator from './src/screens/StoreLocator/StoreLocator';
import AllProducts from './src/screens/ProductScreens/AllProductsScreen';
import FilterProducts from './src/screens/ProductScreens/FilterProductsScreen';
import Cart from './src/screens/CartScreens/CartScreen';



// const logger = createLogger();

//  const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,

// };

// const persistedReducer = persistReducer(persistConfig,Reducer);
export const store = createStore(Reducer,applyMiddleware(logger));
// export const persistor = persistStore(store);


const App = () => {
  
  useEffect(() => {
    SplashScreen.hide();
  }, [])
  return (
    // <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <StackNavigator/> 
      </Provider>
    // </PersistGate>
    // <StackNavigator/>
    // <StackNavigator/>
  );
};



export default App;
