class CreateFavoriteIcons < ActiveRecord::Migration[5.1]
  def change
    create_table :favorite_icons do |t|
      t.string :category
      t.string :device_type
      t.string :icon_class
      t.timestamps
    end
  end
end
