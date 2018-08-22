# == Schema Information
#
# Table name: icons
#
#  id                 :integer          not null, primary key
#  top                :float
#  left               :float
#  rotate             :float
#  category           :string
#  device_type        :string
#  location_device_id :integer
#  floor_plan_id      :integer
#  color              :string
#  radius             :float
#  icon_class         :string
#  coverage_color     :string
#  integer            :float
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#

require 'test_helper'

class IconTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
