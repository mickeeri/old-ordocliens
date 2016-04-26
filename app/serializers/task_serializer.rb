class TaskSerializer < ActiveModel::Serializer
  attributes :id, :entry, :date, :worked_hours
  has_one :price_category
end
