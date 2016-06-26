class ClientFund < ActiveRecord::Base
  # t.date     "date"
  # t.decimal  "balance"
  # t.integer  "lawsuit_id"
  # t.text     "entry"

  validates :balance, presence: true, numericality: true
  validates :date, presence: true
  validates :entry, presence: true, length: { maximum: 1000 }
  validates :lawsuit, presence: true

  belongs_to :lawsuit
  scope :sorted, -> { order(date: :asc, created_at: :asc) }
  scope :within_firm, -> (current_user) {
    joins(:lawsuit)
      .merge(Lawsuit.where(user_id: User.in_same_firm(current_user))) }
end
