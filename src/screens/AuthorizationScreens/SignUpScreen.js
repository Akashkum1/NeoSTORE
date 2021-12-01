import React, { useState } from 'react';
import { 
    View, 
    StyleSheet, 
    Text, 
    KeyboardAvoidingView, 
    ScrollView, 
    TouchableOpacity, 
    ToastAndroid
} from 'react-native';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import ButtonField from '../../components/Button';
import InputTextField from '../../components/TextField';
import {NameValidator, EmailValidator, PhoneNumberValidator, PasswordValidator, ConfirmPasswordValidator} from '../../components/validation';
import axios from 'axios';
import { Loading } from '../../components/Loder';
import { BASE_URL } from '../../config';
import HeaderScreen from '../../components/Header';

const SignUp = ({navigation}) => {
    const [firstName, setFirstName] = useState('');
    const [firstNameErr, setFirstNameErr] = useState(null);
    const [lastName, setLastName] = useState('');
    const [lastNameErr, setLastNameErr] = useState(null);
    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberErr, setPhoneNumberErr] = useState(null);
    const [password, setPassword] = useState('');
    const [passwordErr, setPasswordErr] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordErr, setConfirmPasswordErr] = useState(null);
    const [secure, setSecure] = useState(true);
    const [confirmPassSecure, setConfirmPassSecure] = useState(true);
    const [checkedGender, setCheckedGender] = useState(null);
    const [genderValue, setGenderValue] = useState(null)
    const [agree, setAgree] = useState(false);
    const [loading, setLoading] = useState(false);
    var gender = ['Male', 'Female'];

    const setGender= (key) => {
        if(key ===0){
            setGenderValue("Male")
        }
        else{
            setGenderValue("Female")
        }
    }

    const Registeration = () => {
        if(firstName.length === 0 || lastName.length === 0 || email.length === 0 || phoneNumber.length === 0 || password.length === 0 || confirmPassword.length === 0){
            // alert("Please enter the detail in Text Field!!")
            ToastAndroid.showWithGravityAndOffset("Please enter the detail in Text Field!!", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        }
        else if(firstNameErr != null || lastNameErr != null || emailErr != null || phoneNumberErr != null ||  passwordErr != null || confirmPasswordErr != null){
            // alert("Please enter the details correctly")
            ToastAndroid.showWithGravityAndOffset("Please enter the details correctly", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        } 
        else if(checkedGender === null){
            // alert("Please select the Gender")
            ToastAndroid.showWithGravityAndOffset("Please select the Gender", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        }
        else if(!agree){
            // alert("Please check the Terms & Conditions")
            ToastAndroid.showWithGravityAndOffset("Please check the Terms & Conditions", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        }
        else{
            setLoading(true);
            Register()
        }
    }

    const Register = async() =>{
        var data = new FormData();
        data.append('firstName',firstName);
        data.append('secondName',lastName);
        data.append('contactNo',phoneNumber);
        data.append('email',email)
        data.append('password', password)
        data.append('gender',genderValue)
        console.log(data)
        let headers = {
          'Accept': "application/json",
          'Content-Type': "multipart/form-data",
        };
        await axios.post(`${BASE_URL}/register`, data, {"headers": {headers},})
        .then(response => {
            if (response.status==200){
                setLoading(false);
                //   alert("You have Successfully Registered!!")
                ToastAndroid.showWithGravityAndOffset("You have Successfully Registered!!", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
                console.log(response.data)
                navigation.navigate("Login")  
            } 
        })
        .catch(function(error) {
            setLoading(false);
            console.log(error);
            // alert("You have already registed or there might be network issue")
            ToastAndroid.showWithGravityAndOffset("You have already registed or there might be network issue", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        });
    }
    
    return(
        <View style={styles.container}>
            <HeaderScreen header="Sign Up" onPress={() => navigation.goBack()}/>
            <KeyboardAvoidingView
                style={styles.loginContainer}
                behavior={Platform.OS == 'ios' ? 'padding' : null}
                enabled
                keyboardVerticalOffset={60}>
                <ScrollView contentContainerStyle={styles.scrollViewConatiner} showsVerticalScrollIndicator={false}>
                    <View>
                        <Text style={styles.headingText}> NeoStore </Text>
                        <Text style={styles.subheadingText}>Sign Up</Text>
                        <InputTextField 
                            iconName="user" 
                            placeholder="First Name"
                            value={firstName}
                            maxLength={25}
                            onChangeText={(firstName) => {
                                setFirstName(firstName);
                                setFirstNameErr(NameValidator(firstName));
                            }}
                            error={firstNameErr}>
                        </InputTextField>
                        <InputTextField 
                            iconName="user" 
                            placeholder="Last Name"
                            value={lastName}
                            maxLength={25}
                            onChangeText={(lastName) => {
                                setLastName(lastName);
                                setLastNameErr(NameValidator(lastName));
                            }}
                            error={lastNameErr}>
                        </InputTextField>
                        <InputTextField 
                            iconName="envelope" 
                            placeholder="Email"
                            value={email}
                            maxLength={40}
                            keyboardType="email-address"
                            onChangeText={(email) => {
                                setEmail(email);
                                setEmailErr(EmailValidator(email));
                            }}
                            error={emailErr}>
                        </InputTextField>
                        <InputTextField 
                            iconName="mobile" 
                            placeholder="Phone Number"
                            value={phoneNumber}
                            maxLength={10}
                            keyboardType="number-pad"
                            onChangeText={(phoneNumber) => {
                                setPhoneNumber(phoneNumber);
                                setPhoneNumberErr(PhoneNumberValidator(phoneNumber));
                            }}
                            error={phoneNumberErr}>
                        </InputTextField>
                        <InputTextField 
                            iconName="lock" 
                            placeholder="Password"
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
                            placeholder="Confirm Password"
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
                        <View style={styles.genderView}>
                            <Text style={styles.genderViewText}>Select Gender: </Text>
                            {gender.map((gender, key) => {
                                return (
                                    <View key={gender} >
                                        {checkedGender == key ? (
                                            <TouchableOpacity style={styles.genderButton}>
                                                <Icon
                                                    style={styles.icon}
                                                    size={30}
                                                    color="maroon"
                                                    name="checkbox-marked-circle"
                                                />
                                                <Text style={styles.genderText}>{gender}</Text>
                                            </TouchableOpacity>
                                            ) : (
                                            <TouchableOpacity
                                                onPress={() => {setCheckedGender(key); setGender(key)}}
                                                style={styles.genderButton}>
                                                <Icon
                                                    style={styles.icon}
                                                    size={30}
                                                    color="black"
                                                    name="checkbox-blank-circle-outline"
                                                />
                                                <Text style={styles.genderText}>{gender}</Text>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                );
                            })}

                        </View>
                        <View style = {styles.checkboxView}>
                            <TouchableOpacity
                                style = {styles.checkbox}
                                onPress={() => setAgree(!agree)}>
                                <Icon
                                    name = {agree? "checkbox-marked" : "checkbox-blank-outline"} 
                                    size={30}
                                    color={agree? "maroon" : "black"}
                                />
                            </TouchableOpacity>
                            <Text style = {styles.termText}>I agree the Terms & Conditions</Text>  
                        </View>
                        <ButtonField 
                            buttonText="Register"
                            onPress={() => Registeration()}>
                        </ButtonField>
                        <TouchableOpacity style={styles.touchableTextButton} onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.touchableText}>Dont't have an account? Login</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <Loading loading={loading}/>
            </KeyboardAvoidingView>
        </View>
    );
};





const styles= StyleSheet.create({
    container: {
        flex:1
    },
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical:15,
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
    genderView:{
          flexDirection:"row",
          justifyContent:"center",
          alignItems:"center",
          paddingVertical:15
    },
    genderViewText:{
        color:"black",
        fontSize:20,
        paddingRight:10

    },
    genderButton:{
        flexDirection:"row",
        alignItems:"center",
        paddingRight:15
    },
    icon:{
        paddingRight:5
    },
    genderText:{
        color:"black",
        fontSize:18,  
    },
    checkboxView:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        paddingBottom:20
    },
    checkbox:{
        paddingRight:20
    },
    termText:{
        fontSize:20,
        color:"black"
    },
});

export default SignUp;