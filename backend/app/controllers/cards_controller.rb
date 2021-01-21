class CardsController < ApplicationController
    def index
        @cards = Card.all
        render json: @cards
    end

    def reading
        @cards = Card.all.sample(3)
        render json: @cards
    end

end
