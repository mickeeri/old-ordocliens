class CreateDisputes < ActiveRecord::Migration
  def change
    create_table :disputes do |t|
      t.references :client, index: true, foreign_key: true
      t.references :counterpart, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
