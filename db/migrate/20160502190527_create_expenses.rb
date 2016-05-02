class CreateExpenses < ActiveRecord::Migration
  def change
    create_table :expenses do |t|
      t.text :entry
      t.decimal :price
      t.date :date
      t.references :legal_case, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
