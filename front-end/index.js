
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
    .then(user => {
        console.log(user)
        hideLogin()
        displayUserInfo(user[0])
    })
    .catch(noUser)
}

function noUser(){
    alert("Invalid Username or Password")
}

function hideLogin(){
    const $loginForm = document.querySelector('#login-form')
    $loginForm.classList.add("hidden")
}

function displayUserInfo(user){
    const $userSection = document.querySelector("#user-info")
    $userSection.classList.remove("hidden")
    const $userName = document.querySelector("#user-name")
    const $userSign = document.querySelector("#user-sign")
    $userName.innerHTML = `Welcome ${user.name}`
    $userSign.innerHTML = `Your sign: ${user.zodiac_sign}`
}