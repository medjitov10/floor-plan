# == Schema Information
#
# Table name: favorite_icons
#
#  id          :integer          not null, primary key
#  category    :string
#  device_type :string
#  icon_class  :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  user_id     :integer
#

require 'test_helper'

class FavoriteIconTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
