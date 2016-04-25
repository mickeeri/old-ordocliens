class Task < ActiveRecord::Base
  belongs_to :legal_case
  validates :entry, presence: true, length: { maximum: 255  }
  validates :worked_hours, presence: true

  scope :sorted_by_date, -> { order(date: :asc) }
end
