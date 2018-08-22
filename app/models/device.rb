# == Schema Information
#
# Table name: devices
#
#  id                       :integer          not null, primary key
#  device_type              :string
#  model                    :string
#  encrypted_ip_internal    :string
#  encrypted_ip_external    :string
#  encrypted_port_number    :string
#  encrypted_mac_address    :string
#  encrypted_username       :string
#  encrypted_password       :string
#  device_frame_per_second  :string
#  remote_connectivity      :boolean
#  location_id              :integer
#  manufacturer             :string
#  general_location         :string
#  category                 :string
#  encrypted_ip_internal_iv :string
#  encrypted_ip_external_iv :string
#  encrypted_port_number_iv :string
#  encrypted_mac_address_iv :string
#  encrypted_username_iv    :string
#  encrypted_password_iv    :string
#  note                     :text
#  created_at               :datetime         not null
#  updated_at               :datetime         not null
#

class Device < ApplicationRecord
  belongs_to :location
end
