class Client < ActiveRecord::Base
  belongs_to :user, required: true
  has_many :legal_cases, dependent: :destroy
  validates :first_name, presence: true, length: { maximum: 40 }
  validates :last_name, presence: true, length: { maximum: 60 }
  validates :ssn, presence: true,
                  length: { maximum: 10 },
                  numericality: { only_integer: true }
  # TODO: add slug.

  scope :sorted, ->{order(last_name: :asc)}
  scope :search, -> (last_name) {where("last_name like ?", "#{last_name}%")}
end
