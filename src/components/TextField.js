import React from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const InputTextField = (props) => {
    return (
      <View style={styles.inputOuterField}>
        <View style={styles.inputFieldContainer}>
          <View style={styles.leftInputfield}>
            {props.iconName? <Icon name={props.iconName} size={20} color="black" style={{paddingRight:10}}/> : null}
            <TextInput 
              placeholder={props.placeholder}
              placeholderTextColor="black"
              value={props.value}
              onChangeText={props.onChangeText}
              maxLength={props.maxLength}
              keyboardType={props.keyboardType}
              style={props.type === "password"? styles.textInputWithPassword:styles.textInput}
              secureTextEntry={props.secure}>
            </TextInput>
          </View>
          {props.type === "password"?
            <TouchableOpacity
              onPress={() =>  props.setSecure(!props.secure)}
              style={styles.passwordIcon}>
              <Icon
                name={props.secure ? 'eye-slash' : 'eye'}
                size={20}
                color="black"
              />
            </TouchableOpacity>:null
          }
          
        </View>
        {props.error? 
        <Text style={styles.errorText}>*{props.error}</Text>
        : null}
      </View>
    );
};

const styles= StyleSheet.create({
  inputOuterField:{
    marginBottom:15,
    backgroundColor:"#f0f0f0"

  },
  inputFieldContainer:{
    flexDirection:"row",
    backgroundColor:"#fff",
    borderWidth:1,
    borderColor:"black",
    paddingLeft:15,
    alignItems:"center",
    justifyContent:"space-between"
  },
  leftInputfield:{
    flexDirection:"row",
    alignItems:"center"
  },
  textInput:{
    fontSize:20,
    width:"100%"
  },
  textInputWithPassword:{
    fontSize:20,
    width:"85%"
  },
  passwordIcon:{
    paddingRight:10
  },
  errorText:{
    color:"red",
    fontSize:17
  },
});

export default InputTextField;