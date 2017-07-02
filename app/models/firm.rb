class Firm < ActiveRecord::Base
  has_many :users, dependent: :destroy
  validates :name, presence: true,
                   length: { maximum: 40 },
                   uniqueness: { case_sensitive: false }
end
