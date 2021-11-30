import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const HeaderScreen= (props) =>{
    return(
        <View style={styles.headerView}>
            <View style={{flex:0.3}}>
                <TouchableOpacity onPress={props.onPress}>
                    <Icon 
                        name="arrow-left-bold-circle-outline"
                    style={styles.headerIcon} 
                        size={40} 
                        color="maroon" 
                    />
                </TouchableOpacity>
            </View>
            <View style={{flex:0.7}}>
                <Text style={styles.headerText}>{props.header}</Text>
            </View>
        </View>
    )
}
const styles= StyleSheet.create({
    headerView:{
        backgroundColor:"#fff",
        flexDirection:"row",
        alignItems:"center",
        paddingVertical:10
    },
    headerIcon:{
        paddingLeft:10
    },
    headerText:{
       fontSize:30,
       fontWeight:"700",
       color:"maroon"
    },
});


export default HeaderScreen; 