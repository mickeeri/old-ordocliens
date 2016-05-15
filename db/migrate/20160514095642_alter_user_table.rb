class AlterUserTable < ActiveRecord::Migration
  def change
    rename_column :users, :full_name, :last_name
    add_column :users, :first_name, :string
    remove_column :users, :user_name
  end
end
