class AddEmailAndPhoneNumberToClients < ActiveRecord::Migration
  def change
    add_column :clients, :email, :string
    add_column :clients, :phone_number, :string
  end
end
