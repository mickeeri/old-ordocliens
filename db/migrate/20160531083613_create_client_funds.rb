class CreateClientFunds < ActiveRecord::Migration
  def change
    create_table :client_funds do |t|
      t.text :entry
      t.decimal :balance
      t.date :date
      t.references :lawsuit, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
