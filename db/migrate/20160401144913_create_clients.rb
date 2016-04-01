class CreateClients < ActiveRecord::Migration
  def change
    create_table :clients do |t|
      t.string :last_name, index: true
      t.string :first_name, index: true
      t.string :ssn, index: true, unique: true
      t.string :street
      t.string :post_code
      t.string :city
      t.text :note
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
