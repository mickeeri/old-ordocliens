class CreateLegalCases < ActiveRecord::Migration
  def change
    create_table :legal_cases do |t|
      t.references :client, index: true, foreign_key: true
      t.string :name
      t.boolean :active

      t.timestamps null: false
    end
  end
end
