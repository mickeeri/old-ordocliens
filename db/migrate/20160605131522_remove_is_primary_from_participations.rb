class RemoveIsPrimaryFromParticipations < ActiveRecord::Migration
  def change
    remove_column :participations, :is_primary
  end
end
