class User < ActiveRecord::Base
  belongs_to :firm, required: true
  has_many :clients, dependent: :destroy
  before_save { self.email = email.downcase }
  has_secure_password
  # VALIDATION
  validates :user_name, presence: true, length: { maximum: 40 }
  validates :full_name, presence: true, length: { maximum: 100 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
  validates :email, presence: true,
                    length: { maximum: 255 },
                    format: { with: VALID_EMAIL_REGEX },
                    uniqueness: { case_sensitive: false }
  validates :password, presence: true, length: { minimum: 6 }, allow_nil: true
end
