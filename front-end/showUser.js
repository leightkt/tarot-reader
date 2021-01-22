const queryParams = new URLSearchParams(window.location.search)
const username = queryParams.get('username')
const password = queryParams.get('password')
const backendURL = 'http://localhost:9000/'
let loginURL = `${backendURL}/login?username=${username}&password=${password}`

fetchUser()

function fetchUser(){
    fetch(loginURL)
    .then(response => response.json())
    .then(user => {
        displayUserInfo(user[0])
    })
    .catch(noUser)
}

function noUser(){
    alert("Invalid Username or Password")
}

function displayUserInfo(user){
    const $userSection = document.querySelector("#user-info")
    const $userName = document.querySelector("#user-name")
    const $userSign = document.querySelector("#user-sign")
    $userName.innerHTML = `Welcome ${user.name}`
    $userSign.innerHTML = `Your sign: ${user.zodiac_sign}`
}