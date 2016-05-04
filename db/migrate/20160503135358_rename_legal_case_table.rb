class RenameLawsuitTable < ActiveRecord::Migration
  def change
    rename_table :legal_cases, :lawsuits
    rename_column :expenses, :legal_case_id, :lawsuit_id
    rename_column :tasks, :legal_case_id, :lawsuit_id
  end
end
