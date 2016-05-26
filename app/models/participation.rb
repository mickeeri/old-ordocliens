class Participation < ActiveRecord::Base
  belongs_to :client
  belongs_to :lawsuit
  # validates :is_primary, uniqueness: { scope: :client,
  #   message: "kan bara ha en huvudklient" }
  scope :order_by_client, -> { includes(:client).order("client.last_name asc") }
end


# Lawsuit.joins(:participations).merge(Participation.where(is_primary: true))
