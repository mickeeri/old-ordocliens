class LawsuitType < ActiveRecord::Base
  has_many :lawsuits
  scope :sorted, -> { order(name: :asc) }
end
