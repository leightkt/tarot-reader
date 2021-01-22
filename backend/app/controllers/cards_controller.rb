class CardsController < ApplicationController
    def index
        @cards = Card.all
        render json: @cards
    end

    def reading
        @cards = Card.all.sample(3)
        render json: @cards
    end

    def show
        @card = Card.find(params[:id])
        render json: @card
    end

end
