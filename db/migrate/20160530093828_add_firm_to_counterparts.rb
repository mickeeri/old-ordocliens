class AddFirmToCounterparts < ActiveRecord::Migration
  def change
    add_reference :counterparts, :firm, index: true, foreign_key: true
  end
end
