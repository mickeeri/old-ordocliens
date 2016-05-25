class AddPrimaryClientToLawsuits < ActiveRecord::Migration
  def change
    # http://stackoverflow.com/questions/27809342/rails-migration-add-reference-to-table-but-different-column-name-for-foreign-ke
    add_column :lawsuits, :primary_client_id, :int, index: true
    add_foreign_key :lawsuits, :clients, column: :primary_client_id
  end
end
