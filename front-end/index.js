
const queryParams = new URLSearchParams(window.location.search)
const username = queryParams.get('username')
const password = queryParams.get('password')
const backendURL = 'http://localhost:9000/'
let loginURL = `${backendURL}/login`
const $loginForm = document.querySelector('#login-form')

if (password && username){
    loginURL = `${loginURL}?username=${username}&password=${password}`
    fetchIt()
}

function fetchIt(){
    fetch(loginURL)
    .then(response => response.json())
    .then(user => console.log(user))
    .catch(noUser)
}

function noUser(){
    alert("Invalid Username or Password")
}