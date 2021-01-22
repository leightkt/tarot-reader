const backendURL = 'http://localhost:9000/'
const $cardsDisplay = document.querySelector(".cards-display")

fetch(backendURL + 'reading')
    .then(response => response.json())
    .then(cards => {
        displayCards(cards)
    })

function displayCards(cards){
    cards.forEach(card => {
        createCard(card)
    })
}

function createCard(card){
    const $cardContainer = document.createElement('div')
    $cardContainer.classList.add('tarot-card')
    const $cardName = document.createElement('h3')
    $cardName.innerText = card.name
    const $cardMeaning = randomMeaning(card)
    $cardContainer.append($cardName, $cardMeaning)
    $cardsDisplay.append($cardContainer)
}

function randomMeaning(card){
    const randomChoice = Math.random() < 0.5
    const $cardMeaning = document.createElement('p')
    if (randomChoice){
        $cardMeaning.innerText = `Meaning Up: ${card.meaning_up}`
    }else {
        $cardMeaning.innerText = `Meaning Down: ${card.meaning_rev}`
    }
    return $cardMeaning
}
