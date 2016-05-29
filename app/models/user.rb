class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  belongs_to :firm, required: true
  has_many :clients, dependent: :destroy
  has_many :lawsuits, dependent: :destroy
  # before_save { self.email = email.downcase }

  # VALIDATION
  validates :first_name, presence: true, length: { maximum: 60 }
  validates :last_name, presence: true, length: { maximum: 60 }
  scope :in_same_firm, -> (user) { where(firm_id: user.firm_id) }
  scope :with_lawsuits, -> { includes(:lawsuits) }

  # VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
  # validates :email, presence: true,
  #                   length: { maximum: 255 },
  #                   format: { with: VALID_EMAIL_REGEX },
  #                   uniqueness: { case_sensitive: false }
  # validates :password, presence: true, length: { in: 6..30 }, allow_nil: true
end
