class Counterpart < ActiveRecord::Base
  # t.integer  "firm_id"
  # t.string   "first_name"
  # t.string   "last_name"
  # t.string   "personal_number"
  # t.string   "representative"
  # t.text     "info"

  include PgSearch
  has_many :clients, -> { distinct }, through: :disputes
  has_many :disputes, dependent: :destroy
  has_many :involvements, dependent: :destroy
  has_many :lawsuits, -> { distinct }, through: :involvements

  # Validation
  validates :first_name, presence: true, length: { maximum: 60 }
  validates :last_name, presence: true, length: { maximum: 60 }
  VALID_SSN_REGEX = /\A[0-9]{6}-[0-9]{4}\z/
  validates :personal_number, presence: true, format: { with: VALID_SSN_REGEX }
  validates :representative, allow_blank: true, length: { maximum: 60 }
  validates :info, allow_blank: true, length: { maximum: 1000 }

  # Scopes
  scope :sorted, -> { order(last_name: :asc, first_name: :asc) }
  pg_search_scope :search,
                  against: [:last_name, :first_name, :personal_number],
                  using: { tsearch: { prefix: true, normalization: 2 } }

  def full_name
    "#{last_name}, #{first_name}"
  end

  def self.within_firm(current_user)
    Counterpart.joins(:lawsuits)
               .merge(Lawsuit.within_firm(current_user))
               .distinct
  end
end
