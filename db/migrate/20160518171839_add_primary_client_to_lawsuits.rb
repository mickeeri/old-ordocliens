class AddPrimaryClientToLawsuits < ActiveRecord::Migration
  def change
    add_column :lawsuits, :primary_client, :string
  end
end
