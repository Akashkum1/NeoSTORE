import React, { useEffect, useState } from 'react';
import { 
  View,
  Modal, 
  Image, 
  StyleSheet, 
  Text,  
  ScrollView, 
  TouchableOpacity, 
  ToastAndroid, 
  Dimensions
} from 'react-native';
import axios from 'axios';
import { Loading } from '../../components/Loder';
import { BASE_URL } from '../../config';
import HeaderScreen from '../../components/Header';
import { useSelector } from 'react-redux';
import { LogBox } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import { notificationManager } from '../../notifications/notification';

const {width} = Dimensions.get("screen");

const OrderSummary = (props) => {
  const localNotify =notificationManager;
  const token = useSelector(state => state.token);
  const [data, setData] = useState(null);
  const [product, setProduct] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const orderId = props.route.params["orderId"];
  
  useEffect(() =>{
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    localNotify.configure()
    ReviewOrderDetails()
    GetProfile()
    setLoading(true)
  },[])

  const sendPaymentNotification =() => {
    localNotify.showNotification(
      1,
      "RazorPay",
      `The payment towards order is recevied suceessfully`,
      {},
      {}
    )
  }

  const sendOrderConfirmation =() => {
    localNotify.showNotification(
      1,
      "Your Order is placed successfully!!",
      `Thank you for shopping with NeoSTORE`,
      {},
      {}
    )
  }
    
  const confirmOrder= async() => {
    setLoading(true)
    const url = 'https://api.razorpay.com/v1/orders';
    await axios.post(
      url,
      {
        amount: data?.totalPrice,
        currency: 'INR',
        receipt: `Receipt no.${data?.orderId}` ,
        payment_capture: 1,
      },
      {
        headers: {
          Authorization:'Basic' + ' cnpwX3Rlc3RfTG1GRjVRNnpIdkJpY3g6Y3ZNakdJMmhkRE8xRHE2MDlVWVpmZDE2',
        },
      },
      {
        auth: {
          username: 'rzp_test_sNviUf7IEdrSpk',
          password: '8BIkU4Jd353p3HNjD8QDwG71',
        },
      },
    )
    .then(response => {
      console.log(response.data);
      if (response.status == 200) {
        setLoading(false)
        var options = {
          description: 'Neostore Pvt. Ltd.',
          currency: 'INR',
          key: 'rzp_test_sNviUf7IEdrSpk',
          amount: data?.totalPrice,
          name: 'NeoSTORE',
          prefill: {
            email: data?.userEmail,
            contact: profileData?.mobile,
            name: data?.userName,
          },
          theme: {color: 'maroon'},
        };
        RazorpayCheckout.open(options)
        .then(async (data) => {
          console.log(data)
          sendPaymentNotification()
          placeOrder()
          ToastAndroid.showWithGravityAndOffset("Payment for Order is successfully received", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        })
        .catch((error) => {
          // handle failure
          console.log(error)
          ToastAndroid.showWithGravityAndOffset("Payment processing cancelled by user", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        });
      }
    }) 
    .catch (function (error) {
      console.log(error);
      setLoading(false)
      ToastAndroid.showWithGravityAndOffset( error, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
    });
  } 
  
  const placeOrder = async () => {
    var config = {
      method: "post",
      url: `${BASE_URL}/placeOrder/`+`${orderId}`,
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token} `
      },
    };
    await axios(config)
    .then (response => {
      if (response.status==200){
        setShowModal(true)
        console.log(response.data)
        sendOrderConfirmation()
        ToastAndroid.showWithGravityAndOffset("Your Order has been placed succesfully", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
      } 
    })
    .catch(function(error) {
        console.log(error.message);
        ToastAndroid.showWithGravityAndOffset("There might be some network issue if amount is deducted from your bank account, refund will be immediately initiated", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
    })
  }
  
  const GetProfile = async()=> {
    await axios.get(`${BASE_URL}/profile`,{
      headers: {
          
        'Authorization':`Bearer ${token} `
          
      },
    })
    .then(response => {
      console.log(response.data);
      if (response.status === 200) {
        setProfileData(response.data.userData);
      }
    })
    .catch(function (error) {
      console.log(error);
      //   alert('There might me an network error');
      ToastAndroid.showWithGravityAndOffset("There might me an network error.Please login Again", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
    });  
  }
    
  const ReviewOrderDetails = async() => {
    await axios.get(`${BASE_URL}/reviewOrderDetails/`+`${orderId}`,{
      headers: {
        'Authorization':`Bearer ${token}`
      },
    })
    .then (response => {
      setLoading(false);
      if (response.status==200){
        setData(response.data.order)
        setProduct(response.data.order.productDetails)
        console.log("mai",response.data)
        // props.navigation.navigate('PlaceOrder',orderId)
      } 
    })
    .catch(function(error) {
        setLoading(false);
        console.log(error.message);
        if(error.message ==="Request failed with status code 500")
          ToastAndroid.showWithGravityAndOffset("There might be some network issue", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
    })
  }


  return(
    <View style={styles.container}>
      <HeaderScreen header="Place Order" onPress={() => props.navigation.goBack()}/>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView} style={styles.styleScrollView}>
        {data === null?
          <Loading loading/>
          :
          <View>
            <View style={styles.addressView}>
              <View>
                <Text style={[styles.addressText,{fontWeight:"bold"}]}>{data?.userName}</Text>
                <Text style={[styles.addressText,{paddingBottom:10}]}>{data?.userEmail}</Text>
                <Text style={[styles.addressText,{fontWeight:"bold"}]}>Delivey Address:</Text>
                <Text style={styles.addressText}>{data?.address?.address}</Text>
                <Text style={styles.addressText}>{data?.address?.city} - {data?.address.pincode}  {data?.address?.country}</Text>
              </View>
              <View>
              </View>
            </View>
            <View style={styles.cartItemCount}>
              <Text style={styles.cartItemCountText}>Total Cart Items: ({product?.length} items)</Text>
              <ScrollView >
                {product?.map((item,key) =>{
                  return(
                    <View key ={key} style={styles.productView}>
                      <View>
                        <Image 
                          style={styles.productImg}
                          resizeMode="center"
                          source={{uri:`https://nameless-savannah-21991.herokuapp.com/images/productImages/${item.productImage}`}}
                        />
                      </View>
                      <View style={styles.productInnerView}>
                        <Text style={styles.productName}>{item.productName}</Text>
                        <Text style={styles.productPrice}>₹ {item.total}</Text>
                        <Text style={styles.productcolorHeading}>Color: <Text style={styles.productColor}>{item.productColor}</Text></Text>
                        <Text style={styles.productcolorHeading}>Seller: <Text style={styles.productColor}>{item.productSeller}</Text></Text>
                      </View>
                      <View style={styles.qty}>
                        <Text style={styles.qtyText}>Qty- {item.orderQuantity} </Text>
                      </View>
                    </View>
                  )  
                })}
                <Text style={styles.priceDetailsViewHeading}>Price Details</Text>
                <View style={styles.priceDetailsView}>
                  {product?.map((item,key) =>{
                    return(
                      <View key={key} style={styles.productPriceView}>
                        <View >
                          <Text style={styles.productPriceName}>{item.productName}    ({item.productColor}) ({item.orderQuantity})</Text>
                        </View>
                        <View >
                          <Text style={styles.productPriceText}>{item.total}</Text>
                        </View>
                      </View>
                    )
                  })
                  }
                </View>
                <View style={styles.productTaxesView}>
                  <View style={styles.productTaxesInnerView}>
                    <Text style={styles.productTaxesText}>Taxes:</Text>
                  </View>
                  <View >
                    <Text style={styles.productTaxesValue}>+          {data.totalPrice-data.subTotalPrice}</Text>
                  </View>
                </View>
                <View style={styles.productTotalView}>
                  <View style={styles.productTaxesInnerView}>
                    <Text style={styles.productTotalText}>Total Amount:</Text>
                  </View>
                  <View >
                    <Text style={styles.totalPrice}>{data.totalPrice}</Text>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        }
      </ScrollView> 
      <View>
        <View style={styles.bottomView}>
          <View >
            <View  style={styles.priceView}>
              <Text style={styles.bottomViewText1}>₹ {data?.totalPrice}</Text>
            </View>
          </View>
          <View >
            <TouchableOpacity style={styles.orderView} onPress={() => confirmOrder()}>
              <Text style={styles.bottomViewText2}>Confirm Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Modal transparent={false} animationType="slide" visible={showModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.confirmationHeading}>ORDER CONFIRMED </Text>
            <Image
              style={styles.orderSuccessImg}
              source={{
                uri: 'https://neoscrum.000webhostapp.com/success.gif',
              }}
            />
            <Text style={styles.orderSuccessText}>Thanks for placing order with</Text>
            <Text style={styles.orderSuccessText1}>NeoSTORE !</Text>
            <TouchableOpacity
              onPress={() => {
                setShowModal(false)
                props.navigation.navigate('Drawer');
              }}
              style={styles.orderOkButton}>
              <Text style={styles.orderOkText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Loading loading={loading}/>
    </View>
  )
}

