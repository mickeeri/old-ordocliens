class LegalCase < ActiveRecord::Base
  belongs_to :client, required: true
  has_many :tasks, dependent: :destroy

  validates :name, presence: true, length: { maximum: 100 }
end
