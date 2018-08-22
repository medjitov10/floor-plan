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

class FavoriteIcon < ApplicationRecord
  belongs_to :user
  validates_presence_of :category, :device_type
  def category_enum
    ['Access', 'CCTV', 'Custom', 'Intrusion', 'Media', 'Network']
  end

  def device_type_enum
    ["ACS Cabinet", "Network Switch", "Server", "UPS Power", "Single Door", "Double Door", "Card Reader", "Door Lock", "Request to Exit", "Door Position", "ACS Software", "Node", "Wireless Network", "User Workstation", "Power Supply", "Alarm Sounder", "System Expansion", "General Component", "Video Monitor", "Enclosure", "Intercom End Point", "Intercom Master", "General Assembly", "Hidden camera", "Fish eye", "Three Head", "Four Head", "Fixed Camera", "PTZ Camera", "Network Patch", "Microphone", "Analog Video", "Alarm Strobe", "Jack", "NVR-DVR", "A-phone entry device", "Alarm", "Auto sliding door", "Automatic door operator", "AUX power supply", "Cam ptz", "Three multi head camera", "Four multi head camera", "Camera 360", "Cell phone booster", "Data jack", "Digital kiosk", "Door bifold", "Door", "Door contact", "Door double", "Dual data jack", "Electric push bar", "Electrioc strike", "Gate contact", "Glass break", "Intercom", "Key switch override", "Mag door holder", "Mag lock", "Motion camera", "Motion camera 360", "Opening", "Panel", "Panic button", "Power outlet", "Ptac unit", "Recess power voice data", "Remote door release button", "Request exit button", "Splice point", "Voice jack", "Voice data jack", "Wander guard antenna", "Wander guard annunciator", "Wifi access point", "Window", "Wireless access point", "Wireless repeater", "Wireless station", "Television", "Multimedia Outlet", "Projector", "Projection Screen", "Speaker", "Subwoofer", "Audio Source", "Video Source", "AV Pre-Amp", "Audio Amplifier", "Video Distribution", "Equipment Rack", "Structured Media", "Microphone Outlet", "Network Router", "Network Firewall"]
  end
end
