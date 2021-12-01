import React, { useState } from 'react';
import { 
    View, 
    StyleSheet,  
    KeyboardAvoidingView, 
    ScrollView,  
    ToastAndroid
} from 'react-native';
import ButtonField from '../../components/Button';
import InputTextField from '../../components/TextField';
import {  PasswordValidator,ConfirmPasswordValidator } from '../../components/validation';
import axios from 'axios';
import { Loading } from '../../components/Loder';
import { BASE_URL } from '../../config';
import HeaderScreen from '../../components/Header';
import { useSelector } from 'react-redux';


const ResetPassword = ({navigation}) => {
    const token = useSelector(state => state.token);
    const [oldPassword, setOldPassword] = useState('');
    const [oldPasswordErr, setOldPasswordErr] = useState(null);
    const [password, setPassword] = useState('');
    const [passwordErr, setPasswordErr] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordErr, setConfirmPasswordErr] = useState(null);
    const [oldsecure, setOldSecure] = useState(true);
    const [secure, setSecure] = useState(true);
    const [confirmPassSecure, setConfirmPassSecure] = useState(true);
    const [loading, setLoading] = useState(false);

    const reset = () => {
        if(oldPassword.length === 0 || password.length === 0 || confirmPassword.length === 0){
            ToastAndroid.showWithGravityAndOffset("Please enter the detail in Text Field!!", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
            // alert("Please enter the detail in Text Field!!")
        }
        else if(oldPasswordErr != null || passwordErr != null || confirmPasswordErr != null){
            // alert("Please enter the details correctly")
            ToastAndroid.showWithGravityAndOffset("Please enter the details correctly", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        } 
        else{
            setLoading(true);
            resetApiRequest();

        }
    }

    const resetApiRequest = async() => {
        var config = {
            method: "post",
            url: `${BASE_URL}/changePassword`,
            headers: {
              "Content-Type": "application/json",
              'Authorization':`Bearer ${token}`
            },
            data:{"currentPassword": oldPassword, "newPassword":password},
        };
        await axios(config)
        .then (response => {
            setLoading(false);
            if (response.status==200){
                // alert("You have successfully Logged In! Welcome to NeoStore")
                ToastAndroid.showWithGravityAndOffset("You have successfully changed your password", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
                navigation.goBack()
                console.log(response.data)
            } 
        })
        .catch(function(error) {
            setLoading(false);
            console.log(error.message);
            if(error.message ==="Request failed with status code 500")
                //     alert("There might be network issue or check the credentials")
                ToastAndroid.showWithGravityAndOffset("Please Enter New Password. It is same as Current Password", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
            else
                ToastAndroid.showWithGravityAndOffset("The Current password is Wrong!! OR There might be some network issue", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        })
    }

    return(
        <View style={styles.container}>
            <HeaderScreen header="Reset Password" onPress={() => navigation.goBack()}/>
            <KeyboardAvoidingView
                style={styles.loginContainer}
                behavior={Platform.OS == 'ios' ? 'padding' : null}
                enabled
                keyboardVerticalOffset={60}>
                <ScrollView contentContainerStyle={styles.scrollViewConatiner}>
                    <View>
                        <InputTextField 
                            iconName="lock" 
                            placeholder="Enter Current Password"
                            type="password"
                            secure={oldsecure}
                            setSecure={setOldSecure}
                            value={oldPassword}
                            maxLength={15}
                            autoCapitalize={false}
                            onChangeText={(oldpassword) => {
                                setOldPassword(oldpassword);
                                setOldPasswordErr(PasswordValidator(oldpassword));
                            }}
                            error={oldPasswordErr}>
                        </InputTextField>
                        <InputTextField 
                            iconName="lock" 
                            placeholder="Enter New Password"
                            type="password"
                            secure={secure}
                            setSecure={setSecure}
                            value={password}
                            maxLength={15}
                            onChangeText={(password) => {
                                setPassword(password);
                                setPasswordErr(PasswordValidator(password));
                                setConfirmPasswordErr(ConfirmPasswordValidator(password,confirmPassword));
                            }}
                            error={passwordErr}>
                        </InputTextField>
                        <InputTextField 
                            iconName="lock" 
                            placeholder="Confirm New Password"
                            type="password"
                            secure={confirmPassSecure}
                            setSecure={setConfirmPassSecure}
                            value={confirmPassword}
                            maxLength={15}
                            onChangeText={(confirmPassword) => {
                                setConfirmPassword(confirmPassword);
                                setConfirmPasswordErr(ConfirmPasswordValidator(password,confirmPassword));
                            }}
                            error={confirmPasswordErr}>
                        </InputTextField>
                        <ButtonField 
                            buttonText="Submit"
                            onPress={() => reset()}>
                        </ButtonField>
                    </View>
                </ScrollView>
                <Loading loading={loading}/>
            </KeyboardAvoidingView>
        </View>
    )
}





const styles= StyleSheet.create({
    container: {
        flex:1
    },
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
    goBackIcon:{
        position:"relative",
        top:-100
    },
    subheadingText:{
        color:"maroon",
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

export default ResetPassword;