class CreateParticipations < ActiveRecord::Migration
  def change
    create_table :participations do |t|
      t.references :client, index: true, foreign_key: true
      t.references :lawsuit, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
