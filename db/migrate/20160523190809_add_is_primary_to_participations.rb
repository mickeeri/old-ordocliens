class AddIsPrimaryToParticipations < ActiveRecord::Migration
  def change
    add_column :participations, :is_primary, :boolean, index: true
  end
end
