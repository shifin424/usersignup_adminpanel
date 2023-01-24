const form = document.querySelector('form')
const username = document.getElementById('username')
const Age = document.getElementById('age')
const Email=  document.getElementById('email')
const password = document.getElementById('password')
const conformpass = document.getElementById('Conformpassword')
const errorElement = document.getElementById('alert')

const EmailRegex =  /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/
// const PasswordRegex =  /^(?=.[A-Za-z])(?=.\d)(?=.[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$/

function hideErrorMessage(){
    errorElement.innerHTML = ""
}
function showErrorMessage(message) {
    // console.log(Email.value)
    // console.log(username.value);
    // console.log(Age.value);
    // console.log(password.value);
    // console.log(conformpass.value);
    errorElement.innerHTML = `<div  class="alert alert-danger" role="alert">${message} </div>`
    // console.log(message)
}
form.onsubmit=()=> {
   
    
    if(username.value === "" && password.value === "" && Age.value === "" && Email.value === "" && conformpass.value === ""){
        showErrorMessage("Invalid submission")
        return false;
    }
   
   
    if (username.value === "") {
        showErrorMessage(" username is Required")
        return false;
    }
    else if (username.value < 10 ) {
        showErrorMessage("username must be less than 10")
        return false;
    }
    else if (Age.value === "") {
        showErrorMessage("Age  is Required")
        return false;
    }
    else if (Age.value > 99 ) {
        showErrorMessage("Invalid age")
        return false;
    }
    
    else if(Email.value === ""){
        showErrorMessage("Email is required")
    }

    else if(!Email.value.match(EmailRegex)){
        showErrorMessage("Enter a valid email")
        return false;
    }
    else if(password.value === "" ){
        showErrorMessage("Password is Required")
        return false;
    }
  
    else if (password.value.length < 6) {
        showErrorMessage("Password must be longer than 6 characters ")
        return false;
    }
    else if (password.value.length >= 10) {
        showErrorMessage("Password must be less than 10 characters")
        return false;
    }
    else if (password.value === "password") {
        showErrorMessage("password cannot be password")
        return false;
    }
    else if(password.value !== conformpass.value){
        showErrorMessage("password not match")
        return false;
    }

    
    hideErrorMessage()
    return true;
    
}