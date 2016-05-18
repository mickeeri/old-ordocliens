class Client < ActiveRecord::Base
  include PgSearch
  # Relations
  belongs_to :user, required: true
  has_many :participations
  has_many :lawsuits, -> { distinct }, through: :participations
  has_many :disputes
  has_many :counterparts, -> { distinct }, through: :disputes

  # Validation
  validates :first_name, presence: true, length: { maximum: 40 }
  validates :last_name, presence: true, length: { maximum: 60 }
  VALID_SSN_REGEX = /\A[0-9]{6}-[0-9]{4}\z/
  validates :ssn, presence: true, format: { with: VALID_SSN_REGEX }

  # Scopes
  scope :users_clients, -> (current_user) { where(user: current_user) }
  scope :sorted, -> { order(last_name: :asc) }
  pg_search_scope :search,
                  against: [:first_name, :last_name, :ssn],
                  using: { tsearch: { prefix: true, normalization: 2 }
    }

  def full_name
    "#{last_name}, #{first_name}"
  end
end
