class Lawsuit < ActiveRecord::Base
  has_many :participations
  has_many :clients, through: :participations
  has_many :disputes
  has_many :counterparts, through: :disputes
  has_many :tasks, dependent: :destroy
  has_many :expenses, dependent: :destroy

  validates :name, presence: true, length: { maximum: 100 }
end
