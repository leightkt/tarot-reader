require 'rest-client'
require 'json'

Card.destroy_all
User.destroy_all

response = RestClient.get 'https://rws-cards-api.herokuapp.com/api/v1/cards'
result = JSON.parse response
cards = result["cards"]
cards.map do |card|
    Card.create(
        card_type: card["type"],
        name: card["name"],
        name_short: card["name_short"],
        suit: card["suit"],
        meaning_up: card["meaning_up"],
        meaning_rev: card["meaning_rev"],
        desc: card["desc"],
    )
end

kat = User.create(user_name: "KitKat", user_password: "pw", name: "Kat", zodiac_sign: "Aries")
jaime = User.create(user_name: "JJ", user_password: "123", name: "Jaime", zodiac_sign: "Aquarious")