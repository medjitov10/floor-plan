class FavoriteIconsController < ApplicationController
  before_action :set_favorite_icon, only: [:show, :edit, :update, :destroy]
  
  def index
    @user = current_user
    @favorite_icons = @user.favorite_icons
    render json: @favorite_icons
  end

  def new
    @favorite_icon = FavoriteIcon.new
  end

  def edit
  end

  def create
    @favorite_icon = FavoriteIcon.new(favorite_icon_params)
    @user = current_user
    @index = @user.favorite_icons.count
    respond_to do |format|
      if @favorite_icon.save
        format.html { redirect_to @favorite_icon, notice: 'Favorite icon was successfully created.' }
        format.js
        format.json { render :show, status: :created, location: @favorite_icon }
      else
        format.html { render :new }
        format.js
        format.json { render json: @favorite_icon.errors, status: :unprocessable_entity }
      end
    end
  end

  def update

  end

  def destroy
    @favorite_icon.destroy
    respond_to do |format|
      format.html
      format.js
    end
  end

  private

    def set_favorite_icon
      @favorite_icon = FavoriteIcon.find(params[:id])
    end

    def favorite_icon_params
      params.require(:favorite_icon).permit(:category, :device_type, :icon_class, :user_id)
    end
end
