import React, { useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Dimensions, 
    TouchableOpacity, 
    ScrollView
} from 'react-native';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderScreen from '../../components/Header';
import { Picker } from '@react-native-picker/picker';

const { width } = Dimensions.get('screen');

const FilterProducts = (props) => {
    console.log(props.route.params);
    const data = props.route.params;
    const[categoryList,setCategoryList] = useState([]);
    const[colorList,setColorList] = useState([]);
    const[checkedOption, setCheckedOption] = useState(0);
    const[optionValue, setOptionValue] = useState("asc");
    const[pickerValue, setPickerValue] = useState("price");
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
                <View style={styles.filterView}>
                    <Text style={styles.filterName}>Categories</Text>
                    <View style={styles.filterOptionsView}>
                        {data.allCategories.map((item,key) =>{
                            const[checked1,setChecked] = useState(false);

                            const toggleValue1 =() => {
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
                                <TouchableOpacity key={key}  onPress={() => toggleValue1()} style={styles.optionsView}>
                                    {checked1 === true?
                                    <Icon name="checkbox-marked" size={30} color="maroon" />:
                                    <Icon name="checkbox-blank-outline" size={30} color="black" />}
                                    <Text style={styles.optionsText}>{item}</Text>
                                </TouchableOpacity>  
                            )
                        })}
                    </View>
                </View>
                <View style={styles.filterView}>
                    <Text style={styles.filterName}>Colors</Text>
                    <View style={styles.filterOptionsView}>
                        {data.allColors.map((item,key) =>{
                            const[checked1,setChecked] = useState(false);

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
                                <TouchableOpacity key={key} onPress={() => toggleValue1()} style={styles.optionsView}>
                                    {checked1 === true?
                                        <Icon name="checkbox-marked" size={30} color="maroon" />:
                                        <Icon name="checkbox-blank-outline" size={30} color="black" />
                                    }
                                    <Text style={styles.optionsText}>{item}</Text>
                                </TouchableOpacity>  
                            )
                        })}
                    </View>
                </View>
                <View>
                    <Text style={styles.filterName}>Sort By</Text>
                    <View style={styles.pickerView}>
                        <Picker style={styles.pickerValue} selectedValue={pickerValue} onValueChange={(itemValue) => setPickerValue(itemValue)}>
                            <Picker.Item label="Price" value="price"/>
                            <Picker.Item label="Rating" value="rating"/>
                        </Picker>                           
                    </View>                             
                    <View style={styles.subOptionsView}>                           
                        <Text style={styles.subOptionsText}>Select Options: </Text>
                        <View style={styles.subOptions}>
                            {option.map((option, key) => {
                                return (
                                    <View key={option} >
                                        {checkedOption == key ? (
                                            <TouchableOpacity style={styles.optionValue}>
                                                <Icon
                                                    size={30}
                                                    color="maroon"
                                                    name="checkbox-marked-circle"
                                                />
                                                <Text style={styles.optionValueText}>{option}</Text>
                                            </TouchableOpacity>
                                            ) : (
                                            <TouchableOpacity
                                                onPress={() => {setCheckedOption(key); Value(key)}}
                                                style={styles.optionValue}>
                                                <Icon
                                                    size={30}
                                                    color="black"
                                                    name="checkbox-blank-circle-outline"
                                                />
                                                <Text style={styles.optionValueText}>{option}</Text>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                </View>
                    <TouchableOpacity style={styles.addFilterButton} onPress={() => props.navigation.navigate('AllProducts',data1)}>
                        <Text style={styles.addFilterButtonText}>Add Filter</Text>
                    </TouchableOpacity>
            </ScrollView>       
        </View>
    );
};
  
  
const styles = StyleSheet.create({
    filterContainer: {
        backgroundColor:"#f0f0f0",
        flex:1
    },
    innerView: {
        flex:1,
        padding:10
    },
    filterView: {
        marginBottom:20
    },
    filterName: {
        color:"maroon",
        fontSize:25,
        fontWeight:"bold"
    },
    filterOptionsView: {
        flexDirection:"row",
        flexWrap:"wrap"
    },
    optionsView: {
        flexDirection:"row",
        alignContent:"space-between",
        alignContent:"center",
        marginVertical:5,
        flexBasis:'35%'
    },
    optionsText: {
        color:"black",
        fontSize:20,
        paddingLeft:5
    },
    pickerView: {
        borderWidth:1,
        borderColor:"black",
        marginVertical:10
    },
    pickerValue: {
        color:"maroon"
    },
    subOptionsView: {
        alignItems:"center",
        paddingTop:5
    },
    subOptionsText: {
        fontSize:20,
        fontWeight:"bold",
        color:"black",
        alignSelf:'flex-start'
    },
    subOptions: {
        alignItems:"center",
        flexDirection:"row"
    },
    optionValue: {
        flexDirection:"row",
        alignItems:'center',
        paddingRight:15,
        paddingVertical:10
    },
    optionValueText: {
        fontSize:20,
        color:"black"
    },
    addFilterButton: {
        padding:10,
        backgroundColor:"maroon",
        marginTop:20
    },
    addFilterButtonText: {
        color:"#fff",
        fontWeight:"bold",
        fontSize:18,
        textAlign:"center"
    },
});


export default FilterProducts;