class CounterpartSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :personal_number, :full_name
end
