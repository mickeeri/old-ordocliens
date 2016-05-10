class CreateInvolvements < ActiveRecord::Migration
  def change
    create_table :involvements do |t|
      t.references :lawsuit, index: true, foreign_key: true, unique: true
      t.references :counterpart, index: true, foreign_key: true, unique: true

      t.timestamps null: false
    end
  end
end
