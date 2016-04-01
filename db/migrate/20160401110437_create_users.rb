class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :full_name
      t.string :username, index:true, unique: true
      t.string :email, unique: true
      t.string :password_digest
      t.references :firm, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
