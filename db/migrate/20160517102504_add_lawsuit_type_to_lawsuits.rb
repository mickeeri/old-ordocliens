class AddLawsuitTypeToLawsuits < ActiveRecord::Migration
  def change
    add_reference :lawsuits, :lawsuit_type, index: true, foreign_key: true
    remove_column :lawsuits, :name
  end
end
