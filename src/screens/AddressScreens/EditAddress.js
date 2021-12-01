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
import { AddressValidator, CityValidator, PinCodeValidator, StateValidator, CountryValidator } from '../../components/validation';
import axios from 'axios';
import { BASE_URL } from '../../config';
import HeaderScreen from '../../components/Header';
import { Loading } from '../../components/Loder';
import { useSelector } from 'react-redux';

const EditAddress =(props) => {
    const token = useSelector(state => state.token);
    console.log(props.route.params['city']);
    console.log(props.route.params['pincode']);
    console.log(props.route.params['_id']);
    console.log(props.route.params['state']);
    console.log(props.route.params['address']);
    const id =props.route.params['_id'];
    const [address1, setAddress1] = useState(props.route.params['address']);
    const [address1Err, setAddress1Err] = useState(null);
    const [city, setCity] = useState(props.route.params['city']);
    const [cityErr, setCityErr] = useState(null);
    const [pinCode, setPinCode] = useState((props.route.params['pincode']).toString());
    const [pinCodeErr, setPinCodeErr] = useState(null);
    const [state, setState] = useState(props.route.params['state']);
    const [stateErr, setStateErr] = useState(null);
    const [country, setCountry] = useState(props.route.params['country']);
    const [countryErr, setCountryErr] = useState(null);
    const [loading, setLoading] = useState(false);

    const Editaddress = () => {
        if(address1.length === 0 || city.length === 0 || state.length === 0 || country.length === 0){
            // alert("Please enter the detail in Text Field!!")
            ToastAndroid.showWithGravityAndOffset("Please enter the detail in Text Field!!", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        }
        else if(address1Err != null || cityErr != null || stateErr != null || countryErr != null){
            // alert("Please enter the details correctly")
            ToastAndroid.showWithGravityAndOffset("Please enter the details correctly", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        } 
        else{
            setLoading(true);
            EditAddressApiRequest()
        }
    }

    const EditAddressApiRequest = async() => {
        const data={
            "addressId":id,
            "updatedAddress": {
              "address": address1,
              "pincode": pinCode,
              "city": city,
              "state": state,
              "country": country
            }
        } 
        var config = {
            method: "post",
            url: `${BASE_URL}/updateAddress`,
            headers: {
              "Content-Type": "application/json",
              'Authorization':`Bearer ${token} `
            },
            data,
        };
        await axios(config)
        .then(response => {
            if (response.status==200){
                setLoading(false);
                props.navigation.goBack();
                // alert("You have successfully updated your address!!")
                ToastAndroid.showWithGravityAndOffset("You have successfully updated your address!!", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
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
        <View style={styles.address}>
            <HeaderScreen header="Edit Address" onPress={() => props.navigation.goBack()}/>
            <KeyboardAvoidingView
                style={styles.loginContainer}
                behavior={Platform.OS == 'ios' ? 'padding' : null}
                enabled
                keyboardVerticalOffset={60}>
                <ScrollView contentContainerStyle={styles.scrollViewConatiner}>
                    <View>
                        <InputTextField  
                            placeholder="Address"
                            value={address1}
                            maxLength={100}
                            onChangeText={(address1) => {
                                setAddress1(address1);
                                setAddress1Err(AddressValidator(address1));
                            }}
                            error={address1Err}>
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
                            buttonText="Edit Address"
                            onPress={() => Editaddress()}>
                        </ButtonField>
                    </View>
                </ScrollView>
                <Loading loading={loading}/>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles= StyleSheet.create({
    address:{
        flex:1
    },
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor:"#f0f0f0",
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

export default EditAddress;