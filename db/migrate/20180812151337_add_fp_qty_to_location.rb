class AddFpQtyToLocation < ActiveRecord::Migration[5.1]
  def change
    add_column :locations, :fp_qty, :integer
  end
end
