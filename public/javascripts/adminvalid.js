const form = document.getElementById('form')
const Username=  document.getElementById('username')
const password = document.getElementById('password')
const errorElement = document.getElementById('danger')


function hideErrorMessage(){
    errorElement.innerHTML = ""
}
function showErrorMessage(message) {
    errorElement.innerHTML = `<div  class="alert alert-danger" role="alert">${message} </div>`
}

form.onsubmit=()=>{
console.log(Username);
    if(Username.value == "" && password.value == ""){
        showErrorMessage("Invalid admin login")
        return false;
    }
    if(Username.value === ""){
        showErrorMessage("User name is required")
        return false;
    }
    if(password.value === ""){
        showErrorMessage("password is required")
        return false;
    }
    if (password.value.length < 6) {
        showErrorMessage("Password must be longer than 6 characters ")
        return false;
    }
    if (password.value.length >= 10) {
        showErrorMessage("Password must be less than 10 characters")
        return false;
    }
    if (password.value === "password") {
        showErrorMessage("password cannot be password")
        return false;
    }
    if(password !== conformpass){
        showErrorMessage("password not match")
        return false;
    }


    hideErrorMessage()
    return true;
}