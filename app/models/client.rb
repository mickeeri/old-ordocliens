class Client < ActiveRecord::Base
  # t.integer  "user_id"
  # t.string   "city"
  # t.string   "co"
  # t.string   "email"
  # t.string   "first_name"
  # t.string   "last_name"
  # t.string   "mobile"
  # t.string   "personal_number"
  # t.string   "phone_number"
  # t.string   "post_code"
  # t.string   "street"
  # t.text     "note"

  include PgSearch
  # Relations
  belongs_to :user, required: true
  has_many :participations, dependent: :destroy
  has_many :lawsuits, -> { distinct }, through: :participations
  has_many :disputes, dependent: :destroy
  has_many :counterparts, -> { distinct }, through: :disputes

  # Validation
  validates :city, allow_blank: true, length: { maximum: 100 }
  validates :co, allow_blank: true, length: { maximum: 255 }
  validates :first_name, presence: true, length: { maximum: 40 }
  validates :last_name, presence: true, length: { maximum: 60 }
  validates :mobile, allow_blank: true, length: { maximum: 20 }
  validates :note, allow_blank: true, length: { maximum: 1000 }
  validates :phone_number, allow_blank: true, length: { maximum: 20 }
  validates :post_code, allow_blank: true,
                        length: { minimum: 5, maximum: 6 }
  validates :street, allow_blank: true, length: { maximum: 255 }
  VALID_SSN_REGEX = /\A[0-9]{6}-[0-9]{4}\z/
  validates :personal_number, presence: true, format: { with: VALID_SSN_REGEX }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
  validates :email, length: { maximum: 255 },
                    format: { with: VALID_EMAIL_REGEX },
                    allow_blank: true
  # Scopes
  scope :users_clients, -> (current_user) { where(user: current_user) }
  scope :within_firm, -> (current_user) { where(user_id: User.in_same_firm(current_user)) }
  scope :sorted, -> { order(last_name: :asc, first_name: :asc) }
  pg_search_scope :search,
                  against: [:first_name, :last_name, :personal_number],
                  using: { tsearch: { prefix: true, normalization: 2 }
    }

  def full_name
    "#{last_name}, #{first_name}"
  end
end
