import React, { useEffect } from 'react';
import { 
    View, 
    Image, 
    StyleSheet, 
    Text, 
    FlatList, 
    ScrollView, 
    TouchableOpacity, 
    Dimensions
} from 'react-native';
import HeaderScreen from '../../components/Header';
import { useSelector } from 'react-redux';
import { LogBox } from 'react-native';

const {width} = Dimensions.get("screen");

const CheckOut = (props) => {
    const token = useSelector(state => state.token);
    console.log("hell",props.route.params);
    const data =props.route.params;
    console.log(data);
    const _id = {orderId: data._id};
    console.log("orderid",_id)

    useEffect(() =>{
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    },[])
    
    return(
        <View style={styles.container}>
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
                <View style={styles.CheckOutProductsView}>
                <FlatList
                    data={data.productDetails}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item._id}
                    renderItem={({item}) =>{
                        console.log(item)
                        return (
                            <View style={styles.productView}>
                                <View >
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
                    }}
                />
                </View>
                <View>
                    <Text style={styles.priceDetailsViewHeading}>Price Details</Text>
                    <View style={styles.priceDetailsView}>
                        <FlatList
                            data={data.productDetails}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item) => item._id}
                            renderItem={({item}) =>{
                                console.log(item)
                                return (
                                    <View style={styles.productPriceView}>
                                        <View>
                                            <Text style={styles.productPriceName}>{item.productName}</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.productPriceText}>{item.total}</Text>
                                        </View>
                                    </View> 
                                )
                            }}
                        />
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
                </View>
            </ScrollView>
            <View>
                <View style={styles.bottomView}>
                    <View >
                        <View  style={styles.priceView}>
                            <Text style={styles.bottomViewText1}>₹ {data.totalPrice}</Text>
                        </View>
                    </View>
                    <View >
                        <TouchableOpacity style={styles.orderView} onPress={() => props.navigation.navigate('PlaceOrder',_id)}>
                            <Text style={styles.bottomViewText2}>Place Order</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles= StyleSheet.create({
    container: {
        flex:1
    },
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
    CheckOutProductsView: {
        paddingBottom:10,
        paddingTop:5,
        flex:1
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
        fontWeight:"bold"
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

export default CheckOut;