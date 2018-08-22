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

class FloorPlan < ApplicationRecord
  belongs_to :location
  has_many :icons
  has_many :lines
  # has_many :icons, dependent: :destroy
  # has_many :lines, dependent: :destroy
  # has_attached_file :plan, styles: { medium: "300x300>", thumb: "150x150>" }, default_url: "/images/:style/missing.png"
  # validates_attachment_content_type :plan, content_type: /\Aimage\/.*\z/
 	validates :name, presence: true
  validates :name, uniqueness: true
  extend FriendlyId
    friendly_id :name, use: :slugged
  after_create :update_qty
  after_destroy :update_qty
  #
  def update_qty
    self.location.update(fp_qty: self.location.floor_plans.count)
  end
end
