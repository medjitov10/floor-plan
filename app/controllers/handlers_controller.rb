class HandlersController < ApplicationController
  skip_before_action  :verify_authenticity_token

  def get_inventory_request
    @inventory_requests = InventoryRequest.all
    render json: @inventory_requests
  end

  def get_details
    @floor_plan = FloorPlan.friendly.find(params[:id])
    @icons = @floor_plan.icons
    @location = @floor_plan.location
    @devices = @location.devices
      render json: {
        floor_plan: @floor_plan,
        icons: @icons,
        devices: @devices,
        location: @location
      }
  end

  def update_rotate
    icon = Icon.find(params[:id])
    icon.update!(rotate: params[:rotate])
    render json: icon
  end

  def update_position
    icon = Icon.find(params[:id])
    icon.update!(top: params[:top], left: params[:left])
    render json: icon
  end

end
