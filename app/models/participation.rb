class Participation < ActiveRecord::Base
  belongs_to :client
  belongs_to :lawsuit
  validates :is_primary, uniqueness: { scope: :client,
    message: "kan bara ha en huvudklient" }
end
