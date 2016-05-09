class Counterpart < ActiveRecord::Base
  belongs_to :lawsuit
  has_and_belongs_to_many :lawsuits, uniq: true
  scope :sorted, -> { order(name: :asc) }
end
