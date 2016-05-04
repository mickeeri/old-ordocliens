class LawsuitSerializer < ActiveModel::Serializer
  attributes :id, :name, :closed, :court, :case_number, :created_at
  has_many :counterparts
end
