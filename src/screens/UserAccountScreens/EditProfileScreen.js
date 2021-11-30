import React, {useState} from 'react';
import { View, StyleSheet, Text, KeyboardAvoidingView, Modal, PermissionsAndroid, ScrollView, TouchableOpacity, ToastAndroid, Image} from 'react-native';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import ButtonField from '../../components/Button';
import InputTextField from '../../components/TextField';
import {NameValidator, PhoneNumberValidator } from '../../components/validation';
import axios from 'axios';
import { Loading } from '../../components/Loder';
import { BASE_URL } from '../../config';
import HeaderScreen from '../../components/Header';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { useSelector } from 'react-redux';





const EditProfile = (props) =>{
    console.log(props.route.params['gender'])
    const token =useSelector(state => state.token)
    const [firstName, setFirstName] = useState(props.route.params['firstName']);
    const [firstNameErr, setFirstNameErr] = useState(null);
    const [lastName, setLastName] = useState(props.route.params['secondName']);
    const [lastNameErr, setLastNameErr] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(props.route.params['mobile'].toString());
    const [phoneNumberErr, setPhoneNumberErr] = useState(null);
    const [checkedGender, setCheckedGender] = useState(null);
    const [genderValue, setGenderValue] = useState(null)
    var gender = ['Male', 'Female'];
    const [loading, setLoading] = useState(false);
    const [profilePicData, setProfilePicData] = useState(`https://nameless-savannah-21991.herokuapp.com/images/user/${props.route.params['profilePic']}`);
    const [showmodal,setShowmodal] = useState(false);
    console.log(`https://nameless-savannah-21991.herokuapp.com/images/user/${props.route.params['profilePic']}`)
    const setGender= (key) => {
        if(key ===0){
            setGenderValue("Male")
        }
        else{
            setGenderValue("Female")
        }

    }
    const Editprofile = () =>{
        if(firstName.length === 0 || lastName.length === 0 || phoneNumber.length === 0 ){
            // alert("Please enter the detail in Text Field!!")
            ToastAndroid.showWithGravityAndOffset("Please enter the detail in Text Field!!", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        }
         else if(firstNameErr != null || lastNameErr != null ||  phoneNumberErr != null){
            // alert("Please enter the details correctly")
            ToastAndroid.showWithGravityAndOffset("Please enter the details correctly", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        } 
        else if(checkedGender === null){
            // alert("Please select the Gender")
            ToastAndroid.showWithGravityAndOffset("Please select the Gender", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        }
        else{
            setLoading(true);
            Edit()
        }
    }


    const Edit = async() =>{
        const data={
            "profileDetails": {
              "firstName": firstName,
              "secondName": lastName,
              "gender": genderValue,
              "mobile": phoneNumber
            }
        } 
        console.log(data)
        var config = {
            method: "post",
            url: `${BASE_URL}/updateprofile`,
            headers: {
              "Content-Type": "application/json",
              'Authorization':`Bearer ${token} `

            },
            data,
        };
        await axios(config)
            .then(response => {
                if (response.status==200){
                    setLoading(false);
                    // alert("You have successfully updated your address!!")
                    ToastAndroid.showWithGravityAndOffset(response.data.message, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
                    console.log(response.data)
                    props.navigation.goBack(); 
                } 
            })
            .catch(function(error) {
                setLoading(false);
                console.log(error.message);
                ToastAndroid.showWithGravityAndOffset("Please check the credentials as your phone number is same as someone else phone number OR There might be some network issue", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
            })
            
        
    }
    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.CAMERA,
              {
                title: 'Camera Permission',
                message: 'App needs camera permission',
              },
            );
            // If CAMERA Permission is granted
            return granted === PermissionsAndroid.RESULTS.GRANTED;
          } catch (err) {
            console.warn(err);
            return false;
          }
        } else return true;
      };
    
      const requestExternalWritePermission = async () => {
        if (Platform.OS === 'android') {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                title: 'External Storage Write Permission',
                message: 'App needs write permission',
              },
            );
            // If WRITE_EXTERNAL_STORAGE Permission is granted
            return granted === PermissionsAndroid.RESULTS.GRANTED;
          } catch (err) {
            console.warn(err);
            alert('Write permission err', err);
          }
          return false;
        } else return true;
      };
    
      const captureImage = async () => {
        let options = {
          mediaType: "photo",
          cameraType:"front",
          maxWidth: 300,
          maxHeight: 550,
          quality: 1,
          saveToPhotos: true,
        };
        let isCameraPermitted = await requestCameraPermission();
        let isStoragePermitted = await requestExternalWritePermission();
        if (isCameraPermitted && isStoragePermitted) {
          launchCamera(options, (response) => {
            console.log('Response = ', response);
    
            if (response.didCancel) {
            //   alert('User cancelled camera picker');
                ToastAndroid.showWithGravityAndOffset("User closed the camera", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
                setShowmodal(false)
                return;
            } else if (response.errorCode == 'camera_unavailable') {
            //   alert('Camera not available on device');
                ToastAndroid.showWithGravityAndOffset("Camera not available on device", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
                setShowmodal(false)
              return;
            } else if (response.errorCode == 'permission') {
            //   alert('Permission not satisfied');
                ToastAndroid.showWithGravityAndOffset("Permission not satisfied", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
                setShowmodal(false)
              return;
            } else if (response.errorCode == 'others') {
            //   alert(response.errorMessage);
                ToastAndroid.showWithGravityAndOffset(response.errorMessage, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
                setShowmodal(false)
              return;
            }
            else{
                console.log('uri -> ', response.assets[0].uri);
                console.log('width -> ', response.assets[0].width);
                console.log('height -> ', response.assets[0].height);
                console.log('fileSize -> ', response.assets[0].fileSize);
                console.log('type -> ', response.assets[0].type);
                console.log('fileName -> ', response.assets[0].fileName);
                setProfilePicData(response.assets[0].uri)
                editprofilepicApiRequest(response.assets[0])
            }
            
          });
        }
      };

    const openGallery = () =>{
        let options = {
            mediaType: "photo",
            maxWidth: 180,
            maxHeight: 130,
            quality: 1,
          };
          launchImageLibrary(options, (response) => {
            console.log('Response = ', response);
      
            if (response.didCancel) {
            //   alert('User cancelled camera picker');
                ToastAndroid.showWithGravityAndOffset("User closed the image gallery", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
                setShowmodal(false)
              return;
            } else if (response.errorCode == 'camera_unavailable') {
            //   alert('Camera not available on device');
                ToastAndroid.showWithGravityAndOffset("Camera not available on device", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
                setShowmodal(false)
              return;
            } else if (response.errorCode == 'permission') {
            //   alert('Permission not satisfied');
                ToastAndroid.showWithGravityAndOffset("Permission not satisfied", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
                setShowmodal(false)
              return;
            } else if (response.errorCode == 'others') {
            //   alert(response.errorMessage);
                ToastAndroid.showWithGravityAndOffset(response.errorMessage, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
                setShowmodal(false)
              return;
            }
            else{
                console.log('uri -> ', response.assets[0].uri);
                console.log('width -> ', response.assets[0].width);
                console.log('height -> ', response.assets[0].height);
                console.log('fileSize -> ', response.assets[0].fileSize);
                console.log('type -> ', response.assets[0].type);
                console.log('fileName -> ', response.assets[0].fileName);
                setProfilePicData(response.assets[0].uri)
                editprofilepicApiRequest(response.assets[0])
            }
          }); 
     }

    const editprofilepicApiRequest = async(image) =>{
        var data = new FormData();
        let headers = {
            'accept': '*/*',
            'Content-Type': 'multipart/form-data',
            'Authorization':`Bearer ${token}`
        };
        data.append("profile-pic", {
            uri: image.uri,
            type: image.type, 
            name:image.fileName
        });
        console.log(" form data", data)
        await axios.post(
            'https://nameless-savannah-21991.herokuapp.com/updateProfilePic',
            data,
            {headers}
        )
        .then(response => {
            if (response.status==200){
                // alert("Successfully edited your profile pic")
                ToastAndroid.showWithGravityAndOffset("Successfully edited your profile pic", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
                setShowmodal(false)
                console.log(response.data)
            } 
        })
        .catch(function(error) {
            console.log(error);
            // alert("There might be network issue.Try Again")
            ToastAndroid.showWithGravityAndOffset("There might be network issue.Try Again", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
            setShowmodal(false)
        });
    }
    
    return(
        <View style={{flex:1}}>
            <HeaderScreen header="Edit Profile" onPress={() => props.navigation.goBack()}/>
            <KeyboardAvoidingView
                style={styles.loginContainer}
                behavior={Platform.OS == 'ios' ? 'padding' : null}
                enabled
                keyboardVerticalOffset={60}>
                <ScrollView contentContainerStyle={styles.scrollViewConatiner} showsVerticalScrollIndicator={false}>
                    <View>
                        <Image
                            source={props.route.params['profilePic']===null? require('../../assets/images/OIP.png'): {uri:profilePicData}} 
                            resizeMode="cover" 
                            style={styles.profileImg}
                        />
                        <Icon name="plus" size={40} color="#fff" style={styles.editProfilePic} onPress={() => setShowmodal(true)}/>
                        <InputTextField 
                            iconName="user" 
                            placeholder="First Name"
                            value={firstName}
                            maxLength={25}
                            onChangeText={(firstName) => {
                                setFirstName(firstName);
                                setFirstNameErr(NameValidator(firstName));
                            }}
                            error={firstNameErr}>
                        </InputTextField>
                        <InputTextField 
                            iconName="user" 
                            placeholder="Last Name"
                            value={lastName}
                            maxLength={25}
                            onChangeText={(lastName) => {
                                setLastName(lastName);
                                setLastNameErr(NameValidator(lastName));
                            }}
                            error={lastNameErr}>
                        </InputTextField>
                        <InputTextField 
                            iconName="mobile" 
                            placeholder="Phone Number"
                            value={phoneNumber}
                            maxLength={10}
                            keyboardType="number-pad"
                            onChangeText={(phoneNumber) => {
                                setPhoneNumber(phoneNumber);
                                setPhoneNumberErr(PhoneNumberValidator(phoneNumber));
                            }}
                            error={phoneNumberErr}>
                        </InputTextField>
                        <View style={styles.genderView}>
                            <Text style={styles.genderViewText}>Select Gender: </Text>
                            {gender.map((gender, key) => {
                                return (
                                    <View key={gender} >
                                        {checkedGender == key ? (
                                            <TouchableOpacity style={styles.genderButton}>
                                                <Icon
                                                    style={styles.icon}
                                                    size={30}
                                                    color="maroon"
                                                    name="checkbox-marked-circle"
                                                />
                                                <Text style={styles.genderText}>{gender}</Text>
                                            </TouchableOpacity>
                                            ) : (
                                            <TouchableOpacity
                                                onPress={() => {setCheckedGender(key); setGender(key)}}
                                                style={styles.genderButton}>
                                                <Icon
                                                    style={styles.icon}
                                                    size={30}
                                                    color="black"
                                                    name="checkbox-blank-circle-outline"
                                                />
                                                <Text style={styles.genderText}>{gender}</Text>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                );
                            })}

                        </View>
                        <ButtonField 
                            buttonText="Edit Profile"
                            onPress={() => Editprofile()}>
                        </ButtonField>
                    </View>
                </ScrollView>
                <Loading loading={loading}/>
            </KeyboardAvoidingView>
            <Modal
                transparent={true}
                animationType="slide"
                visible={showmodal}
                onRequestClose={() => { setShowmodal(false) }}>
                <View style={styles.modalView}>
                    <View style={styles.innerModal}>
                        <Icon style={styles.closeModalIcon} name="close-circle" size={25} color="maroon" onPress={() => setShowmodal(false)}/>
                        <TouchableOpacity style={styles.options} onPress={() => captureImage()}>
                            <Icon name="camera" size={25} color="maroon"/>
                            <Text style={styles.optionsText}>Open Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.options} onPress={() => openGallery()}>
                            <Icon name="image-multiple" size={25} color="maroon"/>    
                            <Text style={styles.optionsText}>Open Gallery</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}





const styles= StyleSheet.create({
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor:"#fff",
        padding: 20,
        backgroundColor:"#f0f0f0"
    },
    scrollViewConatiner:{
        flexGrow: 1, 
        justifyContent: 'center'
    },
    profileImg:{
        alignSelf:"center",
        marginBottom:20,
        height:130,
        width:130,
        borderRadius:300,
        borderWidth:5,
        borderColor:"#fff"
    },
    editProfilePic:{
        position:"absolute",
        top:90,
        left:"56%",
        backgroundColor:"maroon",
        borderRadius:100
    },
    subheadingText:{
        color:"maroon",
        alignSelf: 'center',
        fontSize: 28,
        marginBottom: 30,
        fontWeight: '600',
    },
    touchableTextButton:{
        alignItems:"center",
        marginTop:20
    },
    touchableText:{
        color:"black",
        fontSize:18
    },
    genderView:{
          flexDirection:"row",
          justifyContent:"center",
          alignItems:"center",
          paddingVertical:15
    },
    genderViewText:{
        color:"black",
        fontSize:20,
        paddingRight:10

    },
    genderButton:{
        flexDirection:"row",
        alignItems:"center",
        paddingRight:15
    },
    icon:{
        paddingRight:5
    },
    genderText:{
        color:"black",
        fontSize:18,  
    },
    checkboxView:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        paddingBottom:20
    },
    checkbox:{
        paddingRight:20
    },
    termText:{
        fontSize:20,
        color:"black"
    },
    modalView:{
            ...StyleSheet.absoluteFill,
            backgroundColor: 'rgba(0, 0, 0, 0.01)',
            marginTop:60,
            justifyContent:"center",
            alignItems:'center'
            
    },
    innerModal:{
        backgroundColor:"#fff",
        width:"60%",
        paddingBottom:40,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 5
    },
    options:{
        flexDirection:"row",
        alignSelf:'center',
        marginVertical:15,
        borderColor:"maroon",
        borderWidth:1,
        borderRadius:7,
        padding:10,
        alignItems:"center"
    },
    optionsText:{
        paddingLeft:10,
        color:"maroon",
        fontSize:20
    },
    closeModalIcon:{
        alignSelf:"flex-end",
        margin:15
    },
});

export default EditProfile;