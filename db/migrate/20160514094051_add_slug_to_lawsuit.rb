class AddSlugToLawsuit < ActiveRecord::Migration
  def change
    add_column :lawsuits, :slug, :string
    add_index :lawsuits, :slug
  end
end
