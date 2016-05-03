class AlterLawsuitTable < ActiveRecord::Migration
  def change
    remove_column :lawsuits, :client_id
  end
end
