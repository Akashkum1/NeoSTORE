import React, { useState, useEffect, useRef} from 'react'
import { View, Text, Alert, ScrollView, ToastAndroid,StyleSheet, TouchableOpacity, Share, Modal, Image, FlatList, Dimensions, Animated } from 'react-native'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Rating } from 'react-native-elements';
import { BASE_URL } from '../../config';
import axios from 'axios';
import { Loading } from '../../components/Loder';
import HeaderScreen from '../../components/Header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux'; 


const { width } = Dimensions.get('window');



const ProductDetails = (props) => {

    const token = useSelector(state => state.token)
    const scrollX = useRef(new Animated.Value(0)).current;
    const id= props.route.params['id'];
    const color= props.route.params['color'];
    
    const [showmodal, setShowmodal] = useState(false);
    const [productData,setProductData] = useState(null);
    const [cartData, setCartData] = useState(null);
    const [colorDatac, setColorDatac] = useState(null);
    const [checkedColor, setCheckedColor] = useState(null);
    const [colorValue, setColorValue] = useState(null);
    const [colorData, setColorData] = useState(null);
    const [rating, setRating] = useState(1);
    const [present, setPresent] =useState(false)

    

    const Indicator = ({scrollX}) =>{
        return(
            <View style={{flexDirection:'row'}}>
                {productData.images.map((_, i) =>{
                    const inputRange = [(i-1)*width, i*width, (i+1)*width];
                    const scale = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.6, 1.2, 0.6],
                        extrapolate:"clamp" 
                    })
                    const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.5, 1, 0.5],
                        extrapolate:"clamp" 
                    })
                    return(
                        <Animated.View key={`indicator-${i}`} style={{height:10,width:10,opacity,borderRadius:5,backgroundColor:"maroon",margin:10,transform:[{scale}]}}/>
                    )
                })}
            </View>
        )
    }

    const ColorsAvailable = () =>{
        return(
            <View style={{flexDirection:'row'}}>
                {productData.colors.map((colors, i) =>{
                    return(
                        <View  key={`color-${i}`} style={{}}>
                            {i === 0 ?
                                <Text style={{fontSize:16,color:"black"}}> {colors.charAt(0).toUpperCase()+ colors.slice(1)}</Text> :
                                <Text style={{fontSize:16,color:"black"}}>, {colors.charAt(0).toUpperCase()+ colors.slice(1)}</Text>
                            }
                        </View>
                    )
                })}
            </View>
        )
    }



    useEffect(()=>{
        GetProductDetails()
       },[])

    
    
    
    
      const GetProductDetails = async()=> {
        await axios.get(`${BASE_URL}/getProductDetails/`+`${id}&`+`${color}`,{
          headers: {
              
            'Authorization':`Bearer ${token}`
              
          },
        })
         
        .then(response => {
          console.log(response.data);
          if (response.status === 200) {
              setProductData(response.data)
              setColorData(response.data.colors)
          }
        })
        .catch(function (error) {
          console.log(error);
          alert('There might me an network error');
        });
          
      }



      const addToCartApi = async(data)=> {
          
          console.log(id,colorData[colorValue])
          console.log(`${BASE_URL}/addToCart/`+`${id}&`+`${colorData[colorValue]}`)
          var config = {
            method: "post",
            url: `${BASE_URL}/addToCart/`+`${id}&`+`${colorData[colorValue]}`,
            headers: {
              'accept': '*/*',
              'Authorization':`Bearer ${token} `
    
            },
            data:'',
        };
        await axios(config)
        .then (response => {
            if (response.status==200){
              
            // alert("You have successfully Logged In! Welcome to NeoStore")
            if(data ===1){
                props.navigation.navigate('Cart')
            }
            ToastAndroid.showWithGravityAndOffset("Product added to cart successfully", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);

            } 
        })
        .catch(function(error) {
            console.log(error);
        //     alert("There might be network issue or check the credentials")
        ToastAndroid.showWithGravityAndOffset("There might be network issue or check the credentials", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        })
    
      
    }
    

    const onShare = async () => {
        try {
            const result = await Share.share({

                message:
                    'Checkout this product on NeoStore | ' + productData.name + ' ' + productData.description + '',

            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {

                } else {

                }
            } else if (result.action === Share.dismissedAction) {

            }
        } catch (error) {
            alert(error.message);
        }
    };

    const addCart = () => {
        if(checkedColor === null){
            // alert("Please select the Gender")
            ToastAndroid.showWithGravityAndOffset("Please select the Gender", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        }
        else{
        console.log(colorData[colorValue]);
        addToCartApi(0)
        }
    }
    const buyNow =  () => {
        if(checkedColor === null){
            // alert("Please select the Gender")
           
            ToastAndroid.showWithGravityAndOffset("Please select color", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        }
        else{
            
            console.log(colorData[colorValue]);
            addToCartApi(1);
        
        }
    }

    const addRating = async() =>{
        console.log(rating,id)
        console.log(`${BASE_URL}/addRating/`+`${id}&`+`${rating}`)
        var config = {
            method: "post",
            url: `${BASE_URL}/addRating/`+`${id}&`+`${rating}`,
            headers: {
                'accept': '*/*',
                'Authorization':`Bearer ${token} `
      
              },
            data:"",
            

        };
        await axios(config)
        .then (response => {
            if (response.status==200){
            
            setShowmodal(false)
            // alert("You have successfully Logged In! Welcome to NeoStore")
            ToastAndroid.showWithGravityAndOffset("Rating added successfully", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
            
            } 
            else{
                console.log(error)
            }
        })
        .catch(function(error) {
            console.log(error);
            setShowmodal(false)
        //     alert("There might be network issue or check the credentials")
        ToastAndroid.showWithGravityAndOffset("You have already rated this product", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        })
    }
   

    return (
        <View style={{flex:1}} >
            <HeaderScreen header={props.route.params['name']} onPress={() => props.navigation.goBack() }/>
            { productData ===null?<Loading loading/>:
            /* <ScrollView>*/
            <ScrollView contentContainerStyle={styles.main} showsVerticalScrollIndicator={false}>
                
                <FlatList
                  data={productData.images}
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  scrollEventThrottle={32}
                  pagingEnabled
                  onScroll={Animated.event(
                      [{nativeEvent: {contentOffset: {x: scrollX}}}],
                      {useNativeDriver:false}
                  )}
                  keyExtractor={(item, index) => index}
                  renderItem={({item}) =>{
                    return (
                      <View style={{width:width-20,alignItems:"center",backgroundColor:"#fff",paddingVertical:20}}>
                          <Image 
                            style={{width:width/1.5,height:width/1.5}}
                            resizeMode="contain"
                             source={{uri:`https://nameless-savannah-21991.herokuapp.com/images/productImages/${item}`}}
                          />
                      </View>
                    )
                  }}
                />
                <Indicator scrollX={scrollX}/>
                <View style={[{marginBottom:20},styles.returnView]}>
                    <Text style={styles.title}>{productData.name}</Text>
                    <Text style={styles.subtitle1}>{productData.description}</Text>
                    <Text style={styles.subtitle2}>{productData.features}</Text>
                    

                    <Text style={[{paddingBottom:0},styles.pricee]}>₹ {productData.price}</Text>
                    <View style={{flexDirection:"row",alignItems:"baseline",paddingBottom:5}}>
                        <Text style={{fontSize:18,color:"maroon",fontWeight:"bold"}}> Available in: </Text>
                        <ColorsAvailable/>
                    </View>
                    <View style={styles.colorView}>
                            <Text style={styles.colorViewText}> Select Color: </Text>
                            {colorData?.map((color, key) => {
                                return (
                                    <View key={color} >
                                        {checkedColor == key ? (
                                            <TouchableOpacity style={styles.colorButton}>
                                                <Icon
                                                    style={styles.icon}
                                                    size={25}
                                                    color="maroon"
                                                    name="checkbox-marked-circle"
                                                />
                                                <Text style={styles.colorText}>{color.charAt(0).toUpperCase()+ color.slice(1)}</Text>
                                            </TouchableOpacity>
                                            ) : (
                                            <TouchableOpacity
                                                onPress={() => {setCheckedColor(key); setColorValue(key)}}
                                                style={styles.colorButton}>
                                                <Icon
                                                    style={styles.icon}
                                                    size={25}
                                                    color="black"
                                                    name="checkbox-blank-circle-outline"
                                                />
                                                <Text style={styles.colorText}>{color.charAt(0).toUpperCase()+ color.slice(1)}</Text>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                );
                            })}

                        </View>
                </View>
                <View style={styles.returnView}>
                    <Text style={styles.title1}>Easy 30 days returns and exchanges</Text>
                    <Text style={styles.subtitle1}>Choose to return or exchange (if available) within 30 days.</Text>
                </View>
                
                <View style={styles.rateView}>
                    <Text style={{color:"black",fontSize:16}}> {productData.rating} </Text>
                    <Icons color="gold" name="star" size={25} />
                </View>

                <View style={styles.shareView}>
                    <TouchableOpacity onPress={() => onShare()}>
                        <View>
                            <Icons color="black" name="share" size={22} />
                        </View>
                    </TouchableOpacity>
                </View>
              
                </ScrollView>
            }
            <Modal
                transparent={true}
                animationType="slide"
                visible={showmodal}
                onRequestClose={() => { setShowmodal(false) }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.mainView}>
                            <Text onPress={() => { setShowmodal(false) }} style={{position:'absolute',top:-15,right:0,fontSize:20,fontWeight:"bold",color:"maroon"}}>x</Text>
                            <Text style={styles.selectStyle}>{productData?.name} </Text>
                        </View>
                        <Image resizeMode='contain' style={styles.img} source={{ uri: `https://nameless-savannah-21991.herokuapp.com/images/productImages/${productData?.images[1]}` }} />
                        <Rating style={styles.rating} imageSize={24} startingValue={1}  onFinishRating={rating => setRating(rating)} />
                        <View style={styles.rateView4}>

                            <TouchableOpacity onPress={() => addRating()}>
                                <Text style={styles.cartTitle2}> RATE NOW</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            { productData ===null?<View/>:
            <View style={styles.cartView}>
                    <Icon name="cart" size={40} color="#fff" style={styles.cartIcon} onPress={() => addCart()}/>
                    <TouchableOpacity style={styles.rateView3} onPress={() => { setShowmodal(true) }}>
                        <Icons color="gold" name="star" size={30} />
                        <Text style={styles.cartTitle2}> RATE </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.rateView2} onPress={() => buyNow()}>
                        <Icons color="#fff" name="shopping" size={30} />
                        <Text style={styles.cartTitle}> BUY NOW </Text>  
                    </TouchableOpacity>

            </View>}
        </View>
    )
}
const styles= StyleSheet.create({
    main: {
        alignItems:"center",
        backgroundColor:"#f0f0f0",
        padding:10
    },
    qtyView: {
        flexDirection: 'row',
        paddingLeft: 8,
        alignItems: 'center',
        padding: 4
    }, 
    rating: {
        padding: 8,
        marginTop: 8
    },
    img:{
        borderRadius: 8,
        height:200,
        padding: 4,
    },
    title: {
        color:"maroon",
        fontSize: 25,
        paddingLeft: 8,
        paddingTop: 8,
        fontWeight: 'bold'
    },
    title1: {
        color:"maroon",
        fontSize: 18,
        paddingLeft: 8,
        paddingTop: 8,
        fontWeight: 'bold'
    },
    subtitle1: {
        color:"black",
        fontSize: 16,
        paddingLeft: 8,
        paddingTop:4
    },
    subtitle2: {
        color:"black",
        fontSize: 16,
        paddingLeft: 8,
        paddingTop:4
    },
    pricee: {
        color:"maroon",
        fontSize: 18,
        paddingLeft: 8,
        paddingTop: 10,
        fontWeight: 'bold',
    },
    rowView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 4,
        alignItems: 'center',
    },
    returnView: {
        backgroundColor: '#fff',
        width:"100%",
        paddingHorizontal:10,
        paddingBottom:10,
        elevation:5

    },
    rateView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 5,
        paddingVertical:3,
        marginRight: 8,
        borderRadius: 20,
        borderWidth:0.1,
        position: 'absolute',
        top: 270,
        right: 15
    },
    colorView:{
        flexDirection:"row",
        alignItems:"center",
        paddingBottom:10
  },
  colorViewText:{
      color:"maroon",
      fontSize:18,
      paddingRight:10,
      fontWeight:"bold"

  },
  colorButton:{
      flexDirection:"row",
      alignItems:"center",
      paddingRight:15
  },
  icon:{
      paddingRight:5
  },
  colorText:{
      color:"black",
      fontSize:15,  
  },
  cartIcon:{
      position:"absolute",
      right:35,
      bottom:75,
      backgroundColor:"maroon",
      borderRadius:100,
      padding:10

  },
    shareView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 20,
        marginRight: 8,
        width: 40,
        height: 40,
        position: 'absolute',
        top: 20,
        right: 15,
        borderWidth:0.1
    },
    selectStyle:{
        color:"maroon",
        fontSize:20
    },
    rateView2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'maroon',
        paddingLeft: 4,
        marginRight: 8,
        borderRadius: 8,
        flex: 0.4,
        margin: 0,
        padding: 8,
    },
    rateView3: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor:"maroon",
        paddingLeft: 4,
        marginRight: 8,
        borderRadius: 8,
        flex: 0.4,
        margin: 8,
        padding: 8,
    },
    rateView4: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor:"maroon",
        paddingLeft: 4,
        marginRight: 8,
        borderRadius: 8,
        margin: 4,
        padding: 4,
    },
    cartView: {
        borderTopWidth:5,
        borderTopColor:"#f0f0f0",
        flexDirection: 'row',
        padding: 4,
        alignItems: 'baseline',
        backgroundColor: '#fff',
        justifyContent: 'space-around',
    },
    cartTitle: {
        
        fontWeight: 'bold',
        color: '#fff'
    },
    cartTitle2: {
        fontWeight: 'bold',
        color:"maroon",
    },
    mainView: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderBottomWidth: 0.5,
        margin: 8
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        width:"50%",
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
})




export default ProductDetails;