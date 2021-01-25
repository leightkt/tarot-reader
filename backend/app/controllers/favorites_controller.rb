class FavoritesController < ApplicationController
    def index
        @favorites = Favorite.all
        render json: @favorites
    end

    def show
        @favorite = Favorite.find(params[:id])
        render json: @favorite, include: :user
    end

    def create
        @favorite = Favorite.create(
            user_id: params[:user_id],
            card_ids: params[:card_ids],
            card_directions: params[:card_directions],
            question: params[:question]
        )
        render json: 'reading saved'
    end

    def destroy
        @favorite = Favorite.find(params[:id])
        @favorite.destroy
        render json: 'reding deleted'
    end
end
