class Expense < ActiveRecord::Base
  belongs_to :lawsuit
  validates :lawsuit, presence: true
  validates :entry, presence: true
  validates :price, presence: true
  scope :sorted, -> { order(created_at: :asc) }
  scope :within_firm, -> (current_user) {
    joins(:lawsuits)
      .merge(Lawsuit.where(user_id: User.in_same_firm(current_user))) }
end
