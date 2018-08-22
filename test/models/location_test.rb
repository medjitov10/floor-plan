# == Schema Information
#
# Table name: locations
#
#  id            :integer          not null, primary key
#  address       :string
#  city          :string
#  state         :string
#  zip           :string
#  phone         :string
#  customer_name :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  fp_qty        :integer
#

require 'test_helper'

class LocationTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
