class LawsuitIndexSerializer < ActiveModel::Serializer
  attributes :id, :closed, :slug, :primary_client
  has_one :lawsuit_type
end
