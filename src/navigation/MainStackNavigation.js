import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/HomeScreens/HomeScreen';
import ShippingAddress from '../screens/AddressScreens/ShippingAddress';
import AddAddress from '../screens/AddressScreens/AddAddressScreen';
import EditAddress from '../screens/AddressScreens/EditAddress';
import Profile from '../screens/UserAccountScreens/Profile';
import EditProfile from '../screens/UserAccountScreens/EditProfileScreen';
import ResetPassword from '../screens/UserAccountScreens/ResetPasswordScreen';
import ProductDetails from '../screens/ProductScreens/ProductDetailsScreen';
import Cart from '../screens/CartScreens/CartScreen';
import CheckOut from '../screens/CartScreens/CheckoutScreen';
import AllProducts from '../screens/ProductScreens/AllProductsScreen';
import StoreLocator from '../screens/StoreLocator/StoreLocator';
import DrawerNavigator from './DrawerNavigation';
import PlaceOrder from '../screens/CartScreens/PlaceOrderScreen';
import FilterProducts from '../screens/ProductScreens/FilterProductsScreen';
import OrderHistory from '../screens/OrderHistory/OrderHistoryScreen';
import OrderDetails from '../screens/OrderHistory/OrderDetails';

const MainStack = createNativeStackNavigator();


const MainStackNavigator = () =>{
    return(
        <MainStack.Navigator >
            <MainStack.Screen name="Drawer" component={DrawerNavigator} options={{ headerShown: false }} />
            <MainStack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <MainStack.Screen name="AllProducts" component={AllProducts} options={{ headerShown: false }} />
            <MainStack.Screen name="ProductDetails" component={ProductDetails} options={{ headerShown: false }} />
            <MainStack.Screen name="FilterProducts" component={FilterProducts} options={{ headerShown: false }} />
            <MainStack.Screen name="Cart" component={Cart} options={{ headerShown: false }} />
            <MainStack.Screen name="ShippingAddress" component={ShippingAddress} options={{ headerShown: false }} />
            <MainStack.Screen name="AddAddress" component={AddAddress} options={{ headerShown: false }} />
            <MainStack.Screen name="EditAddress" component={EditAddress} options={{ headerShown: false }} /> 
            <MainStack.Screen name="CheckOut" component={CheckOut} options={{ headerShown: false }} />
            <MainStack.Screen name="PlaceOrder" component={PlaceOrder} options={{ headerShown: false }} />
            <MainStack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
            <MainStack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
            <MainStack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} />
            <MainStack.Screen name="StoreLocator" component={StoreLocator} options={{ headerShown: false }} />
            <MainStack.Screen name="OrderHistory" component={OrderHistory} options={{ headerShown: false }} />
            <MainStack.Screen name="OrderDetails" component={OrderDetails} options={{ headerShown: false }} />
        </MainStack.Navigator>
    );
}

export default MainStackNavigator;