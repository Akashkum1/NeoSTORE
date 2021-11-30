import React, {useState} from 'react';
import { View, StyleSheet, Text, KeyboardAvoidingView, ScrollView, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ButtonField from '../../components/Button';
import InputTextField from '../../components/TextField';
import { OtpValidator, PasswordValidator, ConfirmPasswordValidator } from '../../components/validation';
import axios from 'axios';
import { Loading } from '../../components/Loder';
import HeaderScreen from '../../components/Header';

 
const SetPassword = ({navigation}) =>{
    const [otp, setOtp] = useState('');
    const [otpErr, setOtpErr] = useState(null);
    const [password, setPassword] = useState('');
    const [passwordErr, setPasswordErr] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordErr, setConfirmPasswordErr] = useState(null);
    const [secure, setSecure] = useState(true);
    const [confirmPassSecure, setConfirmPassSecure] = useState(true);
    const [loading, setLoading] = useState(false);


    const resetPassword = () =>{
        if(otp.length === 0 || password.length === 0 || confirmPassword.length === 0){
            // alert("Please enter the detail in Text Field!!")
            ToastAndroid.showWithGravityAndOffset("Please enter the detail in Text Field!!", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        }
         else if(otpErr != null || passwordErr != null || confirmPasswordErr != null){
            // alert("Please enter the details correctly")
            ToastAndroid.showWithGravityAndOffset("Please enter the details correctly", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        } 
        else{
            setLoading(true);
            reset()
        }
    }

    const reset = async() =>{
        var config = {
            method: "post",
            url: "https://nameless-savannah-21991.herokuapp.com/recoverPassword",
            headers: {
              "Content-Type": "application/json",
            },
            data:{'verificationCode':otp,'password':password},
        };
        await axios(config)
            .then(response => {
                setLoading(false);
                if (response.status==200){
                // alert("You have successfully reset your Password!!")
                ToastAndroid.showWithGravityAndOffset("You have successfully changed your Password!!", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
                console.log(response.data)
                navigation.navigate('Login')  
                } 
            })
            .catch(function(error) {
                setLoading(false);
                console.log(error);
                // alert("There might be network issue or enter the credentials properly")
                ToastAndroid.showWithGravityAndOffset("There might be network issue or enter the credentials properly", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
            })
    }
    return(
        <View style={{flex:1}}>
            <HeaderScreen header="Reset Password" onPress={() => navigation.navigate('ForgotPassword')}/>
            <KeyboardAvoidingView
                style={styles.loginContainer}
                behavior={Platform.OS == 'ios' ? 'padding' : null}
                enabled
                keyboardVerticalOffset={60}>
                <ScrollView contentContainerStyle={styles.scrollViewConatiner}>
                    <View>
                        <Text style={styles.headingText}> NeoStore </Text>
                        <Text style={styles.subHeadingText}>Reset Password using OTP sent to your mail</Text>
                        <InputTextField 
                            iconName="key" 
                            placeholder="OTP"
                            value={otp}
                            maxLength={8}
                            keyboardType="number-pad"
                            onChangeText={(otp) => {
                                setOtp(otp);
                                setOtpErr(OtpValidator(otp));
                            }}
                            error={otpErr}>
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
                                setConfirmPasswordErr(ConfirmPasswordValidator(password,confirmPassword));
                            }}
                            error={passwordErr}>
                        </InputTextField>
                        <InputTextField 
                            iconName="lock" 
                            placeholder="Confirm Password"
                            type="password"
                            secure={confirmPassSecure}
                            setSecure={setConfirmPassSecure}
                            value={confirmPassword}
                            maxLength={15}
                            autoCapitalize={false}
                            onChangeText={(confirmPassword) => {
                                setConfirmPassword(confirmPassword);
                                setConfirmPasswordErr(ConfirmPasswordValidator(password,confirmPassword));
                            }}
                            error={confirmPasswordErr}>
                        </InputTextField>
                        <ButtonField 
                            buttonText="Submit"
                            onPress={() =>{resetPassword()}}>
                        </ButtonField>
                    </View>
                </ScrollView>
                <Loading loading={loading}/>
            </KeyboardAvoidingView>
        </View>
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
      goBackIcon:{
        position:"relative",
        top:-60
      },
      headingText: {
        color:"maroon",
        alignSelf: 'center',
        fontSize: 50,
        marginBottom: 10,
        fontWeight: 'bold',
      },
      subHeadingText:{
        alignSelf:"center",
        marginBottom:40,
        fontSize:18,
        color:"black",
        fontWeight:"bold"
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

export default SetPassword;