export const NameValidator = (Name) => {
    let regex=/^[a-zA-Z\s]+$/;
    if(Name.length === 0){
        return("Name is required")
    }
    else if(Name.length<2){
        return ("Name should be more than 2 characters")
    }
    else if(!regex.test(Name)){
        return ("Name should contain only alpabets")
    }
    else{
        return(null)
    }
}


export const EmailValidator = (email) => {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if(email.length === 0){
        return("Email is required")
    }
    else if(!regex.test(email)){
        return ("Email is invalid ex: testmail.com")
    }
    else{
        return(null)
    }
}

export const PhoneNumberValidator = (phoneNumber) => {
    let regex=/^[7-9]\d{9}$/;
    if(phoneNumber.length === 0){
        return("Phone Number is required")
    }
    else if(!regex.test(phoneNumber)){
        return ("Exactly 10 numbers required & starts with 7,8,9 ")
    }
    else{
        return(null)
    }
}

export const PasswordValidator = (password) => {
    if(password.length === 0){
        return("Password is required")
    }
    else if(password.length < 8){
        return ("Password should be atleast 8 chars")
    }
    else{
        return(null)
    }
}

export const ConfirmPasswordValidator = (password, confirmPassword) => {
    if(confirmPassword.length === 0){
        return("Confirm Password is required")
    }
    else if(password !== confirmPassword){
        return("Password does not match above password")
    }
    else{
        return(null)
    }
}

export const OtpValidator = (otp) => {
    if(otp.length === 0){
        return("OTP is required")
    }
    else if(otp.length < 5){
        return ("OTP should be atleast 5 chars")
    }
    else{
        return(null)
    }
}


export const AddressValidator = (address) => {
    if(address.length === 0){
        return("Address is required")
    }
    else{
        return(null)
    }
}

export const CityValidator = (city) => {
    let regex= /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/;
    if(city.length === 0){
        return("City Name is required")
    }
    else if(!regex.test(city)){
        return ("City Name is invalid")
    }
    else{
        return(null)
    }
}

export const PinCodeValidator = (pincode) => {

    let regex=/^[1-9][0-9]{5}$/;
    if(pincode.length === 0){
        return("Pin Code is required")
    }
    else if(!regex.test(pincode)){
        return ("Exactly 6 numbers required & do not start with 0")
    }
    else{
        return(null)
    }
}

export const StateValidator = (state) => {
    let regex=/^[a-z ,.'-]+$/i;
    if(state.length === 0){
        return("State Name is required")
    }
    else if(!regex.test(state)){
        return ("State Name is invalid")
    }
    else{
        return(null)
    }
}

export const CountryValidator = (country) => {
    let regex=/^[a-z ,.'-]+$/i;
    if(country.length === 0){
        return("Country Name is required")
    }
    else if(!regex.test(country)){
        return ("Country Name is invalid")
    }
    else{
        return(null)
    }
}

