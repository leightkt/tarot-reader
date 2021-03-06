require 'rest-client'
require 'json'

Favorite.destroy_all
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

magician_id = Card.find_by(name: "The Magician").id
devil_id = Card.find_by(name: "The Devil").id
six_wands_id = Card.find_by(name: "Six of Wands").id

Favorite.create(
    user: kat, 
    card_ids: "#{magician_id}, #{devil_id}, #{six_wands_id}",
    card_directions: "up, up, down",
    question: "What does a bad bitch need to know?")