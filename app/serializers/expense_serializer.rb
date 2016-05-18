class ExpenseSerializer < ActiveModel::Serializer
  attributes :id, :entry, :price
end
