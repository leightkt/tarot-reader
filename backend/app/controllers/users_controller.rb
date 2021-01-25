class UsersController < ApplicationController

    def index
        @users = User.all
        render json: @users
    end

    def create
        @user = User.create(
            user_name: params[:username],
            user_password: params[:password],
            name: params[:real_name],
            zodiac_sign: params[:sign]
        )
        redirect_to "http://localhost:3000/showUser.html?username=#{@user.user_name}&password=#{@user.user_password}"
    end

    def show
        @user = User.find(params[:id])
        render json: @user, include: :favorites
    end

    def login
        @user = User.where("user_name = ? AND user_password = ?", params[:username], params[:password])
        if @user.any?
            render json: @user, include: :favorites
        else
            render json: "User not found"
        end
    end

    def find_user
        @user = User.find_by(user_name: params[:username])
        render json: @user
    end

    def update
        @user = User.find(params[:id])
        if params[:username]
            @user.user_name = params[:username]
        end
        if params[:password]
            @user.user_password = params[:password]
        end
        if params[:name]
            @user.user_name = params[:name]
        end
        if params[:sign]
            @user.zodiac = params[:sign]
        end
        @user.update(
            user_name: @user.user_name,
            user_password: @user.user_password,
            name: @user.name,
            zodiac_sign: @user.zodiac_sign
        )
        render json: @user
    end

    def destroy
        @user = User.find(params[:id])
        @user.destroy
        render json: "Deleted user: #{@user.user_name}"
    end
end
