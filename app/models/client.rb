class Client < ActiveRecord::Base
  include PgSearch
  # Relations
  belongs_to :user, required: true
  has_many :legal_cases, dependent: :destroy

  # Validation
  validates :first_name, presence: true, length: { maximum: 40 }
  validates :last_name, presence: true, length: { maximum: 60 }
  validates :ssn, presence: true,
                  length: { maximum: 10 },
                  numericality: { only_integer: true }

  # Scopes
  scope :sorted, -> { order(last_name: :asc) }
  pg_search_scope :search,
                  against: [:first_name, :last_name, :ssn],
                  using: { tsearch: { prefix: true, normalization: 2 }
    }
end
