class FloorPlansController < ApplicationController
  before_action :set_floor_plan_data, only: [:edit, :update, :destroy, :show, :generate_pdf]
  before_action :set_current_user, only: [:create, :update]
  before_action :authenticate_user!

  skip_before_action :verify_authenticity_token

  # GET /floor_plans
  # GET /floor_plans.json
  def index
    @s3_direct_post = S3_BUCKET.presigned_post(key: "floor_plans/#{SecureRandom.uuid}/${filename}", success_action_status: '201', acl: 'public-read')
    floor_plans = FloorPlan.all
    result = Location.get_floor_plans

    s3_aws = {
      form_data: @s3_direct_post.fields,
      url: @s3_direct_post.url,
      host: @s3_direct_post.url
    }
    respond_to do |format|
      format.html
      format.json { render json: {result: result, floor_plans: floor_plans, s3_aws: s3_aws}}
    end
  end

  # POST /floor_plans
  # POST /floor_plans.json
  def create

    @floor_plan = FloorPlan.create(floor_plan_params)
    @floor_plan.update(created_by: @user.email)
    location = @floor_plan.location
    render json: {
      floor_plan: @floor_plan,
      location: {
        name: location.customer_name,
        address: location.address,
        qty: 1,
        location_id: location.id
      }
    }
  end

  def callback
    @floor_plan =  FloorPlan.friendly.find(params[:path])
    render json: @floor_plan
  end

  # PATCH/PUT /floor_plans/1
  # PATCH/PUT /floor_plans/1.json
  def update
    @floor_plan.update(floor_plan_params)
    location = @floor_plan.location
    render json: {floor_plan: @floor_plan}
  end

  # GET /floorplans/1
  # GET /floorplans/1.pdf
  def show
    @lines = @floor_plan.lines
    respond_to do |format|
      format.html
      format.pdf do
        render pdf: 'floorprint.rb',
        orientation: 'Landscape',
        template:    'floor_plans/show.html',
        margin: {
                  left:   1,
                  right:  1,
                  top:    1,
                  bottom: 1
                }
      end
    end
  end

  # GENERATE PDF /generate_pdf/:slug
  def generate_pdf
    @lines = @floor_plan.lines
    @html = render_to_string(:action => :show, :locals => {
     location: @location,
     icons: @icons
   }, :layout => false)
    Resque.enqueue(FloorPlanPdfGetter, @html, @floor_plan.name, @floor_plan.id)
  end
  # DELETE /floor_plans/1
  # DELETE /floor_plans/1.json
  def destroy
    @floor_plan.destroy
    render json: @floor_plan
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_floor_plan_data
    @floor_plan = FloorPlan.friendly.find(params[:id])
    @location = @floor_plan.location
    @icons = @floor_plan.icons
  end

  def set_current_user
    @user = current_user
  end

  def set_s3_direct_post
    @s3_direct_post = S3_BUCKET.presigned_post(key: "floor_plans/#{SecureRandom.uuid}/${filename}", success_action_status: '201', acl: 'public-read')
  end
  # Never trust parameters from the scary internet, only allow the white list through.
  def floor_plan_params
    params.require(:floor_plan).permit(:location_id, :plan_url, :name, :floor, :created_by, :updated_by, :pdf_url)
  end
end
