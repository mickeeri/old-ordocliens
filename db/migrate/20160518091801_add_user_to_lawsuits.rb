class AddUserToLawsuits < ActiveRecord::Migration
  def change
    add_reference :lawsuits, :user, index: true, foreign_key: true
  end
end
