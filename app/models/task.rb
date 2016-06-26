class Task < ActiveRecord::Base
  # t.text     "entry"
  # t.date     "date"
  # t.decimal  "worked_hours"
  # t.integer  "lawsuit_id"
  # t.integer  "price_category_id"
  
  belongs_to :lawsuit
  belongs_to :price_category, required: true
  validates :entry, presence: true, length: { maximum: 1000 }
  validates :worked_hours, presence: true,
                           numericality: { greater_than_or_equal_to: 0,
                                           less_than_or_equal_to: 24 }
  scope :sorted_by_date, -> { order(date: :asc, created_at: :asc) }
  scope :within_firm, -> (current_user) {
    joins(:lawsuit)
      .merge(Lawsuit.where(user_id: User.in_same_firm(current_user))) }
end
