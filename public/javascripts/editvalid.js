const form = document.querySelector('form')
const username = document.getElementById('username')
const Age = document.getElementById('age')
const Email=  document.getElementById('email')
const errorElement = document.getElementById('err')
const EmailRegex =  /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/



function hideErrorMessage(){
    errorElement.innerHTML = ""
}
function showErrorMessage(message) {

    errorElement.innerHTML = `<div  class="alert alert-danger" role="alert">${message} </div>`
   
}
form.onsubmit=()=> {

    if(username.value === "" &&  Age.value === "" && Email.value === "" ){
        showErrorMessage("Invalid submission")
        return false;
    }if (username.value === "") {
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

    hideErrorMessage()
    return true;

}