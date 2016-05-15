class Lawsuit < ActiveRecord::Base
  has_many :participations, dependent: :destroy
  has_many :clients, -> { distinct }, through: :participations
  has_many :involvements, dependent: :destroy
  has_many :counterparts, -> { distinct }, through: :involvements
  has_many :tasks, dependent: :destroy
  has_many :expenses, dependent: :destroy

  validates :name, presence: true, length: { maximum: 100 }
  # validates :closed, presence: true
end