const styles= StyleSheet.create({
  container: {
    flex:1
  },
  scrollView: {
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
    paddingVertical:15,
    marginTop:10
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
  cartItemCount: {
    paddingTop:20
  },
  cartItemCountText: {
    fontWeight:'900',
    fontSize:18,
    color:'black'
  },
  productView: {
    flexDirection:"row",
    width:width-20,
    backgroundColor:"#fff",
    justifyContent:"space-around",
    alignItems:"center",
    marginTop:5,
    elevation:3
  },
  productImg: {
    width:110,
    height:120
  },
  productInnerView: {
    paddingVertical:20
  },
  productName: {
    color:"black",
    fontSize:20,
    fontWeight:"bold",
    paddingBottom:10
  },
  productPrice: {
    color:"black",
    fontSize:18,
    fontWeight:"bold",
    paddingBottom:5
  },
  productcolorHeading: {
    color:"black",
    fontSize:18,
    fontWeight:"bold"
  },
  productColor: {
    fontWeight:"normal"
  },
  qty: {
    paddingRight:10
  },
  qtyText: {
    color:"black",
    fontWeight:"500",
    fontSize:18
  },
  priceDetailsViewHeading: {
    borderColor:"black",
    paddingLeft:10,
    paddingBottom:5,
    borderBottomWidth:0.4,
    fontSize:20,color:'black',
    fontWeight:"bold",
    paddingTop:8
  },
  priceDetailsView: {
    paddingBottom:5,
    paddingTop:5,
    flex:1
  },
  productPriceView: {
    flexDirection:"row",
    width:width-20,
    justifyContent:"space-between",
    alignItems:"center"
  },
  productPriceName: {
    color:"black",
    fontSize:18,
    paddingLeft:10,
    paddingBottom:2
  },
  productPriceText: {
    color:"black",
    fontSize:18,
    paddingRight:10,
    paddingBottom:2
  },
  productTaxesView: {
    flexDirection:"row",
    borderBottomWidth:0.4,
    width:width-20,
    justifyContent:"space-between",
    alignItems:"center"
  },
  productTaxesInnerView: {
    paddingVertical:2
  },
  productTaxesText: {
    color:"black",
    fontSize:18,
    paddingLeft:10,
    paddingBottom:2
  },
  productTaxesValue: {
    color:"black",
    fontSize:18,
    paddingRight:10,
    paddingBottom:2
  },
  productTotalView: {
    flexDirection:"row",
    paddingVertical:8,
    borderBottomWidth:0.4,
    width:width-20,
    justifyContent:"space-between",
    alignItems:"center"
  },
  productTotalText: {
    color:"black",
    fontSize:18,
    fontWeight:"bold",
    paddingLeft:10,
    paddingBottom:2
  },
  totalPrice: {
    color:"black",
    fontSize:18,
    fontWeight:"bold",
    paddingRight:10,
    paddingBottom:2
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
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
  },
  modalView: {
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  confirmationHeading: {
    fontSize:25,color:"black",fontWeight:"700"
  },
  orderSuccessImg: {
    height:200,width:200,marginVertical:10
  },
  orderSuccessText: {
    fontSize:18,color:"black"
  },
  orderSuccessText1: {
    fontSize:18,paddingBottom:15,color:"black"
  },
  orderOkButton: {
    backgroundColor:"maroon",paddingVertical:10,paddingHorizontal:30,borderRadius:25
  },
  orderOkText: {
      color: 'white', fontSize: 16 
  }                 
});

export default OrderSummary;