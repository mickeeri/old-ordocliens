class LawsuitSerializer < ActiveModel::Serializer
  attributes :id, :closed, :slug, :primary_client
  has_one :lawsuit_type
  has_one :user
  # has_many :clients
end
