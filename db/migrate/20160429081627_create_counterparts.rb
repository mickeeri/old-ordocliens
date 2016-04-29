class CreateCounterparts < ActiveRecord::Migration
  def change
    create_table :counterparts do |t|
      t.string :name
      t.string :personal_number
      t.text :info
      t.string :representative
      t.references :client, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
