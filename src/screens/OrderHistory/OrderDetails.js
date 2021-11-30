import React, {useEffect, useState} from 'react';
import { View, Text, Image, Modal, FlatList, StyleSheet, TextInput, ToastAndroid, Dimensions, TouchableOpacity, ScrollView, VirtualizedList, Keyboard } from 'react-native';
import HeaderScreen from '../../components/Header';

const{width}= Dimensions.get('screen')

const OrderDetails = (props) => {
    const data =props.route.params
    console.log(data);
    return(
        <View style={styles.allProductsContainer} >
        <HeaderScreen header="Order History"  onPress={() => props.navigation.goBack()}/>
            <View style={styles.innerView}>
                <ScrollView contentContainerStyle={{paddingBottom:20}}showsVerticalScrollIndicator={false}>
                <View style={{backgroundColor:"#fff",padding:15,elevation:5}}>
            <Text style={{fontSize:18,color:"maroon",fontWeight:'bold'}}>Order Id: <Text style={{color:"black",fontWeight:"normal"}}>{data.invoice.slice(0,-12)}</Text></Text>
            <Text style={{fontSize:18,color:"maroon",fontWeight:"bold"}}>Date of Order: <Text style={{color:"black",fontWeight:"normal"}}>{data.orderPlacedOn.slice(20,42)}</Text></Text>
            </View>
            <View style={{flex:1}}>
                <Text style={{color:'maroon',paddingTop:20,paddingBottom:5,fontWeight:"bold",fontSize:20}}>Products purchased:</Text>
                <View>
                    {data.productsInOrder.map((item,key) =>{
                        return(
                            <View key ={key}style={{flexDirection:"row",width:width-20,backgroundColor:"#fff",justifyContent:"space-around",alignItems:"center",marginTop:5,elevation:3}}>
                            <View style={{}}>
                                <Image 
                                    style={{width:90,height:90}}
                                    resizeMode="center"
                                    source={{uri:`https://nameless-savannah-21991.herokuapp.com/images/productImages/${item.image}`}}
                                />
                            </View>
                            <View style={{paddingVertical:10}}>
                                <Text style={{color:"black",fontSize:20,fontWeight:"bold",paddingBottom:10}}>{item.product}</Text>
                                <Text style={{color:"black",fontSize:18,paddingBottom:5}}>₹ {item.price*item.quantity}</Text>
                                <Text style={{color:"black",fontSize:18,fontWeight:"bold"}}>Color: <Text style={{fontWeight:"normal"}}>{item.color}</Text></Text>
                                <Text style={{color:"black",fontSize:18,fontWeight:"bold"}}>Seller: <Text style={{fontWeight:"normal"}}>{item.seller}</Text></Text>
                            </View>
                            <View style={{paddingRight:10}}>
                                <Text style={{color:"black",fontWeight:"500",fontSize:18}}>Qty- {item.quantity} </Text>
                            </View>
                        </View>
                        )
                    })}
                </View>
                <View style={{backgroundColor:"#fff",padding:10,marginTop:20,elevation:3}}>
                <Text style={{fontSize:18,color:"maroon",fontWeight:'bold'}}>Total Amount: <Text style={{color:"black"}}>₹ {data.totalPrice}</Text></Text>
                </View>
            </View>
            </ScrollView>
             </View> 
        </View>  
    )
}
const styles = StyleSheet.create({
    allProductsContainer: {
        backgroundColor:"#f0f0f0",
        flex:1
    },
  innerView:{
    flex:1,
    padding:10,
    paddingTop:15
  },


});


export default OrderDetails;