class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  belongs_to :firm, required: true
  has_many :clients, dependent: :destroy
  has_many :lawsuits, dependent: :destroy
  # before_save { self.email = email.downcase }

  # Validation
  validates :first_name, presence: true, length: { maximum: 60 }
  validates :last_name, presence: true, length: { maximum: 60 }

  # Scopes
  scope :in_same_firm, -> (user) { where(firm_id: user.firm_id) }
  scope :with_lawsuits, -> { includes(:lawsuits) }
end
