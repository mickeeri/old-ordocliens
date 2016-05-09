class CreateJoinTableLawsuitCounterpart < ActiveRecord::Migration
  def change
    create_join_table :lawsuits, :counterparts do |t|
      t.index [:lawsuit_id, :counterpart_id]
      t.index [:counterpart_id, :lawsuit_id]
    end
  end
end
