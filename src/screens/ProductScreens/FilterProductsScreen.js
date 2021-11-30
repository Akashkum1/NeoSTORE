import React, {useEffect, useState,useSelector} from 'react';
import { View, Text, Image, Modal, FlatList, StyleSheet, TextInput, ToastAndroid, Dimensions, TouchableOpacity, ScrollView, VirtualizedList, Keyboard } from 'react-native';
import axios from 'axios';
import { Loading } from '../../components/Loder';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { BASE_URL } from '../../config';
import HeaderScreen from '../../components/Header';
import {Rating} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';



const { width } = Dimensions.get('screen');
 const FilterProducts = (props) => {
  console.log(props.route.params)
  const data = props.route.params
  const[categoryList,setCategoryList] = useState([])
  const[colorList,setColorList] = useState([])
      const [checkedOption, setCheckedOption] = useState(0);
    const [optionValue, setOptionValue] = useState("asc");
    const [pickerValue, setPickerValue] = useState("price")
    var option = ['Low to High', 'High to Low'];
    const Value= (key) => {
        if(key ===0){
            setOptionValue("asc")
        }
        else{
            setOptionValue("desc")
        }

    }
  const data1 = { 
                    "categories":categoryList,
                    "colors":colorList,
                    "sort": {
                        "basedOn": pickerValue,
                        "order":optionValue 
                      }
                
            }
        
 
 
        return(
            <View style={styles.filterContainer} >
                <HeaderScreen header="Filter"  onPress={() => props.navigation.goBack()}/>
                <ScrollView style={styles.innerView} contentContainerStyle={{paddingBottom:30}}>
                    <View style={{marginBottom:20}}>
                        <Text style={{color:"maroon",fontSize:25,fontWeight:"bold"}}>Categories</Text>
                        <View style={{flexDirection:"row",flexWrap:"wrap"}}>
                    {data.allCategories.map((item,key) =>{
                         const[checked1,setChecked] = useState(false)

                         const toggleValue1 =() =>{
                            setChecked(!checked1)
                            if(!checked1){
                            setCategoryList([...categoryList,item])
                            console.log(categoryList)
                            }
                            else{
                                setCategoryList(categoryList.filter((item1)=>{
                                    return(
                                        item1 !== item
                                    )
                                }))
                                console.log(categoryList)
                            }
                            

                        }
                        return(
                            <TouchableOpacity key={key}  onPress={() => toggleValue1()} style={{flexDirection:"row",alignContent:"space-between",alignContent:"center",marginVertical:5,flexBasis:'35%'}}>
                                {checked1 === true?
                                <Icon name="checkbox-marked" size={30} color="maroon" />:
                                <Icon name="checkbox-blank-outline" size={30} color="black" />}
                                <Text style={{color:"black",fontSize:20,paddingLeft:5}}>{item}</Text>
                            </TouchableOpacity>  
                        )
                    })}
                    </View>
                    </View>
                    <View style={{marginBottom:20}}>
                        <Text style={{color:"maroon",fontSize:25,fontWeight:"bold"}}>Colors</Text>
                        <View style={{flexDirection:'row',flexWrap:"wrap"}}>
                        {data.allColors.map((item,key) =>{
                         const[checked1,setChecked] = useState(false)

                         const toggleValue1 =() =>{
                            setChecked(!checked1)
                            if(!checked1){
                            setColorList([...colorList,item])
                            console.log(colorList)
                            }
                            else{
                                setColorList(colorList.filter((item1)=>{
                                    return(
                                        item1 !== item
                                    )
                                }))
                                console.log(colorList)
                            }
                            

                        }
                        return(
                            <TouchableOpacity key={key} onPress={() => toggleValue1()} style={{flexDirection:"row",alignContent:"space-between",alignContent:"center",marginVertical:5,flexBasis:"33%"}}>
                                {checked1 === true?
                                <Icon name="checkbox-marked" size={30} color="maroon" />:
                                <Icon name="checkbox-blank-outline" size={30} color="black" />}
                                <Text style={{color:"black",fontSize:20,paddingLeft:5}}>{item}</Text>
                            </TouchableOpacity>  
                        )
                    })}
                    </View>
                    </View>
                    <View style={styles.sortFilter}>
                             <Text style={{color:"maroon",fontSize:25,fontWeight:"bold"}}>Sort By</Text>
                             <View style={{borderWidth:1,borderColor:"black",marginVertical:10}}>
                             <Picker style={{color:"maroon"}} selectedValue={pickerValue} onValueChange={(itemValue) => setPickerValue(itemValue)}>
                                 <Picker.Item label="Price" value="price"/>
                                 <Picker.Item label="Rating" value="rating"/>
                           </Picker>                           
                           </View>                             
                           <View style={{alignItems:"center",paddingTop:5}}>                           
                           <Text style={{fontSize:20,fontWeight:"bold",color:"black",alignSelf:'flex-start'}}>Select Options: </Text>
                                 <View style={{alignItems:"center",flexDirection:"row"}}>
                                 {option.map((option, key) => {
                                    return (
                                        <View key={option} >
                                            {checkedOption == key ? (
                                                <TouchableOpacity style={{flexDirection:"row",alignItems:'center',paddingRight:15,paddingVertical:10}}>
                                                    <Icon
                                                        style={{}}
                                                        size={30}
                                                        color="maroon"
                                                        name="checkbox-marked-circle"
                                                    />
                                                    <Text style={{fontSize:20,color:"black"}}>{option}</Text>
                                                </TouchableOpacity>
                                                ) : (
                                                <TouchableOpacity
                                                    onPress={() => {setCheckedOption(key); Value(key)}}
                                                    style={{flexDirection:"row",alignItems:"center",paddingRight:15,paddingVertical:10}}>
                                                    <Icon
                                                        style={{}}
                                                        size={30}
                                                        color="black"
                                                        name="checkbox-blank-circle-outline"
                                                    />
                                                    <Text style={{fontSize:20,color:"black"}}>{option}</Text>
                                                </TouchableOpacity>
                                            )}
                                        </View>
                                    );
                                })}
                            </View>
                        </View>
                        </View>
                    <TouchableOpacity style={{padding:10,backgroundColor:"maroon",marginTop:20}} onPress={() => props.navigation.navigate('AllProducts',data1)}>
                    <Text style={{color:"#fff",fontWeight:"bold",fontSize:18,textAlign:"center"}}>Add Filter</Text>
                </TouchableOpacity>
                </ScrollView>
                
            </View>
        )


};
  
  
const styles = StyleSheet.create({
    filterContainer: {
        backgroundColor:"#f0f0f0",
        flex:1
    },
  innerView:{
    flex:1,
    padding:10
  },
  filterView:{
    width,
    position:"absolute",
    bottom:0,
    flexDirection:"row",
    backgroundColor:"#f0f0f0",
    justifyContent:"space-around",
    paddingVertical:10,

},
filterButton:{
    width:"70%",
    flexDirection:"row",
    backgroundColor:"#fff",
    padding:10,
    justifyContent:"center",
    alignItems:"center",
    borderColor:'maroon',
    borderWidth:1,
    borderRadius:10
},
filterButtonIcon:{
 paddingRight:20
},  
filterButtonText:{
    fontSize:20,
    color:"maroon",
    fontWeight:"600"
},
planeText:{
    fontSize:20,
    color:"#fff",
    fontWeight:"600"
},
modalView:{
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(225, 225, 225, 0.9)',
    paddingTop:60,
    padding:10,
    flex:1
            
},
closeIcon:{
    alignSelf:'flex-end',
    position:'absolute',
    top:10,
    right:10,
    zIndex:10
}, 
categoryList:{
    color:"black",
    fontSize:24,
    fontWeight:"bold",
},
filter:{
    flexDirection:'row',
    alignItems:"center"
},
filterButton1:{
    backgroundColor:"#fff",
    margin:10,
    padding:10,
    borderRadius:10,
    borderColor:"maroon",
    borderWidth:1
},
button:{
    backgroundColor:"maroon",
    margin:10,
    padding:10,
    borderRadius:10,
},
buttonDeselect:{
    backgroundColor:"#fff",
    margin:10,
    padding:10,
    borderRadius:10,
    borderColor:"maroon",
    borderWidth:1
},
buttonSelectText:{
    fontSize:18,
    color:"#fff",
},
buttonDeselectText:{
    fontSize:18,
    color:"maroon",
    
},
filterText:{
    fontSize:18,
    color:"maroon"
},
filterHeading:{
    color:"black",
    fontSize:20,
    fontWeight:"600",
    paddingLeft:10
},
});


export default FilterProducts;