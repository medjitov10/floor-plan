# == Schema Information
#
# Table name: floor_plans
#
#  id          :integer          not null, primary key
#  location_id :integer
#  name        :string
#  floor       :string
#  plan_url    :string
#  pdf_url     :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  created_by  :string
#  slug        :string
#

require 'test_helper'

class FloorPlanTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
