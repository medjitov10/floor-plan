class AddAngleToIcon < ActiveRecord::Migration[5.1]
  def change
    add_column :icons, :angle, :float
  end
end
