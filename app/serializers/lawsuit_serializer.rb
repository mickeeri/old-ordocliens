class LawsuitSerializer < ActiveModel::Serializer
  attributes :id, :closed, :court, :case_number, :slug, :primary_client
  has_one :lawsuit_type
  has_one :user
end
