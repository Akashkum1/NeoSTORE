import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStackNavigator from './AuthStackNAviagtion';
import MainStackNavigator from './MainStackNavigation';
import { useSelector } from 'react-redux';

const RootStack = createNativeStackNavigator();


const StackNavigator = () =>{
    const loggedIn = useSelector((state) => state.loggedIn)
    return(
        <NavigationContainer>
            <RootStack.Navigator>
                {loggedIn?<RootStack.Screen name="RootStack" component={MainStackNavigator} options={{ headerShown: false }} />:
                <RootStack.Screen name="RootStack" component={AuthStackNavigator} options={{ headerShown: false }} />}
                
            </RootStack.Navigator>
               
        </NavigationContainer>
    );
};

export default StackNavigator;