import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const ButtonField= (props) =>{
    return(
        <TouchableOpacity 
            style={styles.buttonField}
            onPress={props.onPress}>
            <Text style={styles.buttonFieldText}>{props.buttonText}</Text>
        </TouchableOpacity>
    )
}
const styles= StyleSheet.create({
    buttonField:{
        backgroundColor:"maroon",
        alignSelf:"center",
        paddingVertical:15,
        width:"100%",
        marginTop:15,
        borderRadius:8
    },
    buttonFieldText:{
        color:"#ffffff",
        textAlign:"center",
        fontSize:20
    },
});
export default ButtonField; 