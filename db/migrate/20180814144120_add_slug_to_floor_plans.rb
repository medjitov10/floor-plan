class AddSlugToFloorPlans < ActiveRecord::Migration[5.1]
  def change
    add_column :floor_plans, :slug, :string
  end
end
