class Client < ActiveRecord::Base
  include PgSearch
  # Relations
  belongs_to :user, required: true
  has_many :legal_cases, dependent: :destroy
  has_many :contact_types, through: :contacts
  has_many :contacts

  # Validation
  validates :first_name, presence: true, length: { maximum: 40 }
  validates :last_name, presence: true, length: { maximum: 60 }
  validates :ssn, presence: true,
                  length: { maximum: 10 },
                  numericality: { only_integer: true }
  # TODO: add slug.

  scope :sorted, ->{order(last_name: :asc)}
  #cope :search, -> (query) {where("first_name LIKE ? OR last_name LIKE ?", "#{query}%", "#{query}%")}
  pg_search_scope :search,
    against: [
      :first_name,
      :last_name,
      :ssn
    ],
    using: {
      tsearch: {
        prefix: true,
        normalization: 2
      }
    }
end
