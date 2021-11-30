import React, {useEffect, useState} from 'react';
import { View, Text, Image, Modal, FlatList, StyleSheet, TextInput, ToastAndroid, Dimensions, TouchableOpacity, ScrollView, VirtualizedList, Keyboard } from 'react-native';
import axios from 'axios';
import { Loading } from '../../components/Loder';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { BASE_URL } from '../../config';
import HeaderScreen from '../../components/Header';
import { useSelector } from 'react-redux';
import { color } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const OrderHistory = (props) => {
  const token = useSelector(state => state.token)
    const [data,setdata] = useState([]);
    const [loading,setLoading] =useState(false);


  useEffect(()=>{
    GetOrderList()
    setLoading(true)
    
   },[])
   
  const GetOrderList = ()=> {
    axios.get(`${BASE_URL}/getOrders`,{
      headers: {
          
        'Authorization':`Bearer ${token}`
          
      },
    })
    .then(response => {
      console.log(response.data);
      setLoading(false)
      if (response.status === 200) {
        setdata(response.data.ordersDetails)
      }
    })
    .catch(function (error) {
    setLoading(false)
      console.log(error);
      alert('There might me an network error');
    });
      
  }
  return (
    <View style={styles.allProductsContainer} >
        <HeaderScreen header="Order History"  onPress={() => props.navigation.goBack()}/>
            <View style={styles.innerView}>
                <FlatList
                    data={data}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item,index) => index}
                    renderItem={({item}) =>{
                        return (
                            
                            <View style={{width:width-20,elevation:5,backgroundColor:"#fff",marginBottom:10,paddingVertical:10,paddingLeft:15}}>
                            <View style={{flexDirection:"row",alignItems:'center'}}>
                            <View>
                            <Text style={{fontSize:18,color:"maroon",fontWeight:'bold'}}>Order Id: <Text style={{color:"black",fontWeight:"normal"}}>{item.invoice.slice(0,-12)}</Text></Text>
                            <Text style={{fontSize:18,color:"maroon",fontWeight:'bold'}}>Number of Items: <Text style={{color:"black",fontWeight:"normal"}}>{item.productsInOrder.length}</Text></Text>
                            
                            <Text style={{fontSize:18,color:"maroon",fontWeight:'bold'}}>Total Price: <Text style={{color:"black",fontWeight:"normal"}}>₹ { item.totalPrice}</Text></Text>
                          </View>
                          <View style={{paddingLeft:20}}>
                              <TouchableOpacity onPress={() => props.navigation.navigate('OrderDetails',item)} style={{padding:10,borderWidth:1,borderColor:"maroon"}}>
                                <Text style={{color:"black",fontSize:16}}>Order Details</Text>
                              </TouchableOpacity>
                               
                          </View>
                          </View>
                          </View>
                          
                        )
                    }}
                />

            </View> 
            <Loading loading={loading}/>          
    </View>
          
        
    
        
  );
};
  
  
const styles = StyleSheet.create({
    allProductsContainer: {
        backgroundColor:"#f0f0f0",
        flex:1
    },
  innerView:{
    flex:1,
    padding:10,
    
  },
  filterView:{
    width,
    position:"absolute",
    bottom:0,
    flexDirection:"row",
    backgroundColor:"#f0f0f0",
    justifyContent:"space-around",
    paddingVertical:10,

},
filterButton:{
    width:"70%",
    flexDirection:"row",
    backgroundColor:"#fff",
    padding:10,
    justifyContent:"center",
    alignItems:"center",
    borderColor:'maroon',
    borderWidth:1,
    borderRadius:10
},
filterButtonIcon:{
 paddingRight:20
},  
filterButtonText:{
    fontSize:20,
    color:"maroon",
    fontWeight:"600"
},

});






export default OrderHistory;