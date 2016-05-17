class Task < ActiveRecord::Base
  belongs_to :lawsuit
  belongs_to :price_category, required: true # TODO: change to has_one?
  validates :entry, presence: true, length: { maximum: 1000 }
  validates :worked_hours, presence: true

  scope :sorted_by_date, -> { order(date: :desc, created_at: :desc) }
end
