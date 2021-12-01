import React, { useState, useEffect } from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import {
    Text,
    View,
    StyleSheet,
    Image,
    ToastAndroid
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector} from "react-redux";
import { logout } from '../redux/actions';
import { Drawer } from 'react-native-paper';
import axios from 'axios';
import { BASE_URL } from '../config';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CustomDrawer = (props) => {
    const dispatch = useDispatch();
    const token = useSelector(state =>state.token);
    const [ profileData, setProfileData ] = useState(null);
    const [ profilePicData, setProfilePicData ] = useState(null);

    useEffect(() => {
        GetProfile()
        props.navigation.addListener("focus",() => {
            GetProfile()
        })
    },[props.navigation])

    const GetProfile = async() => {
        await axios.get(`${BASE_URL}/profile`,
            {headers: {'Authorization':`Bearer ${token} `},}
        ) 
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

    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props} >
                <View >
                    <View>
                        <View style={styles.drawerUserInfoView}>
                            <TouchableOpacity style={styles.drawerUserInfo} onPress={() => props.navigation.navigate('Profile')}>
                                <Image
                                    source={profilePicData===null? require('../assets/images/OIP.png'): {uri:`https://nameless-savannah-21991.herokuapp.com/images/user/${profilePicData}`}} 
                                    resizeMode="cover" 
                                    style={styles.img}
                                />
                                <Text style={styles.name}>{profileData?.firstName} {profileData?.secondName}</Text>
                            </TouchableOpacity>
                        </View>
                        <Drawer.Section>
                            <DrawerItem icon={({}) => 
                                (
                                    <MaterialCommunityIcons name="home"  color='maroon' size={28} />
                                )}
                                label="Home"
                                onPress={() =>{props.navigation.navigate("Home")}}
                            />
                        </Drawer.Section>
                        <Drawer.Section>
                            <DrawerItem
                                icon={({}) => 
                                (
                                    <MaterialCommunityIcons name="account" color='maroon' size={28} />
                                )}
                                label="My Account"
                                onPress={() =>{{props.navigation.navigate("Profile")}}}
                            />
                        </Drawer.Section>
                        <Drawer.Section>
                            <DrawerItem
                                icon={({}) => 
                                (
                                    <MaterialCommunityIcons name="sofa"  color='maroon' size={28} />
                                )}
                                label="All Products"
                                onPress={() =>{props.navigation.navigate("AllProducts")}}
                            />
                        </Drawer.Section>
                        <Drawer.Section>
                            <DrawerItem
                                icon={({}) => 
                                (
                                    <MaterialCommunityIcons name="cart"  color='maroon' size={28} />
                                )}
                                label="Cart"
                                onPress={() =>{props.navigation.navigate("Cart")}}/>
                        </Drawer.Section>
                        <Drawer.Section>
                            <DrawerItem
                                icon={({}) => (
                                    
                                    <Icon name="history-edu"  color='maroon' size={28} />
                                    
                                )}
                                label="Orders"
                                onPress={() =>{props.navigation.navigate("OrderHistory")}}/>

                        </Drawer.Section>
                        <Drawer.Section>
                            <DrawerItem
                                icon={({}) => 
                                (
                                    <Icon name="my-location"  color='maroon' size={28} />
                                )}
                                label="Store Locator"
                                onPress={() =>{props.navigation.navigate("StoreLocator")}}/>
                        </Drawer.Section>
                    </View>   
                </View>
            </DrawerContentScrollView>
            <Drawer.Section>
                <DrawerItem 
                    icon={({}) => 
                    (
                        <MaterialCommunityIcons name="exit-to-app" color='maroon' size={28}   />
                    )}
                    label="Signout"
                    onPress={() => dispatch(logout())}
                />
            </Drawer.Section>
        </View>
    );  
};

const styles = StyleSheet.create({
    drawerUserInfoView: {
        paddingLeft:15,
        paddingVertical:15,
        borderBottomWidth:0.5,
        borderBottomColor:"black"
    },
    drawerUserInfo: {
        alignSelf:"center",
        alignItems:"center",
        paddingRight:40
    },
    img: {
        height:130,
        width:130,
        borderRadius:300
    },
    name:{
        paddingTop:10,
        fontSize:20,
        fontWeight:"bold",
        color:"maroon"
    }
});

export default CustomDrawer;