class RemoveLawsuitIdFromCounterparts < ActiveRecord::Migration
  def change
    remove_column :counterparts, :lawsuit_id
  end
end
