import React, {useEffect, useState} from 'react';
import { View, Image, StyleSheet, Text, FlatList, ScrollView, TouchableOpacity, ToastAndroid, Dimensions} from 'react-native';
import axios from 'axios';
import { Loading } from '../../components/Loder';
import { BASE_URL } from '../../config';
import HeaderScreen from '../../components/Header';
import { useSelector } from 'react-redux';
import { LogBox } from 'react-native';

const {width} = Dimensions.get("screen")


const CheckOut = (props) =>{
    const token = useSelector(state => state.token)
    console.log("hell",props.route.params)
    const data =props.route.params
    console.log(data);
    const _id = {orderId: data._id};
    console.log("orderid",_id)


    useEffect(() =>{
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    },[])
    

    return(
        <View style={{flex:1}}>
            <HeaderScreen header="My Cart" onPress={() => props.navigation.goBack()}/>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView} style={styles.styleScrollView}>
                <View style={styles.addressView}>
                    <View>
                        <Text style={[styles.addressText,{color:"maroon",fontWeight:"bold"},]}>Deliver to </Text>
                        <Text style={[styles.addressText,{fontWeight:"bold"}]}>{data.userName} , {data.address.pincode}</Text>
                        <Text style={styles.addressText}>{data.address.address}</Text>
                        <Text style={styles.addressText}>{data.address.city}, {data.address.country}</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.addressButton}>
                            <Text style={styles.addressButtonText}>Change</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{paddingBottom:10,paddingTop:5,flex:1}}>
                <FlatList
                  data={data.productDetails}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item) => item._id}
                  renderItem={({item}) =>{
                      console.log(item)
                    return (
                    
                            <View style={{flexDirection:"row",width:width-20,backgroundColor:"#fff",justifyContent:"space-around",alignItems:"center",marginTop:5,elevation:3}}>
                                <View style={{}}>
                                    <Image 
                                        style={{width:110,height:120}}
                                        resizeMode="center"
                                        source={{uri:`https://nameless-savannah-21991.herokuapp.com/images/productImages/${item.productImage}`}}
                                    />
                                </View>
                                <View style={{paddingVertical:20}}>
                                    <Text style={{color:"black",fontSize:20,fontWeight:"bold",paddingBottom:10}}>{item.productName}</Text>
                                    <Text style={{color:"black",fontSize:18,paddingBottom:5}}>₹ {item.total}</Text>
                                    <Text style={{color:"black",fontSize:18,fontWeight:"bold"}}>Color: <Text style={{fontWeight:"normal"}}>{item.productColor}</Text></Text>
                                    <Text style={{color:"black",fontSize:18,fontWeight:"bold"}}>Seller: <Text style={{fontWeight:"normal"}}>{item.productSeller}</Text></Text>
                                </View>
                                <View style={{paddingRight:10}}>
                                    <Text style={{color:"black",fontWeight:"500",fontSize:18}}>Qty- {item.orderQuantity} </Text>
                                </View>
                            </View> 
                    )
                  }}
                />
                </View>
                <View>
                    <Text style={{borderColor:"black",paddingLeft:10,paddingBottom:5,borderBottomWidth:0.4,fontSize:20,color:'black',fontWeight:"bold"}}>Price Details</Text>
                    <View style={{paddingBottom:5,paddingTop:5,flex:1}}>
                        <FlatList
                        data={data.productDetails}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item._id}
                        renderItem={({item}) =>{
                            console.log(item)
                            return (
                            
                                    <View style={{flexDirection:"row",width:width-20,justifyContent:"space-between",alignItems:"center"}}>
                                        
                                        <View >
                                            <Text style={{color:"black",fontSize:18,paddingLeft:10,paddingBottom:2}}>{item.productName}</Text>
                                        </View>
                                        <View >
                                            <Text style={{color:"black",fontSize:18,paddingRight:10,paddingBottom:2}}>{item.total}</Text>
                                        </View>
                                    </View> 
                            )
                        }}
                        />
                    </View>
                    <View style={{flexDirection:"row",borderBottomWidth:0.4,width:width-20,justifyContent:"space-between",alignItems:"center"}}>
                        <View style={{paddingVertical:2}}>
                            <Text style={{color:"black",fontSize:18,paddingLeft:10,paddingBottom:2}}>Taxes:</Text>
                        </View>
                        <View >
                            <Text style={{color:"black",fontSize:18,paddingRight:10,paddingBottom:2}}>+          {data.totalPrice-data.subTotalPrice}</Text>
                        </View>

                    </View>
                    <View style={{flexDirection:"row",paddingVertical:8,borderBottomWidth:0.4,width:width-20,justifyContent:"space-between",alignItems:"center"}}>
                        <View style={{paddingVertical:2}}>
                            <Text style={{color:"black",fontSize:18,fontWeight:"bold",paddingLeft:10,paddingBottom:2}}>Total Amount:</Text>
                        </View>
                        <View >
                            <Text style={{color:"black",fontSize:18,fontWeight:"bold",paddingRight:10,paddingBottom:2}}>{data.totalPrice}</Text>
                        </View>

                    </View>
                </View>
            </ScrollView>
            <View>
            <View style={styles.bottomView}>
                <View >
                    <View  style={styles.priceView}>
                        <Text style={{color:"maroon",fontSize:16,fontWeight:"bold"}}>₹ {data.totalPrice}</Text>
                    </View>
                </View>
                <View >
                    <TouchableOpacity style={styles.orderView} onPress={() => props.navigation.navigate('PlaceOrder',_id)}>
                        <Text style={{color:"#fff",fontSize:16,fontWeight:"bold"}}>Place Order</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
        </View>
    )
}





const styles= StyleSheet.create({
    scrollView:{
        paddingBottom:30
    },
    styleScrollView:{
        padding:10,
        flex:1
        
    },
    addressView:{
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:"#fff",
        alignItems:'center',
        paddingHorizontal:15,
        paddingVertical:15
    },
    addressText:{
        color:"black",
        fontSize:16
    },
    addressButton:{
        borderWidth:1,
        borderRadius:5,
        padding:13
    },
    addressButtonText:{
        color:"maroon",
        fontWeight:"bold",
        fontSize:16
    },
    bottomView:{
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center",
        paddingVertical:15,
        backgroundColor:"#fff"
      },
      priceView:{
        backgroundColor:"#fff",
        paddingVertical:10,
        paddingHorizontal:20,
        borderRadius:10,
        borderWidth:1,
        borderColor:"maroon"
    
      },
      orderView:{
        backgroundColor:"maroon",
        paddingVertical:10,
        paddingHorizontal:20,
        borderRadius:10,
      },
                    
});


  
  
  
  export default CheckOut;