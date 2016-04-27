class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :name
      t.text :entry
      t.date :date
      t.decimal :worked_hours
      t.references :legal_case, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
