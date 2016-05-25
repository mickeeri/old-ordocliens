class AddIsPrimaryDefaultToParticipations < ActiveRecord::Migration
  def change
    change_column_default :participations, :is_primary, false
  end
end
