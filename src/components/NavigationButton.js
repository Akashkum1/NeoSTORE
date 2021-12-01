import React from 'react';
import { 
    TouchableOpacity, 
    Text, 
    StyleSheet, 
    View 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const NavButton= (props) => {
    return(
        <TouchableOpacity style={styles.button} onPress={props.onPress}>
            <View style={styles.leftButtonView}>
                <Icon name={props.name} size={35} color="maroon"/>
                <Text style={styles.buttonText} >{props.navigationName}</Text>
            </View>
            <Icon name="arrow-forward" size={35} color="maroon"/>
        </TouchableOpacity>
    );
};

const styles= StyleSheet.create({
    button:{
        flexDirection:"row",
        width:"100%",
        backgroundColor:"#fff",
        justifyContent:"space-between",
        alignItems:'center',
        shadowColor:"black",
        borderColor:"black",
        borderTopWidth:0.1,
        borderLeftWidth:0.3,
        paddingHorizontal:15,
        paddingVertical:10,
        borderRadius:10,
        elevation:4,
        marginBottom:18
    },
    leftButtonView:{
        flexDirection:"row",
        alignItems:"center"
    },
    buttonText:{
        paddingLeft:10,
        color:"black",
        fontSize:18
    },
});
export default NavButton;