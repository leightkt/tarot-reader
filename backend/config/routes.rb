Rails.application.routes.draw do
  resources :users
  resources :cards, only: [:index]
  get "/reading", to: "cards#reading"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
