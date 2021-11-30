import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgetPassword from '../screens/AuthorizationScreens/ForgetPasswordScreen';
import SignUp from '../screens/AuthorizationScreens/SignUpScreen';
import Login from '../screens/AuthorizationScreens/LoginScreen';
import SetPassword from '../screens/AuthorizationScreens/SetPasswordScreen';

const AuthStack = createNativeStackNavigator();


const AuthStackNavigator = () =>{
    return(
        <AuthStack.Navigator >
            <AuthStack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <AuthStack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} /> 
            <AuthStack.Screen name="ForgotPassword" component={ForgetPassword} options={{ headerShown: false }}/>
            <AuthStack.Screen name="SetPassword" component={SetPassword} options={{ headerShown: false }}/>
        </AuthStack.Navigator>
    );
};

export default AuthStackNavigator;