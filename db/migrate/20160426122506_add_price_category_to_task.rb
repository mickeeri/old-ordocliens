class AddPriceCategoryToTask < ActiveRecord::Migration
  def change
    add_reference :tasks, :price_category, index: true, foreign_key: true
  end
end
