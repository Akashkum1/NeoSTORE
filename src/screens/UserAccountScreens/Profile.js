import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ToastAndroid 
} from 'react-native';
import axios from 'axios';
import { Loading } from '../../components/Loder';
import HeaderScreen from '../../components/Header';
import { BASE_URL } from '../../config';
import NavButton from '../../components/NavigationButton';
import { useSelector } from 'react-redux';

const Profile = (props) => {
  const token =useSelector(state =>state.token);
  const value = {values:false};
  const [profileData, setProfileData] = useState(null);
  const [profilePicData, setProfilePicData] = useState(null);

  useEffect(()=>{
    GetProfile()
    props.navigation.addListener("focus",() => {
        GetProfile()
    })
  },[props.navigation])

  const GetProfile = async() => {
    await axios.get(`${BASE_URL}/profile`,{
      headers: {
          
        'Authorization':`Bearer ${token} `
          
      },
    })
    .then(response => {
      console.log(response.data);
      if (response.status === 200) {
        setProfileData(response.data.userData);
        setProfilePicData(response.data.userData.profilePic);
      }
    })
    .catch(function (error) {
      console.log(error);
      //   alert('There might me an network error');
      ToastAndroid.showWithGravityAndOffset("There might me an network error.Please login Again", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
    });   
  }

  return (
    <View style={styles.container1}>
      <HeaderScreen header="My Account" onPress={() => props.navigation.goBack()}/> 
      {profileData === null?
        <Loading loading/> :
        <View style={styles.container}>
          <View style={styles.profileView}>
            <Image
              source={profilePicData===null? require('../../assets/images/OIP.png'): {uri:`https://nameless-savannah-21991.herokuapp.com/images/user/${profilePicData}`}} 
              resizeMode="cover" 
              style={styles.profileImg}
            />
            <View style={styles.detailsView}>
              <Text style={[styles.profileViewText,{fontWeight:"700",fontStyle:"normal"}]}>{profileData.firstName} {profileData.secondName}</Text>
              <Text style={styles.profileViewText}>{profileData.email}</Text>
              <Text style={styles.profileViewText}>{profileData.mobile}</Text>
            </View>
            <NavButton name="history-edu" navigationName="Order History" onPress={() => props.navigation.navigate('OrderHistory')}/>
            <NavButton name="shopping-cart" navigationName="Cart" onPress={() => props.navigation.navigate('Cart')}/>
            <NavButton name="location-city" navigationName="Shipping Address" onPress={() =>props.navigation.navigate('ShippingAddress',value)}/>
            <NavButton name="edit" navigationName="Edit Profile" onPress={() => {props.navigation.navigate("EditProfile",profileData);console.log("sent",profileData)}}/>
            <NavButton name="lock" navigationName="Reset Password" onPress={() => props.navigation.navigate("ResetPassword")}/>
          </View>  
        </View> 
      } 
    </View>      
  );
};
  
  
const styles = StyleSheet.create({
  container1:{
    flex:1
  },
  container:{
    padding:10,
    backgroundColor:"#f0f0f0",
    flex:1
  },
  detailsView:{
    paddingBottom:20
  },
  profileImg:{
    alignSelf:"center",
    height:130,
    width:130,
    borderRadius:300,
    borderWidth:5,
    borderColor:"white"
  },
  profileView:{
    alignItems:"center"
  },
  profileViewText:{
    alignSelf:"center",
    fontSize:18,
    color:"black",
    fontWeight:"300",
    fontStyle:"italic",
  },
    
});


export default Profile;