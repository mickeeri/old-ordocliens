class LegalCase < ActiveRecord::Base
  belongs_to :client, required: true
end
