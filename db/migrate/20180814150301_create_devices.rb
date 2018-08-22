class CreateDevices < ActiveRecord::Migration[5.1]
  def change
    create_table :devices do |t|
      t.string :device_type
      t.string :model
      t.string :encrypted_ip_internal
      t.string :encrypted_ip_external
      t.string :encrypted_port_number
      t.string :encrypted_mac_address
      t.string :encrypted_username
      t.string :encrypted_password
      t.string :device_frame_per_second
      t.boolean :remote_connectivity
      t.integer :location_id
      t.string :manufacturer
      t.string :general_location
      t.string :category
      t.string :encrypted_ip_internal_iv
      t.string :encrypted_ip_external_iv
      t.string :encrypted_port_number_iv
      t.string :encrypted_mac_address_iv
      t.string :encrypted_username_iv
      t.string :encrypted_password_iv
      t.text :note
      t.timestamps
    end
  end
end
