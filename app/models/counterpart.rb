class Counterpart < ActiveRecord::Base
  has_many :involvements
  has_many :lawsuits, -> { distinct }, through: :involvements
  has_many :disputes
  has_many :clients, -> { distinct }, through: :disputes
  scope :sorted, -> { order(name: :asc) }
  # Validation
  validates :name, presence: true, length: { maximum: 60 }
  validates :personal_number, presence: true, length: { maximum: 11 }
end
