const queryParams = new URLSearchParams(window.location.search)
const username = queryParams.get('username')
const password = queryParams.get('password')
const backendURL = 'http://localhost:9000/'
let loginURL = `${backendURL}/login?username=${username}&password=${password}`
let userID = queryParams.get('id')
console.log(userID)

if (username && password) {
    fetchUser()
} else if (userID) {
    showUser()
}

function showUser(){
    fetch(backendURL + `users/${userID}`)
    .then(response => response.json())
    .then(user => {
        displayUserInfo(user)
        setReadingButtonAttr()
    })
}

function fetchUser(){
    fetch(loginURL)
    .then(response => response.json())
    .then(user => {
        displayUserInfo(user[0])
        userID = user[0].id
        setReadingButtonAttr()
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

function setReadingButtonAttr(){
    const $readingLink = document.querySelector("#reading-link")
    $readingLink.href = `/reading.html?id=${userID}`
}