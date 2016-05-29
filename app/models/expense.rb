class Expense < ActiveRecord::Base
  belongs_to :lawsuit
  validates :lawsuit, presence: true
  validates :entry, presence: true
  validates :price, presence: true
  scope :sorted, -> { order(created_at: :asc) }
end
