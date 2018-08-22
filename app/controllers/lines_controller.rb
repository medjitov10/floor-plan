class LinesController < ApplicationController
   skip_before_action :verify_authenticity_token
  def index
    slug = params.to_unsafe_h.first.first
    @floor_plan = FloorPlan.friendly.find(slug)
    @lines = @floor_plan.lines
    render json: @lines
  end

  def create
    @line = Line.create(lines_params)
    render json: @line
  end

  def destroy
    @line = Line.find(params[:id]).destroy
    render json: @line
  end

  def update
    @line = Line.find(params[:id])
    unless params[:top].nil?
      @line.update(top: params[:top], left: params[:left])
    else
      @line.update(note: params[:note])
    end
  end

  private
  def lines_params
    params.require(:line).permit(:angle, :category, :color, :direction, :floor_plan_id, :left, :top, :width)
  end
end
