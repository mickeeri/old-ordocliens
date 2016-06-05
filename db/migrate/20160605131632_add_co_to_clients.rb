class AddCoToClients < ActiveRecord::Migration
  def change
    add_column :clients, :co, :string
  end
end
