const queryParams = new URLSearchParams(window.location.search)
const username = queryParams.get('username')
const password = queryParams.get('password')
const backendURL = 'http://localhost:9000/'
const $favoritesContainer = document.querySelector('#fav-readings')
let loginURL = `${backendURL}/login?username=${username}&password=${password}`
let userID = queryParams.get('id')

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
        user.favorites.forEach(favorite => displayFavReadings(favorite))
    })
}

function fetchUser(){
    fetch(loginURL)
    .then(response => response.json())
    .then(user => {
        displayUserInfo(user[0])
        userID = user[0].id
        setReadingButtonAttr()
        user[0].favorites.forEach(favorite => displayFavReadings(favorite))
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

function displayFavReadings(favorite){
    const $readingContainer = document.createElement('div')
    $readingContainer.id = favorite.id
    $readingContainer.classList.add('reading-box')
    const $readingDate = document.createElement('h3')
    $readingDate.innerText = getDate(favorite.created_at)
    const $readingLink = document.createElement('a')
    $readingLink.href = `/showFavorite.html?favid=${favorite.id}&id=${userID}`
    const $readingQuestion = document.createElement('p')
    $readingQuestion.innerText = favorite.question
    $readingLink.append($readingDate)
    $readingContainer.append($readingLink, $readingQuestion)
    $favoritesContainer.append($readingContainer)
}

function getDate(dateString){
    return dateString.split("T")[0]
}
