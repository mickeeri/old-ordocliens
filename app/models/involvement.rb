class Involvement < ActiveRecord::Base
  belongs_to :lawsuit
  belongs_to :counterpart
end
