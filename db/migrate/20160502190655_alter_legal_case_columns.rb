class AlterLawsuitColumns < ActiveRecord::Migration
  def change
    add_column :legal_cases, :court, :string
    change_column_default :legal_cases, :active, false
    rename_column :legal_cases, :active, :closed
    add_column :legal_cases, :case_number, :string
  end
end
