class AddIndexesToCounterpart < ActiveRecord::Migration
  def change
    add_index :counterparts, :last_name
    add_index :counterparts, :first_name
    add_index :counterparts, :personal_number
  end
end
