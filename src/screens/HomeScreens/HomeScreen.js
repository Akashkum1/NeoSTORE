import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  FlatList,
  StyleSheet, 
  TextInput, 
  ToastAndroid, 
  Dimensions, 
  TouchableOpacity, 
  ScrollView,  
  Keyboard 
} from 'react-native';
import axios from 'axios';
import { Loading } from '../../components/Loder';
import  Icon  from 'react-native-vector-icons/MaterialIcons';
import { BASE_URL } from '../../config';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { Rating } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { LogBox } from 'react-native'; 
import { DrawerActions } from '@react-navigation/routers';

const { width } = Dimensions.get('window');



const Home = ({navigation}) => {
  const token= useSelector((state) => state.token);
  const [data,setdata] = useState(null);
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  
  useEffect(()=>{
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    console.log(token)
    CallProductDetail()
    GetCart()
    navigation.addListener("focus",() => {
      GetCart()
    })
  },[navigation])

  const GetCart = async() => {
    await axios.get(`${BASE_URL}/getCart`,{
      headers: { 
        'Authorization':`Bearer ${token}`  
      },
    })
    .then(response => {
      console.log("data",response.data);
      if (response.status === 200) {
        setCartCount(response.data.cart.productDetails.length)
      }
    })
    .catch(function (error) {
      console.log(error);
      // alert('There might me an network error');
      ToastAndroid.showWithGravityAndOffset("There might be network issue", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
    });   
  }

  const CallProductDetail = async() => {
    await axios.get('https://nameless-savannah-21991.herokuapp.com/getDashboard',{
      headers: {
        'Authorization':`Bearer ${token}`  
      },
    })
    .then(response => {
      console.log(response.data);
      if (response.status === 200) {
        setdata(response.data)
        console.log('after useeffect',data);
      }
    })
    .catch(function (error) {
      console.log(error);
      // alert('There might me an network error');
      ToastAndroid.showWithGravityAndOffset("There might be network issue", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
    });
      
  }
  
  const filterSearch = (searchText) => {
    setSearch(searchText)
    if(searchText != ""){
      console.log("url:", `${BASE_URL}/find/`+`${searchText}`,);
      SearchApi(searchText);
    }
    else{
      Keyboard.dismiss()
      setSearchData(null);
      setSearch("");
    }
  }


  const SearchApi = async(searchText) => {
    console.log(searchText)
    var config = {
        method: "post",
        url: `${BASE_URL}/find/`+`${searchText}`,
        headers: {
          'accept': '*/*',
          'Authorization':`Bearer ${token} `
        },
        data:'',
    };
    await axios(config)
    .then (response => {
      if (response.status==200){
        setSearchData(response.data.searchResult)
        // alert("You have successfully Logged In! Welcome to NeoStore")
        console.log(response.data)
      } 
    })
    .catch(function(error) {
      console.log(error);
      // alert("There might be network issue or check the credentials")
      ToastAndroid.showWithGravityAndOffset("There might be network issue or check the credentials", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
    })
  }

  return (
    <View style={styles.homeContainer} >
      <View style={styles.headerView}>
        <View style={styles.openDrawer}>
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Icon 
              name="menu"
              style={styles.headerIcon} 
              size={40} 
              color="maroon" 
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headerContent}>
          <Text style={styles.headerText}>Home</Text>
          <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Cart')}>
            <Icon name="shopping-cart" size={35} color="maroon" style={styles.cartIcon}/>
            {cartCount>0?
              <View style={styles.cartCount}>
                <Text style={styles.countText}>{cartCount}</Text>
              </View>:null
            }
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView  contentContainerStyle={styles.scrollViewConatiner} showsVerticalScrollIndicator={false}>
        <View style={styles.searchContainer}>
          <Icon name="search" size={30} color="grey"/> 
          <TextInput 
            style={styles.searchBarInput} 
            placeholder="Search for products"
            onChangeText={(text) => filterSearch(text)}>
          </TextInput>           
        </View>
        {search.length !== 0 ?
          <View style={styles.searchListView}>
            <FlatList
              data={searchData}
              showsVerticalScrollIndicator={false}
              pagingEnabled
              keyExtractor={(item) => item.id}
              renderItem={({item}) =>{
                return( 
                  <TouchableOpacity style={styles.searchResult} onPress={() => navigation.navigate("ProductDetails",item) }>
                      <Text style={styles.searchResultText} >{item.name}</Text>
                  </TouchableOpacity>
                )
              }}
            />
          </View>
          :
          <View style={styles.swiperView}>
            {data === null? 
              <Loading loading/> 
              :
              <View>
                <View style={styles.swiperInnerView}>
                  <SwiperFlatList
                    autoplay
                    autoplayDelay={3}
                    data={data.productOfEachCategory}
                    autoplayLoop 
                    index={1}
                    pagingEnabled={true}
                    paginationActiveColor={'maroon'}
                    showPagination 
                    paginationStyleItemActive={{ width:12, height:12, borderRadius:15 ,alignSelf:"center" }}
                    paginationStyleItemInactive={{ width:8, height:8, borderRadius:15 ,alignSelf:"center" }}
                    renderItem={({ item }) => (
                      <View style={styles.child}>
                        <TouchableOpacity onPress={() => navigation.navigate('AllProducts')}>
                          <Text style={styles.text}>{item.name}</Text>
                          <Image 
                            style={styles.swiperImg}
                            resizeMode="contain"
                            source={{uri:`https://nameless-savannah-21991.herokuapp.com/images/productImages/${item.image}`}}
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                  />
                </View>
                <View style={styles.topRatedProductsView}>
                  <Text  style={styles.topRatedProductsText}>Top Products for you</Text>
                  <FlatList
                    data={data.topRatedProducts}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) =>{
                      return (
                        <TouchableOpacity 
                          style={styles.productView}
                          onPress={() => navigation.navigate("ProductDetails",item)}>
                          <View style={{}}>
                            <Image 
                              style={styles.productViewImg}
                              resizeMode="center"
                              source={{uri:`https://nameless-savannah-21991.herokuapp.com/images/productImages/${item.image}`}}
                            />
                          </View>
                          <View style={styles.productInfoView}>
                            <Text style={styles.productName}>{item.name}</Text>
                            <Text style={styles.productPrice}>₹ {item.price}</Text>
                            <Rating style={styles.productRating} imageSize={18} readonly startingValue={item.rating} />
                          </View>
                        </TouchableOpacity>
                      )
                    }}
                  />
                </View>
              </View>
            }
          </View>
        }           
      </ScrollView>
    </View>
  );
};
   
const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:"#f0f0f0"
  },
  headerView: {
    backgroundColor:"#fff",
    flexDirection:"row",
    alignItems:"center",
    paddingVertical:10
  },
  openDrawer: {
    flex:0.4
  },
  headerIcon: {
    paddingLeft:10
  },
  headerContent: {
    flex:0.6,
    flexDirection:"row",
    alignItems:'center',
    justifyContent:'space-between'
  },
  headerText: {
    fontSize:30,
    fontWeight:"700",
    color:"maroon"
  },
  cartButton: {
    flexDirection:"row",
    alignItems:'center'
  },
  cartIcon: {
    paddingRight:25
  },
  cartCount: {
    position:'absolute',
    left:20,
    top:-10,
    backgroundColor:"red",
    width:25,
    height:25,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:40,
  },
  countText: {
    color:"#fff"
  },
  scrollViewConatiner: {
    flexGrow: 1,
    padding:8, 
    justifyContent: 'center'
  },  
  searchContainer: {
    backgroundColor:"#b5b5b5",
    flexDirection:"row",
    borderRadius:15,
    alignItems:"center",
    paddingLeft:15,
    marginBottom:10
  },
  searchBarInput: {
    flex:1,
    paddingLeft:15,
    fontSize:18,
  },
  searchListView: {
    flex: 1, 
    backgroundColor: 'white'
  },
  searchResult: {
    marginBottom:10,
    paddingTop:5,
    borderBottomWidth:0.5,
    paddingBottom:10
  },
  searchResultText: {
    fontSize:20,
    paddingLeft:10,
    color:"black"
  },
  swiperView: {
    flex:1
  },
  swiperInnerView: {
    width:"100%"
  },
  swiperImg: {
    width:width-20,
    height:150
  },
  child: { 
    width:width-20, 
    height:200, 
    backgroundColor:"#fff",
    borderRadius:10,
  },
  text: { 
    fontSize: 20, 
    textAlign:"center",
    color:"black",
    width:width-20,
    paddingBottom:3,
    marginBottom:5
  },
  topRatedProductsView: { 
    backgroundColor:"#f0f0f0",
    alignItems:"center",
    marginTop:25,
    borderRadius:10
  },
  topRatedProductsText: {
    fontSize:20,
    color:"maroon",
    paddingBottom:5
  },
  productView: {
    flexDirection:"row",
    width,
    backgroundColor:"#fff",
    marginVertical:5,
    elevation:3
  },
  productViewImg: {
    width:100,
    height:100
    ,margin:8
  },
  productInfoView: {
    marginLeft:30,
    paddingVertical:20
  },
  productName: {
    color:"black",
    fontSize:18,
    fontWeight:"bold"
  },
  productPrice: {
    color:"black",
    fontSize:16
  },
  productRating: {
    alignSelf: 'flex-start'
  }
});

export default Home;