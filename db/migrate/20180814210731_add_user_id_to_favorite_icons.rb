class AddUserIdToFavoriteIcons < ActiveRecord::Migration[5.1]
  def change
    add_column :favorite_icons, :user_id, :integer
  end
end
