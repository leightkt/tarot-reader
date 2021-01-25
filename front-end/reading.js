const backendURL = 'http://localhost:9000/'
const $cardsDisplay = document.querySelector(".cards-display")
const $singleCardDisplay = document.querySelector("#single-card-display")
const $backButtonLink = document.querySelector('#back-button')
const $saveButton = document.querySelector('#save')
const $readingButton = document.querySelector('#reading-button')
const queryParams = new URLSearchParams(window.location.search)
const userID = queryParams.get('id')
const cardMeanings = []
let userQuestion = ""

function fetchIt(){
    fetch(backendURL + 'reading')
        .then(response => response.json())
        .then(cards => {
            displayCards(cards)
        })
}

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
        appendViewCard(renderCardDescription(card))
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

function renderCardDescription(card){
    const $descriptionContainer = document.createElement('div')
    $descriptionContainer.classList.add('description')
    const $cardDescription = document.createElement('h4')
    $cardDescription.innerText = card.desc
    $descriptionContainer.appendChild($cardDescription)
    return $descriptionContainer
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

function appendViewCard(element){
    $singleCardDisplay.appendChild(element)
}

function addReverseClick(card, $cardContainer, $descriptionContainer){
    $cardContainer.addEventListener('click', function(){
        this.remove()
        document.querySelector('.description').remove()
        toggleDisplayClass($cardsDisplay)
    })
}

function addIDtoBackButtonLink(){
    $backButtonLink.href = `showUser.html?id=${userID}`
}

function saveReading(){
    const reading = {
        user_id: userID,
        card_ids: getCardIDs(),
        card_directions: getCardDirections(),
        question: userQuestion
    }
    saveFetch(reading)
}

function getCardIDs(){
    let cardIDstring = ""
    for (i = 0; i < cardMeanings.length; i++){
        if (i === cardMeanings.length - 1){
            cardIDstring += `${cardMeanings[i].ID}`
        } else {
            cardIDstring += `${cardMeanings[i].ID}, `
        }
    }
    return cardIDstring
}

function getCardDirections(){
    let cardDirectionString = ""
    for (i = 0; i < cardMeanings.length; i++){
        if (i === cardMeanings.length - 1){
            cardDirectionString += `${cardMeanings[i].direction}`
        } else {
            cardDirectionString += `${cardMeanings[i].direction}, `
        }
    }
    return cardDirectionString
}

function saveFetch(reading){
    fetch('http://localhost:9000/favorites', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reading)
    })
}

$saveButton.addEventListener('click', function(){
    saveReading()
    console.log("reading saved")
    window.location.replace(`http://localhost:3000/showUser.html?id=${userID}`)
}, {once: true})

$readingButton.addEventListener('click', function(){
    userQuestion = document.getElementById('user-question').value
    fetchIt()
    toggleDisplayClass(document.querySelector('footer'))
    toggleDisplayClass(document.querySelector('#question-form'))
    prependQuestion()
})

function prependQuestion(){
    $userQuestion = document.createElement('h2')
    $userQuestion.innerText = `You asked: ${userQuestion}`
    $cardsDisplay.prepend($userQuestion)
}