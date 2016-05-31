class ClientFund < ActiveRecord::Base
  belongs_to :lawsuit
  scope :sorted, -> { order(created_at: :asc) }
  scope :within_firm, -> (current_user) {
    joins(:lawsuit)
      .merge(Lawsuit.where(user_id: User.in_same_firm(current_user))) }
end
