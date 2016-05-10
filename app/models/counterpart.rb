class Counterpart < ActiveRecord::Base
  has_and_belongs_to_many :lawsuits, uniq: true
  scope :sorted, -> { order(name: :asc) }
  # Validation
  validates :name, presence: true, length: { maximum: 60 }
  validates :personal_number, presence: true, length: { maximum: 11 }
end
