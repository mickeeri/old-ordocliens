class LegalCaseSerializer < ActiveModel::Serializer
  attributes :id, :name, :closed, :court, :case_number, :created_at
end
