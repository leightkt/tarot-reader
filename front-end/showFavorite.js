const backendURL = 'http://localhost:9000/'
const $cardsDisplay = document.querySelector(".cards-display")
const $singleCardDisplay = document.querySelector("#single-card-display")
const $backButtonLink = document.querySelector('#back-button')
const queryParams = new URLSearchParams(window.location.search)
const userID = queryParams.get('id')
const favoriteID = queryParams.get('favid')
const cardMeanings = []

fetch(backendURL + `favorites/${favoriteID}`)
    .then(response => response.json())
    .then(favorite => {
        renderReadingInfo(favorite)
        updateCardMeanings(favorite)
        findCards()
        addIDtoBackButtonLink()
        updateActionDeleteButton(favorite)
    })


function fetchCard(id){
    cardURL = `${backendURL}cards/${id}`
    fetch(cardURL)
    .then(response => response.json())
    .then(card => {
        appendCard(renderCard(card))
    })
}

function updateActionDeleteButton(favorite){
    $deleteButton = document.querySelector("#delete")
    $deleteButton.addEventListener('click', function(){
        console.log(favorite.id)
        deletePost(favorite.id)
        window.location.replace(`http://localhost:3000/showUser.html?id=${userID}`)
    })
}


function deletePost(fav_id){
    fetch(`${backendURL}favorites/${fav_id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: fav_id
        })
    })
}

function fetchSingleCard(id){
    cardURL = `${backendURL}cards/${id}`
    fetch(cardURL)
    .then(response => response.json())
    .then(card => {
        appendViewCard(renderSingleCard(card))
        appendViewCard(renderCardDescription(card))
    })
}

function renderReadingInfo(favorite){
    const $date = document.querySelector('#date')
    const $question = document.querySelector('#question')
    $date.innerText = `Date: ${getDate(favorite.created_at)}`
    $question.innerText = `Question: ${favorite.question}`
}

function addIDtoBackButtonLink(){
    $backButtonLink.href = `showUser.html?id=${userID}`
}

function getDate(dateString){
    return dateString.split("T")[0]
}

function updateCardMeanings(favorite){
    const cardIDs = favorite.card_ids.split(", ")
    const cardDirections = favorite.card_directions.split(", ")
    cardIDs.forEach((cardID, index) => {
        cardMeanings.push({ID: parseInt(cardID), direction: cardDirections[index]})
    })
}

function findCards(){
    cardMeanings.forEach(card => {
        fetchCard(card.ID)
    })
}

function appendCard($cardContainer){
    $cardsDisplay.appendChild($cardContainer)
}

function renderCard(card){
    const $cardContainer = document.createElement('div')
    $cardContainer.classList.add('tarot-card')
    $cardContainer.id = card.id
    const $cardName = document.createElement('h3')
    $cardName.innerText = card.name
    $cardMeaning = renderMeaning(card)
    addClicktoCard(card, $cardContainer)
    $cardContainer.append($cardName, $cardMeaning)
    return $cardContainer
}

function addClicktoCard(card, $cardContainer){
    $cardContainer.addEventListener('click', function(){
        toggleDisplayClass($cardsDisplay)
        fetchSingleCard($cardContainer.id)
    })
}

function renderMeaning(card){
    const $cardMeaning = document.createElement('p')
    const cardMeans = cardMeanings.find(cardMean => cardMean.ID === card.id)
    if (cardMeans.direction === "up"){
        $cardMeaning.innerText = `Meaning Up: ${card.meaning_up}`
    } else {
        $cardMeaning.innerText = `Meaning Down: ${card.meaning_rev}`
    }
    return $cardMeaning
}

function toggleDisplayClass(element){
    element.classList.toggle("hidden")
}

function renderSingleCard(card){
    const $cardContainer = document.createElement('div')
    $cardContainer.classList.add('tarot-card')
    $cardContainer.id = card.id
    const $cardName = document.createElement('h3')
    $cardName.innerText = card.name
    $cardMeaning = renderMeaning(card)
    addReverseClick(card, $cardContainer)
    $cardContainer.append($cardName, $cardMeaning)
    return $cardContainer
}

function renderCardDescription(card){
    const $descriptionContainer = document.createElement('div')
    $descriptionContainer.classList.add('description')
    const $cardDescription = document.createElement('h4')
    $cardDescription.innerText = card.desc
    $descriptionContainer.appendChild($cardDescription)
    return $descriptionContainer
}

function appendViewCard($cardContainer){
    $singleCardDisplay.appendChild($cardContainer)
}

function addReverseClick(card, $cardContainer){
    $cardContainer.addEventListener('click', function(){
        this.remove()
        document.querySelector('.description').remove()
        toggleDisplayClass($cardsDisplay)
    })
}