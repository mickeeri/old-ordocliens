class CounterpartSerializer < ActiveModel::Serializer
  attributes :id, :name, :personal_number, :info, :representative
end
