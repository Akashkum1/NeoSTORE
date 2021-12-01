import React, { useState, useEffect } from 'react';
import {
  View, 
  StyleSheet, 
  Text, 
  KeyboardAvoidingView, 
  ScrollView, 
  ToastAndroid 
} from 'react-native';
import ButtonField from '../../components/Button';
import InputTextField from '../../components/TextField';
import { EmailValidator } from '../../components/validation';
import axios from 'axios';
import { Loading } from '../../components/Loder';
import { BASE_URL } from '../../config';
import HeaderScreen from '../../components/Header';
import { notificationManager } from '../../notifications/notification';

const ForgetPassword = ({navigation}) => {
  const localNotify =notificationManager;
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() =>{
    localNotify.configure()
  },[]) 

  const sendOTP =(code) =>{
    localNotify.showNotification(
      1,
      "OTP For Password Change",
      `The OTP for reset password is ${code}`,
      {},
      {}
    )
  }
    
  const Forgot = () => {
    if(email.length === 0){
      // alert("Please enter the detail in Text Field!!")
      ToastAndroid.showWithGravityAndOffset("Please enter the detail in Text Field!!", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
    }
    else if(emailErr != null){ 
      ToastAndroid.showWithGravityAndOffset("Please enter the details correctly", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
    } 
    else{
      setLoading(true);
      ResetPassword();
    }
  }

  const ResetPassword = async() => {
    var config = {
      method: "post",
      url: `${BASE_URL}/forgotPassword`,
      headers: {
        "Content-Type": "application/json",
      },
      data:{'email':email},
    };
    await axios(config)
    .then(response => {
      setLoading(false);
      if (response.status==200){
        // alert("Reset the Password using OTP sent to your mail id ")
        ToastAndroid.showWithGravityAndOffset("Reset the Password using OTP sent to your mail id", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        sendOTP(response.data.code)
        console.log(response.data)
        navigation.navigate("SetPassword")  
      } 
    })
    .catch(function(error) {
      setLoading(false);
      console.log(error);
      // alert("There might be network issue or check the email address")
      ToastAndroid.showWithGravityAndOffset("There might be network issue or check the email address", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
    })
  }

  return(
    <View style={styles.container}>
      <HeaderScreen header="Forgot Password" onPress={() => navigation.navigate('Login')}/>
      <KeyboardAvoidingView
        style={styles.loginContainer}
        behavior={Platform.OS == 'ios' ? 'padding' : null}
        enabled
        keyboardVerticalOffset={60}>
        <ScrollView contentContainerStyle={styles.scrollViewConatiner}>
          <View>
            <Text style={styles.headingText}> NeoStore </Text>
            <Text style={styles.subHeadingText}>Forgot Password?</Text>
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
            <ButtonField 
              buttonText="Submit"
              onPress={() => Forgot()}>
            </ButtonField>
          </View>
        </ScrollView>
          <Loading loading={loading}/>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles= StyleSheet.create({
  container:{
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
    top:-130
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
    fontSize:22,
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

export default ForgetPassword;