const backendURL = 'http://localhost:9000/'
const $cardsDisplay = document.querySelector(".cards-display")


fetch(backendURL + 'cards')
    .then(response => response.json())
    .then(cards => {
        displayCards(getRandomCardSet(cards))
    })

function getRandomNumber(min, max){ 
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}

function getRandomNumbersSet(min, max){
    const set = []
    let count = 1
    while (count < 4) {
        let num = getRandomNumber(min, max)
        if (!set.includes(num)) {
            set.push(num)
            count ++
        }
    }
    return set
}

function getCardByNumber(cards, value){
    return cards.find(card => card.card_value == value)
}

function getRandomCardSet(cards){
    const numberSet = getRandomNumbersSet(1, 79)
    const cardSet = []
    numberSet.forEach(number => {
        let foundCard = getCardByNumber(cards, number)
        cardSet.push(foundCard)
    })
    return cardSet
}

function displayCards(cards){
    cards.forEach(card => {
        createCard(card)
    })
}

function createCard(card){
    const $cardContainer = document.createElement('div')
    $cardContainer.classList.add('tarot-card')
    const $cardName = document.createElement('h3')
    // const $cardType = document.createElement('h4')
    // const $cardSuit = document.createElement('h4')
    const $cardMeaningUp = document.createElement('p')
    const $cardMeaningDown = document.createElement('p')
    $cardName.innerText = card.name
    // $cardType.innerText = card.card_type
    // $cardSuit.innerText = card.suit
    $cardMeaningUp.innerText = `Meaning Up: ${card.meaning_up}`
    $cardMeaningDown.innerText = `Meaning Down: ${card.meaning_rev}`
    // $cardContainer.append($cardName, $cardType, $cardSuit, $cardMeaningUp, $cardMeaningDown)
    $cardContainer.append($cardName, $cardMeaningUp, $cardMeaningDown)
    $cardsDisplay.append($cardContainer)
}


