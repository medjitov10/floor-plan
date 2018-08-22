class AddCreatedByToFloorPlans < ActiveRecord::Migration[5.1]
  def change
    add_column :floor_plans, :created_by, :string
  end
end
