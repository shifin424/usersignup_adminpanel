const form = document.querySelector('form')
const username = form.querySelector('#username')
const password = form.querySelector('#password')
const errorElement = document.querySelector('#error')



function hideErrorMessage(){
    errorElement.innerHTML = ""
}
function showErrorMessage(message) {
    errorElement.innerHTML = `<div  class="alert alert-danger" role="alert">${message} </div>`
}
function submitform(e) {

    if(username.value === "" & password.value === ""){
        showErrorMessage("Name and Password is Required")
        return false;
    }
    if (username.value === "") {
        showErrorMessage("Name is Required")
        return false;
    }
    if (username.value < 10 ) {
        showErrorMessage("Name must be less than 10")
        return false;
    }
    if(password.value === "" ){
        showErrorMessage("Password is Required")
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
    hideErrorMessage()
    return true;
    
}

