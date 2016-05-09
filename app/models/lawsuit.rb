class Lawsuit < ActiveRecord::Base
  has_and_belongs_to_many :clients, uniq: true
  has_and_belongs_to_many :counterparts, uniq: true
  has_many :counterparts
  has_many :tasks, dependent: :destroy
  has_many :expenses, dependent: :destroy

  validates :name, presence: true, length: { maximum: 100 }
end
