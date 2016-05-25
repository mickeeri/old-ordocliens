class LawsuitSerializer < ActiveModel::Serializer
  attributes :id, :closed, :slug, :primary_client, :created_at
  has_one :lawsuit_type
  has_one :user
  # has_one :primary_client
  # has_many :clients
end
