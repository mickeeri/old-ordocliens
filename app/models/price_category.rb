class PriceCategory < ActiveRecord::Base
  has_many :tasks
  scope :sorted, -> { order(name: :asc) }
end
