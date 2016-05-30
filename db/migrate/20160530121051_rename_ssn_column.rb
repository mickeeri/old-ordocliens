class RenameSsnColumn < ActiveRecord::Migration
  def change
    rename_column :clients, :ssn, :personal_number
  end
end
