class AddMobileToClients < ActiveRecord::Migration
  def change
    add_column :clients, :mobile, :string
  end
end
