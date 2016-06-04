class ClientFund < ActiveRecord::Base
  # t.text     "entry"
  # t.decimal  "balance"
  # t.date     "date"
  # t.integer  "lawsuit_id"
  validates :lawsuit, presence: true
  validates :balance, presence: true, numericality: true
  validates :date, presence: true
  validates :entry, presence: true, length: { maximum: 500 }
  belongs_to :lawsuit
  scope :sorted, -> { order(created_at: :asc) }
  scope :within_firm, -> (current_user) {
    joins(:lawsuit)
      .merge(Lawsuit.where(user_id: User.in_same_firm(current_user))) }
end
