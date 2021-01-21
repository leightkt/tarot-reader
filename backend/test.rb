require 'rest-client'
require 'json'
require 'pry'

response = RestClient.get 'https://rws-cards-api.herokuapp.com/api/v1/cards'
result = JSON.parse response
cards = result["cards"]
cards.map do |card|
    binding.pry
    puts card["name"]
end
