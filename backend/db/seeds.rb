require 'rest-client'
require 'json'

Card.destroy_all

response = RestClient.get 'https://rws-cards-api.herokuapp.com/api/v1/cards'
result = JSON.parse response
cards = result["cards"]
count = 1
cards.map do |card|
    Card.create(
        card_type: card["type"],
        name: card["name"],
        name_short: card["name_short"],
        suit: card["suit"],
        meaning_up: card["meaning_up"],
        meaning_rev: card["meaning_rev"],
        desc: card["desc"],
        card_value: count
    )
    count += 1
end