class RenameSsnColumn < ActiveRecord::Migration
  def change
    rename_column :clients, :personal_number, :personal_number
  end
end
