class AlterCounterpartsTable < ActiveRecord::Migration
  def change
    change_table :counterparts do |t|
      t.remove :client_id
      t.references :lawsuit, index: true, foreign_key: true
    end
  end
end
