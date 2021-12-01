import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  Image,  
  FlatList, 
  StyleSheet,  
  ToastAndroid, 
  Dimensions, 
  TouchableOpacity 
} from 'react-native';
import axios from 'axios';
import { Loading } from '../../components/Loder';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { BASE_URL } from '../../config';
import HeaderScreen from '../../components/Header';
import { Rating } from 'react-native-elements';
import { useSelector } from 'react-redux';

const { width } = Dimensions.get('window');

const AllProducts = (props) => {
  const token = useSelector(state => state.token)
  const [data,setdata] = useState([]);
  console.log(props.route.params)
  const [loading,setLoading] =useState(false);
  const [allData,setAllData] = useState(null)
  const [filter,setFilter] = useState(false);
    
  useEffect(()=>{
    GetAllProducts()
    setLoading(true)
  },[])
   
  const GetAllProducts = async()=> {
    setFilter(false)
    await axios.get(`${BASE_URL}/commonProducts`,{
      headers: { 
        'Authorization':`Bearer ${token}`
      },
    })
    .then(response => {
      console.log(response.data);
      setLoading(false)
      if (response.status === 200) {
        setdata(response.data.commonProducts)
        setAllData(response.data)
      }
    })
    .catch(function (error) {
      setLoading(false)
      console.log(error);
      ToastAndroid.showWithGravityAndOffset("There might me an network error", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
    });   
  }

  const FilterProductApi =async() => {
    setFilter(true)
    var config = {
      method: "post",
      url: `${BASE_URL}/filterCommonProducts`,
      headers: {
        "Content-Type": "application/json",
        'Authorization':`Bearer ${token}`,
        'accept': '*/*'
      },
      data: props.route.params,
    };
    console.log(config)
    await axios(config)
    .then(response => {
      if (response.status==200){
        setLoading(false);
        // alert("You have successfully updated your address!!")
        setdata(response.data.filteredcommonProducts)
        console.log(response.data)  
      } 
    })
    .catch(function(error) {
      console.log(error);
      setLoading(false);
      // alert("There might be network issue or check the credentials")
      ToastAndroid.showWithGravityAndOffset("There might be network issue or check the credentials", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
    })
  }

  return (
    <View style={styles.allProductsContainer} >
      <HeaderScreen header="Product List"  onPress={() => props.navigation.goBack()}/>
      {filter?
        <View style={styles.cancelFilterButton}>
          <TouchableOpacity style={styles.filterButton} onPress={() => GetAllProducts()}>
            <Text style={styles.filterButtonText}>Clear Filter</Text>
          </TouchableOpacity>
        </View>:
        null
      }
      <View style={styles.innerView}>
        {data.length===0?
          <Text style={styles.noProductsText}>No Products Found</Text>
          :
          <FlatList
            data={ data}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({item}) =>{
              return (
                <TouchableOpacity 
                  style={styles.productInfoView}
                  onPress={() => props.navigation.navigate("ProductDetails",item)}>
                  <View style={{}}>
                    <Image 
                      style={styles.productImg}
                      resizeMode="center"
                      source={{uri:`https://nameless-savannah-21991.herokuapp.com/images/productImages/${item.image}`}}
                    />
                  </View>
                  <View style={styles.productInfoLeftView}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.productPrice}>₹ {item.price}</Text>
                    <Rating style={styles.productRating} imageSize={18} readonly startingValue={item.rating} />
                  </View>
                </TouchableOpacity>
              )
            }}
          />
        }
        <View style={styles.filterView}>
          <TouchableOpacity style={styles.filterButton} onPress={() => props.navigation.navigate('FilterProducts',allData)}>
            <Icon name="filter" size={25} color="maroon" style={styles.filterButtonIcon}></Icon>
            <Text style={styles.filterButtonText}>Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton} onPress={() => FilterProductApi()}>
            <Text style={styles.filterButtonText}>Apply Filter</Text>
          </TouchableOpacity>
        </View>
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
  cancelFilterButton: {
    paddingHorizontal:30,
    paddingTop:10
  },
  innerView:{
    flex:1,
    padding:10
  },
  noProductsText: {
    color:"maroon",
    alignSelf:'center',
    fontSize:25,
    fontWeight:"bold"
  },
  productInfoView: {
    flexDirection:"row",
    width
    ,elevation:5,
    backgroundColor:"#fff",
    marginBottom:10,
    alignItems:"center",
    paddingVertical:10
  },
  productImg: {
    width:110,
    height:110,
    margin:10
  },
  productInfoLeftView: {
    marginLeft:30,
    paddingVertical:20
  },
  productName: {
    color:"black",
    fontSize:18,
    fontWeight:"bold",
    marginBottom:10
  },
  productPrice: {
    color:"black",
    fontSize:16,
    marginBottom:10
  },
  productRating: {
    alignSelf: 'flex-start',
    marginBottom:10
  },
  filterView:{
    width,
    backgroundColor:"#fff",
    position:"absolute",
    bottom:0,
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    paddingVertical:10,

},
filterButton:{
  flexDirection:"row",
  backgroundColor:"#fff",
  padding:5,
  paddingHorizontal:20,
  justifyContent:"center",
  alignItems:"center",
  borderColor:'maroon',
  borderWidth:1,
  borderRadius:10
},
filterButtonIcon:{
 paddingRight:5
},  
filterButtonText:{
  fontSize:20,
  color:"maroon",
  fontWeight:"600"
},
});

export default AllProducts;