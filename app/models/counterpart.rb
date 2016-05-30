class Counterpart < ActiveRecord::Base
  include PgSearch
  has_many :involvements, dependent: :destroy
  has_many :lawsuits, -> { distinct }, through: :involvements
  has_many :disputes, dependent: :destroy
  has_many :clients, -> { distinct }, through: :disputes
  # Validation
  validates :first_name, presence: true, length: { maximum: 60 }
  validates :last_name, presence: true, length: { maximum: 60 }
  VALID_SSN_REGEX = /\A[0-9]{6}-[0-9]{4}\z/
  validates :personal_number, presence: true, format: { with: VALID_SSN_REGEX }
  validates :representative, allow_blank: true, length: { maximum: 60 }
  validates :info, allow_blank: true, length: { maximum: 1000 }
  # Scopes
  scope :sorted, -> { order(last_name: :asc, first_name: :asc) }
  scope :within_firm, -> (current_user) {
    joins(:lawsuits)
      .merge(Lawsuit.where(user_id: User.in_same_firm(current_user))) }
  pg_search_scope :search,
                  against: [:last_name, :first_name, :personal_number],
                  using: { tsearch: { prefix: true, normalization: 2 }
    }

  def full_name
    "#{last_name}, #{first_name}"
  end
end
