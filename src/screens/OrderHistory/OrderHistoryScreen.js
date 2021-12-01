import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  FlatList,
  StyleSheet, 
  Dimensions, 
  TouchableOpacity
} from 'react-native';
import axios from 'axios';
import { Loading } from '../../components/Loder';
import { BASE_URL } from '../../config';
import HeaderScreen from '../../components/Header';
import { useSelector } from 'react-redux';


const { width } = Dimensions.get('window');

const OrderHistory = (props) => {
  const token = useSelector(state => state.token);
  const [data,setdata] = useState([]);
  const [loading,setLoading] =useState(false);

  useEffect(()=>{
    GetOrderList()
    setLoading(true)
  },[])
   
  const GetOrderList = () => {
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
                <View style={styles.orderView}>
                  <View style={styles.innerOrderView}>
                    <View>
                      <Text style={styles.orderHeading}>Order Id: <Text style={styles.orderText}>{item.invoice.slice(0,-12)}</Text></Text>
                      <Text style={styles.orderHeading}>Number of Items: <Text style={styles.orderText}>{item.productsInOrder.length}</Text></Text>
                      <Text style={styles.orderHeading}>Total Price: <Text style={styles.orderText}>₹ { item.totalPrice}</Text></Text>
                    </View>
                    <View style={{paddingLeft:20}}>
                      <TouchableOpacity onPress={() => props.navigation.navigate('OrderDetails',item)} style={styles.ordersDetailsButton}>
                        <Text style={styles.ordersDetailsButtonText}>Order Details</Text>
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
  innerView: {
    flex:1,
    padding:10,  
  },
  orderView: {
    width:width-20,
    elevation:5,
    backgroundColor:"#fff",
    marginBottom:10,
    paddingVertical:10
    ,paddingLeft:15
  },
  innerOrderView: {
    flexDirection:"row",
    alignItems:'center'
  },
  orderHeading: {
    fontSize:18,
    color:"maroon",
    fontWeight:'bold'
  },
  orderText: {
    color:"black",
    fontWeight:"normal"
  },
  ordersDetailsButton: {
    padding:10,
    borderWidth:1,
    borderColor:"maroon"
  },
  ordersDetailsButtonText: {
    color:"black",
    fontSize:16
  },
});

export default OrderHistory;