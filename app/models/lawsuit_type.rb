class LawsuitType < ActiveRecord::Base
  has_many :lawsuits
  validates :name, presence: :true
  scope :sorted, -> { order(name: :asc) }
end
