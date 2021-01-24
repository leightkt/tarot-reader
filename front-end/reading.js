const backendURL = 'http://localhost:9000/'
const $cardsDisplay = document.querySelector(".cards-display")
const $singleCardDisplay = document.querySelector("#single-card-display")
const $backButtonLink = document.querySelector('#back-button')
const queryParams = new URLSearchParams(window.location.search)
const userID = queryParams.get('id')
const cardMeanings = []

fetch(backendURL + 'reading')
    .then(response => response.json())
    .then(cards => {
        displayCards(cards)

    })

function displayCards(cards){
    cards.forEach(card => {
        appendCard(createCard(card))
        addIDtoBackButtonLink()
    })
}

function createCard(card){
    const $cardContainer = document.createElement('div')
    $cardContainer.classList.add('tarot-card')
    $cardContainer.id = card.id
    const $cardName = document.createElement('h3')
    $cardName.innerText = card.name
    $cardMeaning = randomMeaning(card)
    addClicktoCard(card, $cardContainer)
    $cardContainer.append($cardName, $cardMeaning)
    return $cardContainer
}

function randomMeaning(card, cardLink){
    const randomChoice = Math.random() < 0.5
    const $cardMeaning = document.createElement('p')
    if (randomChoice){
        $cardMeaning.innerText = `Meaning Up: ${card.meaning_up}`
        cardMeanings.push({ID: card.id, direction: "up"})
    } else {
        $cardMeaning.innerText = `Meaning Down: ${card.meaning_rev}`
        cardMeanings.push({ID: card.id, direction: "down"})
    }
    return $cardMeaning
}

function getAllCards(){
    const $allTarotCards = document.querySelectorAll(".tarot-card")
}
function addClicktoCard(card, $cardContainer){
    $cardContainer.addEventListener('click', function(){
        toggleDisplayClass($cardsDisplay)
        fetchCard($cardContainer.id)
    })
}

function toggleDisplayClass(element){
    element.classList.toggle("hidden")
}

function fetchCard(id){
    cardURL = `${backendURL}cards/${id}`
    fetch(cardURL)
    .then(response => response.json())
    .then(card => {
        appendViewCard(renderSingleCard(card))
    })
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

function appendCard($cardContainer){
    $cardsDisplay.appendChild($cardContainer)
}

function appendViewCard($cardContainer){
    $singleCardDisplay.appendChild($cardContainer)
}

function addReverseClick(card, $cardContainer){
    $cardContainer.addEventListener('click', function(){
        this.remove()
        toggleDisplayClass($cardsDisplay)
    })
}

function addIDtoBackButtonLink(){
    $backButtonLink.href = `showUser.html?id=${userID}`
}