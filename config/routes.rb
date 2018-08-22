require 'resque/server'

Rails.application.routes.draw do
  devise_for :users
  resources :floor_plans, only: [:create, :index, :destroy, :update]

  get '/'                                         =>  'floor_plans#index'
  get '/floor_plans/*path'                        =>  'floor_plans#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :locations, only: [:create, :index]
  resources :customers, only: [:index, :create]
  resources :favorite_icons, only: [:index, :create, :update, :destroy, :new]
  resources :icons, only: [:create, :update, :show, :index, :destroy]
  resources :lines, only: [:index, :create, :destroy, :update]
  get '/callback/*path'                           =>  'floor_plans#callback'
  post '/floorplans/:id'                          =>  'floor_plans#generate_pdf', as: 'generate_pdf'
  get '/handlers/:id'                             =>  'handlers#get_details'
  put '/handlers/:id'                             =>  'handlers#update_rotate'
  patch '/handlers/:id'                           =>  'handlers#update_position'
  put '/icon_device_id/:id'                       =>  'icons#update_device_id'
  mount Resque::Server.new, at: "/resque"
end
