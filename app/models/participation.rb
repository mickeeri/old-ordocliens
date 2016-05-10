class Participation < ActiveRecord::Base
  belongs_to :client
  belongs_to :lawsuit
end
