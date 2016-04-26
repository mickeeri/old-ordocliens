class CreatePriceCategories < ActiveRecord::Migration
  def change
    create_table :price_categories do |t|
      t.string :name
      t.decimal :price

      t.timestamps null: false
    end
  end
end
