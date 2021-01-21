const backendURL = 'http://localhost:9000/'
const $cardsDisplay = document.querySelector(".cards-display")

fetch(backendURL + 'cards')
    .then(response => response.json())
    .then(cards => displayCards(cards))

function displayCards(cards){
    cards.forEach(card => {
        createCard(card)
    })
}

function createCard(card){
    const $cardContainer = document.createElement('div')
    $cardContainer.classList.add('tarot-card')
    const $cardName = document.createElement('h3')
    const $cardType = document.createElement('h4')
    const $cardSuit = document.createElement('h4')
    const $cardMeaningUp = document.createElement('p')
    const $cardMeaningDown = document.createElement('p')
    $cardName.innerText = card.name
    $cardType.innerText = card.card_type
    $cardSuit.innerText = card.suit
    $cardMeaningUp.innerText = `Meaning Up: ${card.meaning_up}`
    $cardMeaningDown.innerText = `Meaning Down: ${card.meaning_rev}`
    $cardContainer.append($cardName, $cardType, $cardSuit, $cardMeaningUp, $cardMeaningDown)
    $cardsDisplay.append($cardContainer)
}

