class CreateLines < ActiveRecord::Migration[5.1]
  def change
    create_table :lines do |t|
      t.string :color
      t.string :category
      t.float :top
      t.float :left
      t.string :note
      t.string :direction
      t.integer :floor_plan_id
      t.float :width
      t.float :angle
      t.timestamps
    end
  end
end
