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

class Icon < ApplicationRecord
  belongs_to :floor_plan
  has_one :device

  after_create :update_coord

  def category_enum
    ['Access', 'CCTV', 'Custom', 'Intrusion', 'Media', 'Network']
  end

  def device_type_enum
    ["ACS Cabinet", "Network Switch", "Server", "UPS Power", "Single Door", "Double Door", "Card Reader", "Door Lock", "Request to Exit", "Door Position", "ACS Software", "Node", "Wireless Network", "User Workstation", "Power Supply", "Alarm Sounder", "System Expansion", "General Component", "Video Monitor", "Enclosure", "Intercom End Point", "Intercom Master", "General Assembly", "Hidden camera", "Fish eye", "Three Head", "Four Head", "Fixed Camera", "PTZ Camera", "Network Patch", "Microphone", "Analog Video", "Alarm Strobe", "Jack", "NVR-DVR", "A-phone entry device", "Alarm", "Auto sliding door", "Automatic door operator", "AUX power supply", "Cam ptz", "Three multi head camera", "Four multi head camera", "Camera 360", "Cell phone booster", "Data jack", "Digital kiosk", "Door bifold", "Door", "Door contact", "Door double", "Dual data jack", "Electric push bar", "Electrioc strike", "Gate contact", "Glass break", "Intercom", "Key switch override", "Mag door holder", "Mag lock", "Motion camera", "Motion camera 360", "Opening", "Panel", "Panic button", "Power outlet", "Ptac unit", "Recess power voice data", "Remote door release button", "Request exit button", "Splice point", "Voice jack", "Voice data jack", "Wander guard antenna", "Wander guard annunciator", "Wifi access point", "Window", "Wireless access point", "Wireless repeater", "Wireless station", "Television", "Multimedia Outlet", "Projector", "Projection Screen", "Speaker", "Subwoofer", "Audio Source", "Video Source", "AV Pre-Amp", "Audio Amplifier", "Video Distribution", "Equipment Rack", "Structured Media", "Microphone Outlet", "Network Router", "Network Firewall"]
  end

  def location_device_id_enum
    arr = []
    Device.all.each do |device|
      arr << [['Device', device.id].join(' # '), device.id]
    end
    return arr
  end

  def update_coord
    self.update(top: 0, left: 0)
  end

  def set_color
    case self.category
    when "Access"
        self.update(color: '#0071db', coverage_color: 'rgba(0, 113, 219, .3)')
      when "CCTV"
        self.update(color: '#f73149', coverage_color: 'rgba(255, 0, 0, 0.3)')
      when "Intrusion"
        self.update(color: '#cacac8', coverage_color: 'rgba(202, 202, 200, .3)')
      when "Media"
        self.update(color: '#ffdf00', coverage_color: 'rgba(255, 238, 130, 0.3)')
      when "Network"
        self.update(color: '#0093b7', coverage_color: 'rgba(0, 149, 186, .3)')
      when "Custom"
        self.update(color: nil, coverage_color: 'rgba(140, 146, 172, .3)')
      end
  end

end
