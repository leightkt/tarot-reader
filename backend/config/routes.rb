Rails.application.routes.draw do
  resources :favorites
  resources :users
  resources :cards, only: [:index, :show]
  get "/reading", to: "cards#reading"
  get "/login", to: "users#login"
  get "/find", to: "users#find_user"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
