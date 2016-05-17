class LawsuitSerializer < ActiveModel::Serializer
  attributes :id, :closed, :court, :case_number, :slug, :primary_client
  # Select the client first added to the lawsuit.
  def primary_client
    Lawsuit.find(id).clients.order(created_at: :desc).first.full_name
    # client += " m.fl" if clients.count > 1
  end
  has_many :clients
  has_one :lawsuit_type
end
