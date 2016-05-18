class LawsuitShowSerializer < ActiveModel::Serializer
  attributes :id,
             :name,
             :closed,
             :court,
             :case_number,
             :created_at,
             :link,
             :slug,
             :primary_client
  has_many :counterparts
  has_many :clients
  has_one :lawsuit_type

  # Client first added to the lawsuit.
  def primary_client
    Lawsuit.find(id).clients.order(created_at: :desc).first.full_name
    # client += " m.fl" if clients.count > 1
  end

  def link
    lawsuit_path(id)
  end
end
