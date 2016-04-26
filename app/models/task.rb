class Task < ActiveRecord::Base
  belongs_to :legal_case
  belongs_to :price_category, required: true
  validates :entry, presence: true, length: { maximum: 1000  }
  validates :worked_hours, presence: true

  scope :sorted_by_date, -> { order(date: :asc) }
end
