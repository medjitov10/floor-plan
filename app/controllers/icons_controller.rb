class IconsController < ApplicationController
  before_action :set_icon, only: [:show, :edit, :update, :destroy, :update_device_id]
  skip_before_action  :verify_authenticity_token
  layout 'tech'

  # GET /icons/1
  # GET /icons/1.json
  def show
    icon = Icon.find(params[:id])
    encrypted_device = icon.location_device_id ? Device.find(icon.location_device_id) : {}
    device = decrypt_device(encrypted_device)
    render json: {icon: icon, device: device || encrypted_device }
  end


  # POST /icons
  # POST /icons.json
  def create
    floor_plan = FloorPlan.where(slug: params[:slug])[0]
    icon = Icon.create(
      icon_class: params[:icon][:icon],
      floor_plan_id: floor_plan.id,
      category: params[:icon][:category],
      device_type: params[:icon][:type]
    )
    icon.set_color
    if icon.save
      render json: icon
    end
  end

  # PATCH/PUT /icons/1
  # PATCH/PUT /icons/1.json
  def update
    @icon.update(icon_params)
    @icon.set_color
    @device = @icon.location_device_id ? Device.find(@icon.location_device_id) : {}
    device = decrypt_device(@device)
    render json: {icon: @icon, device: device || @device}
  end

  def update_device_id
    @icon.update(icon_params)
    @devices = @icon.floor_plan.location.devices
    render json: {icon: @icon, devices: @devices}
  end
  # DELETE /icons/1
  # DELETE /icons/1.json
  def destroy
    @icon.destroy
    render json: @icon
  end

  def decrypt_device(encrypted_device)
    if encrypted_device.present?
      device = {
        id: encrypted_device.id,
        device_type: encrypted_device.device_type,
        model: encrypted_device.model,
        manufacturer: encrypted_device.manufacturer,
        ip_internal: encrypted_device.ip_internal,
        ip_external: encrypted_device.ip_external,
        port_number: encrypted_device.port_number,
        mac_address: encrypted_device.mac_address,
        general_location: encrypted_device.general_location,
        image: encrypted_device.image.url(:original)
      }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_icon
      @icon = Icon.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def icon_params
      params.require(:icon).permit(:top, :left, :rotate, :category, :device_type, :location_device_id, :floor_plan_id, :icon_class, :color, :radius, :angle, :coverage_color)
    end
end
