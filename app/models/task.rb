class Task < ActiveRecord::Base
  belongs_to :lawsuit
  belongs_to :price_category, required: true # TODO: change to has_one?
  validates :entry, presence: true, length: { maximum: 1000 }
  validates :worked_hours, presence: true

  scope :sorted_by_date, -> { order(date: :asc, created_at: :asc) }
  scope :within_firm, -> (current_user) {
    joins(:lawsuits)
      .merge(Lawsuit.where(user_id: User.in_same_firm(current_user))) }
end
