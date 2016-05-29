class AddIndexesToLawsuits < ActiveRecord::Migration
  def change
    add_index :lawsuits, :case_number
    add_index :lawsuits, :court
  end
end
