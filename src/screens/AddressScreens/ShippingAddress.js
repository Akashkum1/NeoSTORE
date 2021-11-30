import React, {useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Button, TouchableOpacity, ToastAndroid } from 'react-native';
import axios from 'axios';
import { Loading } from '../../components/Loder';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderScreen from '../../components/Header';
import { BASE_URL } from '../../config';
import { useSelector } from 'react-redux';

const ShippingAddress = (props) => {
  const token = useSelector(state => state.token)
  const cartId = useSelector(state => state.cartId)
  console.log(props.route.params['values']);
  const [addressDataResponse,setAddressDataResponse] = useState(null);
  const [addressData,setAddressData] = useState([]);

  useEffect(()=>{
    
    GetShippingAddress()
    props.navigation.addListener("focus",() => {
        GetShippingAddress()
    })
   },[props.navigation])

  const proceedToCheckOut = async(data) =>{
    var data={
      "address": {
        "address": data.address,
        "pincode": data.pincode,
        "city": data.city,
        "state": data.sate,
        "country": data.country
      }
    }
    console.log(props.cartId)
    var config = {
      method: "post",
      url: `${BASE_URL}/proceedToCheckout/`+`${cartId}`,
      headers: {
        "Content-Type": "application/json",
        'Authorization':`Bearer ${token} `
      },
      data,
  };
  await axios(config)
      .then (response => {
          // setLoading(false);
          if (response.status==200){
          // alert("You have successfully Logged In! Welcome to NeoStore")
          const data = response.data.data
          props.navigation.navigate('CheckOut',data)
          ToastAndroid.showWithGravityAndOffset("You have successfully selected address", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
          console.log(response.data)

          } 
      })
      .catch(function(error) {
          // setLoading(false);
          console.log(error);
      //     alert("There might be network issue or check the credentials")
      ToastAndroid.showWithGravityAndOffset("There might be network issue or check the credentials", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
      })
  }

  const GetShippingAddress = async()=> {
    await axios.get(`${BASE_URL}/getCustAddress`,{
      headers: {
          
        'Authorization':`Bearer ${token} `
          
      },
    })
     
    .then(response => {
      console.log(response.data);
      if (response.status === 200) {
        setAddressDataResponse(response.data);
        setAddressData(response.data.Addresses);
        console.log('after useeffect',addressData);
      }
    })
    .catch(function (error) {
      console.log(error);
    //   alert('There might me an network error');
    ToastAndroid.showWithGravityAndOffset("There might me an network error.Please login Again", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
    });
      
  }

  


  
  return (
    <View style={{flex:1}}>
        <HeaderScreen header="Shipping Address" onPress ={() =>props.navigation.goBack()}/> 
        {addressDataResponse === null?
        <Loading loading/> :
        <View style={styles.container}>
          {props.route.params['values']?<Text style={{color:"red",paddingBottom:10,fontSize:16}}>*Please Click on atleast one address to proceed to buy</Text>:null}
            {addressData === undefined?
                <View style={styles.nulladdress}>
                    <Text style={styles.nulladdressText}>Please Add Address for delivery of products</Text>
                </View>:
                <FlatList
                    data={addressData}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item._id}
                    renderItem={({item}) =>{
                    return(
                        <TouchableOpacity style={styles.addressContainer} onPress={() => proceedToCheckOut(item)} disabled={!props.route.params['values']}>
                            <View style={styles.topAddressContainer}>
                                <Text style={styles.address}>{item.address}</Text>
                                <Text style={[styles.address,{paddingTop:5}]}>{item.city}-{item.pincode}, {item.state}</Text>
                                <Text style={[styles.address,{paddingTop:5}]}>{item.country}</Text>
                            </View>
                            <TouchableOpacity 
                                style={styles.button}
                                onPress={() => {props.navigation.navigate('EditAddress',item)}}
                            >
                                <Text style={styles.buttonText}>Edit</Text>
                            </TouchableOpacity>
                                
                        </TouchableOpacity>
                    )
                    }}
                />
            }
            <TouchableOpacity onPress={() =>{props.navigation.navigate('AddAddress')}} style={{position:"absolute",bottom:50,right:25,flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                <Icon name="plus-circle" size={50} color="maroon" />
                <Text style={{color:"maroon",fontWeight:"bold",fontSize:16}}>Add Address</Text>
            </TouchableOpacity>
        </View> 
        }
    </View>
          
        
    
        
  );
};
  
  
const styles = StyleSheet.create({
  container:{
    padding:10,
    backgroundColor:"#f0f0f0",
    flex:1
  },
  subheadingText:{
    color:"maroon",
    textAlign: 'center',
    backgroundColor:"#fff",
    borderRadius:5,
    width:"100%",
    fontSize: 40,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  nulladdress:{
    alignItems:"center",
    paddingTop:40,
    paddingHorizontal:"20%"
  },
  nulladdressText:{
    color:"maroon",
    fontSize:20,
    textAlign:"center"
  },
  addressContainer:{
    backgroundColor:"#fff",
    marginBottom:20,
    borderColor:"black",
    borderWidth:0.5,
    borderRadius:5,
    elevation:5,
    padding:15,
  },
  topAddressContainer:{
    borderBottomColor:"black",
    borderBottomWidth:0.5,
    paddingBottom:5,
    marginBottom:10
  },
  address:{
      color:"black",
      fontSize:20,    
  },
  button:{
      width:"40%",
      borderColor:"maroon",
      borderWidth:1,
      borderRadius:5,
     
      padding:10,
      alignSelf:"center"
  },
  buttonText:{
      color:"maroon",
      fontSize:18,
      textAlign:"center"
  }
});





export default ShippingAddress;