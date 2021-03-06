# == Schema Information
#
# Table name: lines
#
#  id            :integer          not null, primary key
#  color         :string
#  category      :string
#  top           :float
#  left          :float
#  note          :string
#  direction     :string
#  floor_plan_id :integer
#  width         :float
#  angle         :float
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Line < ApplicationRecord
  belongs_to :floor_plan
end
