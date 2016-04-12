class CreateContactTypes < ActiveRecord::Migration
  def change
    create_table :contact_types do |t|
      t.string :contact_type_name

      t.timestamps null: false
    end
  end
end
