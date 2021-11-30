import React, {useEffect, useState} from 'react';
import { View, StyleSheet, Text, KeyboardAvoidingView, ScrollView, TouchableOpacity, ToastAndroid} from 'react-native';
import ButtonField from '../../components/Button';
import InputTextField from '../../components/TextField';
import { EmailValidator, PasswordValidator } from '../../components/validation';
import axios from 'axios';
import { Loading } from '../../components/Loder';
import { BASE_URL } from '../../config';
import { useDispatch } from 'react-redux';
import {login} from '../../redux/actions';
import { notificationManager } from '../../notifications/notification';
import { LogBox } from 'react-native';





const Login = ({navigation}) =>{
    const localNotify = notificationManager;
    const dispath =useDispatch();
    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState(null);
    const [password, setPassword] = useState('');
    const [passwordErr, setPasswordErr] = useState(null);
    const [secure, setSecure] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() =>{
        LogBox.ignoreLogs(['If you want to use Reanimated 2 then go through our installation ']);
        localNotify.configure()
    },[])
    
    const UserLogin = () =>{
        if(email.length === 0 || password.length === 0){
            ToastAndroid.showWithGravityAndOffset("Please enter the detail in Text Field!!", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
            // alert("Please enter the detail in Text Field!!")
        }
         else if(emailErr != null || passwordErr != null){
            // alert("Please enter the details correctly")
            ToastAndroid.showWithGravityAndOffset("Please enter the details correctly", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        } 
        else{
            setLoading(true);
            LoginUser();

        }
    }

    const sendLoginNotification =() =>{
        localNotify.showNotification(
            1,
            "Welcome to NeoSTORE!!",
            "You have successfully logined into NeoStore",
            {},
            {}
        )
    }
    const LoginUser = async() =>{
        var config = {
            method: "post",
            url: `${BASE_URL}/login`,
            headers: {
              "Content-Type": "application/json",
            },
            data:{'email':email,'password':password},
        };
        await axios(config)
            .then (response => {
                setLoading(false);
                if (response.status==200){
                // alert("You have successfully Logged In! Welcome to NeoStore")
                sendLoginNotification()
                const userDetails = {
                    token: response.data.token,
                    cartId: response.data.cartId,
                    userId: response.data.userId
                }
                dispath(login(userDetails))
                ToastAndroid.showWithGravityAndOffset("You have successfully Logged In! Welcome to NeoStore", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
                console.log(response.data)

                } 
            })
            .catch(function(error) {
                setLoading(false);
                console.log(error);
            //     alert("There might be network issue or check the credentials")
            ToastAndroid.showWithGravityAndOffset("There might be network issue or check the credentials", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
            })
    }
    return(
        <KeyboardAvoidingView
            style={styles.loginContainer}
            behavior={Platform.OS == 'ios' ? 'padding' : null}
            enabled
            keyboardVerticalOffset={60}>
            <ScrollView contentContainerStyle={styles.scrollViewConatiner}>
                <View>
                    <Text style={styles.headingText}> NeoStore </Text>
                    <Text style={styles.subheadingText}>Login</Text>
                    <InputTextField 
                        iconName="envelope" 
                        placeholder="Email"
                        value={email}
                        maxLength={40}
                        keyboardType="email-address"
                        autoCapitalize={false}
                        onChangeText={(email) => {
                            setEmail(email);
                            setEmailErr(EmailValidator(email));
                        }}
                        error={emailErr}>
                    </InputTextField>
                    <InputTextField 
                        iconName="lock" 
                        placeholder="Password"
                        type="password"
                        secure={secure}
                        setSecure={setSecure}
                        value={password}
                        maxLength={15}
                        autoCapitalize={false}
                        onChangeText={(password) => {
                            setPassword(password);
                            setPasswordErr(PasswordValidator(password));
                        }}
                        error={passwordErr}>
                    </InputTextField>
                    <ButtonField 
                        buttonText="Login"
                        onPress={() => UserLogin()}>
                    </ButtonField>
                    <TouchableOpacity style={styles.touchableTextButton} onPress={() => navigation.navigate('ForgotPassword')}>
                        <Text style={styles.touchableText}>Forget password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touchableTextButton} onPress={() => navigation.navigate('SignUp')}>
                        <Text style={styles.touchableText}>Dont't have an account? Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Loading loading={loading}/>
        </KeyboardAvoidingView>
    )
}





const styles= StyleSheet.create({
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor:"#f0f0f0"
      },
      scrollViewConatiner:{
        flexGrow: 1, 
        justifyContent: 'center'
      },
      headingText: {
        color:"maroon",
        alignSelf: 'center',
        fontSize: 50,
        marginBottom: 10,
        fontWeight: 'bold',
      },
      subheadingText:{
        color:"black",
        alignSelf: 'center',
        fontSize: 28,
        marginBottom: 30,
        fontWeight: '600',
      },
      touchableTextButton:{
        alignItems:"center",
        marginTop:20
      },
      touchableText:{
        color:"black",
        fontSize:18
      },
});

export default Login;