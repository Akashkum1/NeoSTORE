import React from 'react';
import { 
    View, 
    Text, 
    Image, 
    StyleSheet,  
    Dimensions, 
    ScrollView
} from 'react-native';
import HeaderScreen from '../../components/Header';

const{ width } = Dimensions.get('screen');

const OrderDetails = (props) => {
    const data =props.route.params;
    console.log(data);

    return(
        <View style={styles.orderDetailsContainer} >
            <HeaderScreen header="Order History"  onPress={() => props.navigation.goBack()}/>
            <View style={styles.innerView}>
                <ScrollView contentContainerStyle={{paddingBottom:20}}showsVerticalScrollIndicator={false}>
                <View style={styles.orderDetailsNoView}>
            <Text style={styles.orderDetailsTextHeading}>Order Id: <Text style={styles.orderDetailsText}>{data.invoice.slice(0,-12)}</Text></Text>
            <Text style={styles.orderDetailsTextHeading}>Date of Order: <Text style={styles.orderDetailsText}>{data.orderPlacedOn.slice(20,42)}</Text></Text>
            </View>
            <View style={styles.productPurchasedView}>
                <Text style={styles.productPurchasedHeading}>Products purchased:</Text>
                <View>
                    {data.productsInOrder.map((item,key) =>{
                        return(
                            <View key ={key}style={styles.productView}>
                            <View>
                                <Image 
                                    style={styles.productImg}
                                    resizeMode="center"
                                    source={{uri:`https://nameless-savannah-21991.herokuapp.com/images/productImages/${item.image}`}}
                                />
                            </View>
                            <View style={styles.productInnerView}>
                                <Text style={styles.productName}>{item.product}</Text>
                                <Text style={styles.productPrice}>₹ {item.price*item.quantity}</Text>
                                <Text style={styles.productcolorHeading}>Color: <Text style={styles.productColor}>{item.color}</Text></Text>
                                <Text style={styles.productcolorHeading}>Seller: <Text style={styles.productColor}>{item.seller}</Text></Text>
                            </View>
                            <View style={styles.qty}>
                                <Text style={styles.qtyText}>Qty- {item.quantity} </Text>
                            </View>
                        </View>
                        )
                    })}
                </View>
                <View style={styles.totalPriceView}>
                <Text style={styles.totalPriceHeading}>Total Amount: <Text style={styles.totalPriceText}>₹ {data.totalPrice}</Text></Text>
                </View>
            </View>
            </ScrollView>
             </View> 
        </View>  
    )
}
const styles = StyleSheet.create({
    orderDetailsContainer: {
        backgroundColor:"#f0f0f0",
        flex:1
    },
    innerView:{
        flex:1,
        padding:10,
        paddingTop:15
    },
    orderDetailsNoView: {
        backgroundColor:"#fff",
        padding:15
        ,elevation:5
    },
    orderDetailsTextHeading: {
        fontSize:18,
        color:"maroon",
        fontWeight:'bold'
    },
    orderDetailsText: {
        color:"black",
        fontWeight:"normal"
    },
    productPurchasedView: {
        flex:1
    },
    productPurchasedHeading: {
        paddingTop:20,
        color:"maroon",
        fontSize:20,
        fontWeight:"600",
        paddingBottom:5
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
        width:90,
        height:90
    },
    productInnerView: {
        paddingVertical:10
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
        color:"black"
        ,fontWeight:"500",
        fontSize:18
    },
    totalPriceView: {
        backgroundColor:"#fff",
        padding:10,
        marginTop:20,
        elevation:3
    },
    totalPriceHeading: {
        fontSize:18,
        color:"maroon",
        fontWeight:'bold'
    },
    totalPriceText: {
        color:"black"
    }
});

export default OrderDetails;