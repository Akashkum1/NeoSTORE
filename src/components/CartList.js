import React, { useState } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../config/index';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector} from 'react-redux';
import { Loading } from './Loder';



const {width} = Dimensions.get("window");


const CartList = (props) => {
  const token = useSelector(state => state.token);
  const [qty, setqty] = useState(props.orderQuantity);
  const eachProductPrice = props.total/props.orderQuantity;
  const [productPrice, setProductPrice] = useState(props.total);
  const [loading, setLoading] = useState(false);


  const add = (qty) => {
    setqty(qty)
    setProductPrice(productPrice + eachProductPrice)
    setLoading(true)
    const qqhqq = qty
    const hs = qty*props.productPrice
    console.log("1",qqhqq,qty)
    console.log("2",hs,productPrice)
    let myCardData = [...props.data.productDetails]
    myCardData[props.index] = {
      '_id': props.data._id,
      'productId': props.productId,
      'orderQuantity': qty,
      "productName": props.productName,
      "productSeller": props.productSeller,
      "productColor": props.productColor,
      "productImage": props.productImage,
      "productStock": props.productStock,
      "productPrice": props.productPrice,
      "total": hs
    }
    console.log(myCardData)  
    updateCartApi(myCardData)
  };

  const subtract = (qty) =>{
    if(qty>0){
      setqty(qty)
      setProductPrice(productPrice-eachProductPrice)
      setLoading(true)
      const qqhqq = qty
      const hs = qty*props.productPrice
      console.log("1",qqhqq,qty)
      console.log("2",hs,productPrice)
      let myCardData = props.data.productDetails
      myCardData[props.index]={
        '_id': props.data._id,
        'productId': props.productId,
        'orderQuantity': qty,
        "productName": props.productName,
        "productSeller": props.productSeller,
        "productColor": props.productColor,
        "productImage": props.productImage,
        "productStock": props.productStock,
        "productPrice": props.productPrice,
        "total": hs
      }
      updateCartApi(myCardData)
    }
  }

  const clearProduct = () => {
    let array =props.data.productDetails
    console.log(array,array[0]._id,props.product_Id)
    const filteredData = array.filter((item,index) => index !== props.index)
    console.log("filterData",filteredData)
    let array1 =props.data.productIds
    console.log(array1,array1[0],props.data.productIds[props.index])
    const filteredData1 = array1.filter((item,index) => index !== props.index)
    console.log("filtetdat2",filteredData1)
    deleteItem(filteredData,filteredData1)
  } 



  const deleteItem = async(data1, data2) => {
    var data = {
      "cart": {
        "productIds": data2,
        "_id":props.data._id,
        "productDetails":data1
      }
    }
    var config = {
      method: "post",
      url: `${BASE_URL}/updateCart`,
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      data,
    };
    await axios(config)
    .then(response => {
      if (response.status==200){
        // alert("You have successfully updated your address!!")
        props.sendDataToParent1(response.data.cartData.totalPrice,response.data.cartData.subTotalPrice,response.data.cartData.productDetails)
        ToastAndroid.showWithGravityAndOffset("You have successfully updated the cart!!", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        console.log(response.data)  
      } 
    })
    .catch(function(error) {
      console.log(error);
      // alert("There might be network issue or check the credentials")
      ToastAndroid.showWithGravityAndOffset("There might be network issue or check the credentials", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
    })
  }

  const updateCartApi = async(data1) => {
    var data = { 
      "cart": {
        "productIds": props.data.productIds,
        "_id":props.data._id,
        "productDetails":data1
      }
    }
    console.log(data);
    var config = {
      method: "post",
      url: `${BASE_URL}/updateCart`,
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      data,
    };
    await axios(config)
    .then(response => {
      if (response.status==200){
        // alert("You have successfully updated your address!!")
        setLoading(false)
        props.sendDataToParent(response.data.cartData.totalPrice,response.data.cartData.subTotalPrice,response.data.cartData.productDetails)
        ToastAndroid.showWithGravityAndOffset("You have successfully updated the cart!!", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        console.log(response.data)  
      } 
    })
    .catch(function(error) {
      console.log(error);
      setLoading(false)
      // alert("There might be network issue or check the credentials")
      ToastAndroid.showWithGravityAndOffset("There might be network issue or check the credentials", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
    })
  }

  return(
    <View style={styles.cartCardView}>
      <View>
        <Image 
          style={styles.cartCardImg}
          resizeMode="center"
          source={{uri:`https://nameless-savannah-21991.herokuapp.com/images/productImages/${props.productImage}`}}
        />
      </View>
      <View style={styles.cartCardLeftView}>
        <Text style={styles.name}>{props.productName}</Text>
        <View style={styles.qtyUpdate}>
          <TouchableOpacity onPress={() =>subtract(qty-1)}>
            <Icon name="minus-circle" size={25} color="black" style={styles.iconUpdate1}/>
          </TouchableOpacity>
          <Text style={styles.qty}>{qty}</Text>
          <TouchableOpacity onPress={() =>add(qty+1)}>
            <Icon name="plus-circle" size={25} color="black"style={styles.iconUpdate2}/>
          </TouchableOpacity>
        </View>
        <Text style={styles.total}>₹ {productPrice}</Text>
        <Text style={styles.productColor}>Color: <Text style={styles.productColorValue}>{props.productColor.charAt(0).toUpperCase()+ props.productColor.slice(1)}</Text></Text>
        <Text style={styles.productColor}>Seller: <Text style={styles.productColorValue}>{props.productSeller}</Text></Text>
      </View>
      <TouchableOpacity style={styles.deleteItem} onPress={() => clearProduct()} >
        <Icon name="delete" size={25} color="black" />
      </TouchableOpacity>
      <Loading/>
    </View>
  );

};

const styles = StyleSheet.create({
  cartCardView: {
    flexDirection:"row",
    width,
    backgroundColor:"#fff",
    alignItems:"center",
    marginVertical:8,
    elevation:3,
  },
  cartCardImg: {
    width:120,
    height:140,
    margin:8
  },
  cartCardLeftView: {
    marginLeft:30,
    paddingVertical:20
  },
  name: {
    color:"black",
    fontSize:22,
    fontWeight:"bold",
    paddingBottom:10
  },
  qtyUpdate: {
    flexDirection:"row",
    paddingBottom:10
  },
  iconUpdate1: {
    paddingRight:10
  },
  iconUpdate2: {
    paddingLeft:10
  },
  qty: {
    fontSize:18,
    color:"black"
  },
  total: {
    color:"black",
    fontSize:20,
    fontWeight:"bold",
    paddingBottom:5
  },
  productColor: {
    color:"black",
    fontSize:18,
    fontWeight:"bold",
    paddingBottom:5
  },
  productColorValue: {
    fontWeight:"bold"
  },
  deleteItem: {
    position:"absolute",
    bottom:20,
    right:40
  },
});

export default CartList;