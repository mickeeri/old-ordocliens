class LegalCase < ActiveRecord::Base
  belongs_to :client, required: true
  has_many :tasks, dependent: :destroy
end
