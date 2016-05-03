class CreateJoinTable < ActiveRecord::Migration
  def change
    create_join_table :clients, :lawsuits do |t|
      t.index [:client_id, :lawsuit_id]
      t.index [:lawsuit_id, :client_id]
    end
  end
end
