class CreateFloorPlans < ActiveRecord::Migration[5.1]
  def change
    create_table :floor_plans do |t|
      t.integer :location_id
      t.string :name
      t.string :floor
      t.string :plan_url
      t.string :pdf_url
      t.timestamps
    end
  end
end
