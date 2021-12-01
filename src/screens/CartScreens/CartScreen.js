import React, { useEffect, useState } from 'react';
import {
  View,
  Modal,
  StyleSheet,
  ToastAndroid,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import HeaderScreen from '../../components/Header';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { Loading } from '../../components/Loder';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CartList from '../../components/CartList';
import { useSelector } from 'react-redux';

const {width} = Dimensions.get("screen");

const Cart = (props) => {
  const value = {values:true};
  const token = useSelector(state => state.token);
  const [data,setdata] = useState([]);
  const [cartDetails,setCartDetails] = useState("");
  const [loading,setLoading] =useState(false);
  const [showModal, setShowModal] = useState(false);
  const [total,setTotal] = useState(0);
  const [subtotal,setsubTotal] = useState(0);

  useEffect(() => {
    setLoading(true)
    GetCart()
    
  },[total])
  
  const sendDataToParent = (total,subtotal) => {
    setTotal(total);
    setsubTotal(subtotal);
  }

  const sendDataToParent1 = (total,subtotal,data) => {
    setTotal(total);
    setsubTotal(subtotal);
    setdata(data)
  }

  const proceedToBuy = async() => {
    await axios.get(`${BASE_URL}/proceedToBuy`,{
      headers: {
        'accept': '*/*' ,
        'Authorization':`Bearer ${token}`   
      },
    })
    .then(response => {
      console.log("data",response.data);
      if (response.status === 200) {
        console.log("cart",response.data)
        setLoading(false)
        props.navigation.navigate('ShippingAddress',value)
        // ToastAndroid.showWithGravityAndOffset("Please select delivery address by click on the address", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
      }
    })
    .catch(function (error) {
    setLoading(false)
      console.log(error);
      ToastAndroid.showWithGravityAndOffset("There might be network error,Please try again", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
    });
  }

  const GetCart = async() => {
    await axios.get(`${BASE_URL}/getCart`,{
      headers: {
        'Authorization':`Bearer ${token}`
      },
    })
    .then(response => {
      console.log("data",response.data);
      setLoading(false)
      if (response.status === 200) {
        setdata(response.data.cart.productDetails)
        console.log("datares",response.data.cart.productDetails)
        setCartDetails(response.data.cart)
          setTotal(response.data.cart.totalPrice)
          setsubTotal(response.data.cart.subTotalPrice)
        console.log("cart",response.data.cart.productDetails)
      }
    })
    .catch(function (error) {
    setLoading(false)
      console.log(error);
      alert('There might me an network error');
    });   
  }

  return(
    <View style={styles.cartContainer}>
      <HeaderScreen header="Cart" onPress={() => props.navigation.goBack()}/>
      {data.length === 0?
        <View style={styles.emptyCartView}>
          <Image style={styles.emptyCartImg} resizeMode="contain" source={require('../../assets/images/emptyCart.png')}/>
          <Text style={styles.emptyCartText}>Cart is empty!!!</Text>
        </View>
        :
        <View style={styles.cartItemsView}>
          <FlatList 
            data={data}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item._id}
            renderItem={({item,index}) =>{
              return (
                <CartList
                  index={index}
                  _id={cartDetails._id}
                  data={cartDetails}
                  product_Id={item._id}
                  productId={item.productId}
                  productName={item.productName}
                  orderQuantity={item.orderQuantity}
                  total={item.total}
                  productImage={item.productImage}
                  productColor={item.productColor}
                  productSeller={item.productSeller}
                  productStock={item.productStock}
                  productPrice={item.productPrice}
                  sendDataToParent={sendDataToParent}
                  sendDataToParent1={sendDataToParent1}
                />
              )
            }}
          />
        </View>
      }
      {data.length === 0?
        <View/>
        :
        <View style={styles.bottomView}>
          <View>
            <TouchableOpacity onPress={() => setShowModal(true)} style={styles.priceView}>
              <Text style={styles.bottomViewText1}>₹ {total}</Text>
            </TouchableOpacity>
          </View>
          <View >
            <TouchableOpacity style={styles.orderView} onPress={() => proceedToBuy()}>
              <Text style={styles.bottomViewText2}>Proceed To Buy</Text>
            </TouchableOpacity>
          </View>
        </View>
      }
      <Modal
        transparent={true}
        animationType="slide"
        visible={showModal}
        onRequestClose={() => { setShowModal(false) }}>
        <View style={styles.modalView}>
          <View style={styles.innermodalView}>
            <Icon name="close-circle" color="black" size={25} style={styles.iconClose} onPress={() => setShowModal(false)}/>
            <View style={styles.price}>
              <Text style={styles.priceText}>SubTotal Price:</Text>
              <Text style={styles.priceText}>{subtotal}</Text>
            </View>
            <View style={[styles.price1,styles.price]}>
              <Text style={styles.priceText}>Taxes:</Text>
              <Text style={styles.priceText}>{total - subtotal }</Text>
            </View>
            <View style={[styles.price2,styles.price]}>
              <Text style={styles.priceText}>Total Price:</Text>
              <Text style={styles.priceText}>{total}</Text>
            </View>
          </View>
        </View>
      </Modal>
      <Loading loading={loading}/> 
    </View>
  );
};


const styles=StyleSheet.create({
  cartContainer:{
    backgroundColor:"#f0f0f0",
    flex:1, 
  },
  emptyCartView:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  emptyCartImg:{
    height:width,
    width
  },
  emptyCartText:{
    color:"maroon",
    fontSize:40,
    fontWeight:"bold"
  },
  cartItemsView: {
    flex:1, 
    paddingHorizontal:10,
    marginTop:10
  },
  bottomView:{
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    paddingVertical:15,
    backgroundColor:"#fff"
  },
  iconClose:{
    alignSelf:'flex-end',
    paddingBottom:20
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
  modalView:{
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, .6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innermodalView:{
    backgroundColor: "#fff",
    paddingVertical:10,
    paddingHorizontal:20,
    width:"70%",
    borderRadius:5
  },
  price:{
    flexDirection:'row',
    justifyContent:"space-between",
    paddingHorizontal:10
  },
  price1: {
    paddingBottom:15,
    paddingTop:5,
    borderBottomWidth:1
  },
  price2: {
    paddingBottom:25,
    paddingTop:5
  },
  priceText:{
    color:'black',
    fontSize:20
  },
  bottomViewText1: {
    color:"maroon",
    fontSize:16,
    fontWeight:"bold"
  },
  bottomViewText2: {
    color:"#fff",
    fontSize:16,
    fontWeight:"bold"
  }
});

export default Cart;