class AddLastNameToCounterpart < ActiveRecord::Migration
  def change
    add_column :counterparts, :last_name, :string
    add_column :counterparts, :first_name, :string
    remove_column :counterparts, :name    
  end
end
