const backendURL = 'http://localhost:9000/'
let loginURL = `${backendURL}/login`
const $loginForm = document.querySelector('#login-form')
const $newHereButton = document.querySelector("#new-here")
const $newUserFrom = document.querySelector("#new-user-form")


function hideLogin(){
    toggleDisplayClass($loginForm)
}

function toggleDisplayClass(element){
    element.classList.toggle("hidden")
}

$newHereButton.addEventListener('click', function(){
    hideLogin()
    toggleDisplayClass($newUserFrom)
    toggleDisplayClass($newHereButton)
})



