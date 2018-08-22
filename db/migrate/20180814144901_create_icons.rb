class CreateIcons < ActiveRecord::Migration[5.1]
  def change
    create_table :icons do |t|
      t.float :top
      t.float :left
      t.float :rotate
      t.string :category
      t.string :device_type
      t.integer :location_device_id
      t.integer :floor_plan_id
      t.string :color
      t.float :radius
      t.string :icon_class
      t.string :coverage_color
      t.float :integer
      t.timestamps
    end
  end
end
