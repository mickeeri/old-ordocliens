class LawsuitShowSerializer < ActiveModel::Serializer
  attributes :id,
             :closed,
             :court,
             :case_number,
             :created_at,
             :link,
             :slug
  has_many :counterparts
  has_many :clients
  has_one :lawsuit_type
  def link
    lawsuit_path(id)
  end
end
