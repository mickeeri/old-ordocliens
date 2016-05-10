class Dispute < ActiveRecord::Base
  belongs_to :client
  belongs_to :counterpart
end
