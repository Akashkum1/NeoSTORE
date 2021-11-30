import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, ScrollView, ToastAndroid } from 'react-native';
import ButtonField from '../../components/Button';
import InputTextField from '../../components/TextField';
import { AddressValidator, CityValidator, PinCodeValidator, StateValidator, CountryValidator } from '../../components/validation';
import axios from 'axios';
import { BASE_URL } from '../../config';
import HeaderScreen from '../../components/Header';
import { Loading } from '../../components/Loder';
import {  useSelector } from 'react-redux';

const AddAddress =({navigation}) =>{

    const token = useSelector(state => state.token)
    const [address1, setAddress1] = useState('');
    const [address1Err, setAddress1Err] = useState(null);
    const [address2, setAddress2] = useState('');
    const [address2Err, setAddress2Err] = useState(null);
    const [city, setCity] = useState('');
    const [cityErr, setCityErr] = useState(null);
    const [pinCode, setPinCode] = useState('');
    const [pinCodeErr, setPinCodeErr] = useState(null);
    const [state, setState] = useState('');
    const [stateErr, setStateErr] = useState(null);
    const [country, setCountry] = useState('');
    const [countryErr, setCountryErr] = useState(null);
    const [loading, setLoading] = useState(false);

    
    
    
    
    const Addaddress = () =>{
        if(address1.length === 0 || address2.length === 0 || city.length === 0 || state.length === 0 || country.length === 0){
            alert("Please enter the detail in Text Field!!")
        }
         else if(address1Err != null || address2Err != null || cityErr != null || stateErr != null || countryErr != null){
            alert("Please enter the details correctly")
        } 
        else{
            AddAddressApiRequest()
        }
    }
    const AddAddressApiRequest = async() =>{
        const data={
            "address": {
              "address": `${address1+" "+address2} `,
              "pincode": pinCode,
              "city": city,
              "state": state,
              "country": country
            }
          }
        var config = {
            method: "post",
            url: `${BASE_URL}/addCustAddress`,
            headers: {
              "Content-Type": "application/json",
              'Authorization':`Bearer ${token}`

            },
            data,
        };
        await axios(config)
            .then(response => {
                if (response.status==200){
                    setLoading(false);
                    navigation.goBack();
                    // alert("You have successfully updated your address!!")
                    ToastAndroid.showWithGravityAndOffset("You have successfully added your address!!", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
                    console.log(response.data)  
                } 
            })
            .catch(function(error) {
                console.log(error);
                setLoading(false);
                // alert("There might be network issue or check the credentials")
                ToastAndroid.showWithGravityAndOffset("There might be network issue or check the credentials", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
            })
        
    }
    return(
        <View style={{flex:1}}>
            <HeaderScreen header="Add Address" onPress={() => {navigation.goBack()}}/>
            <KeyboardAvoidingView
                style={styles.loginContainer}
                behavior={Platform.OS == 'ios' ? 'padding' : null}
                enabled
                keyboardVerticalOffset={60}>
                <ScrollView contentContainerStyle={styles.scrollViewConatiner}>
                    <View>
                        <InputTextField  
                            placeholder="Flat, House No, Building, Apartment"
                            value={address1}
                            maxLength={100}
                            onChangeText={(address1) => {
                                setAddress1(address1);
                                setAddress1Err(AddressValidator(address1));
                            }}
                            error={address1Err}>
                        </InputTextField>
                        <InputTextField  
                            placeholder="Area, Colony, Street, Sector, Village"
                            value={address2}
                            maxLength={100}
                            onChangeText={(address2) => {
                                setAddress2(address2);
                                setAddress2Err(AddressValidator(address2));
                            }}
                            error={address2Err}>
                        </InputTextField>
                        <InputTextField  
                            placeholder="City"
                            value={city}
                            maxLength={20}
                            onChangeText={(city) => {
                                setCity(city);
                                setCityErr(CityValidator(city));
                            }}
                            error={cityErr}>
                        </InputTextField>
                        <InputTextField  
                            placeholder="Pin Code"
                            value={pinCode}
                            maxLength={6}
                            onChangeText={(pinCode) => {
                                setPinCode(pinCode);
                                setPinCodeErr(PinCodeValidator(pinCode));
                            }}
                            error={pinCodeErr}>
                        </InputTextField>
                        <InputTextField  
                            placeholder="State"
                            value={state}
                            maxLength={20}
                            onChangeText={(state) => {
                                setState(state);
                                setStateErr(StateValidator(state));
                            }}
                            error={stateErr}>
                        </InputTextField>
                        <InputTextField  
                            placeholder="Country"
                            value={country}
                            maxLength={20}
                            onChangeText={(country) => {
                                setCountry(country);
                                setCountryErr(CountryValidator(country));
                            }}
                            error={countryErr}>
                        </InputTextField>
                        <ButtonField 
                            buttonText="Add Address"
                            onPress={() => Addaddress()}>
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
        backgroundColor:"#f0f0f0",
        justifyContent: 'center',
        padding: 20,
      },
      scrollViewConatiner:{
        flexGrow: 1, 
        justifyContent: 'center'
      },
      subheadingText:{
        color:"maroon",
        alignSelf: 'center',
        fontSize: 40,
        marginBottom: 40,
        fontWeight: 'bold',
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

  
  
  export default AddAddress;