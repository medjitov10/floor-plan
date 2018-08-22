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


class Location < ApplicationRecord
	has_many :floor_plans
	has_many :devices

  def self.get_floor_plans
  	result = []
    Location.all.map do |location|
      obj = {
        name: location.customer_name,
        address: location.address,
        qty: location.fp_qty,
        location_id: location.id
      }
      result << obj
    end
    return result
   end

end
