class Expense < ActiveRecord::Base
  belongs_to :lawsuit
  validates :lawsuit, presence: true
  validates :entry, presence: true, length: { maximum: 500 }
  validates :price, presence: true, numericality: true
  scope :sorted, -> { order(created_at: :asc) }
  scope :within_firm, -> (current_user) {
    joins(:lawsuit)
      .merge(Lawsuit.where(user_id: User.in_same_firm(current_user))) }
end
