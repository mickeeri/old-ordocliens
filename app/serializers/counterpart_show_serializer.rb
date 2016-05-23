class CounterpartShowSerializer < ActiveModel::Serializer
  attributes :id,
             :first_name,
             :last_name,
             :personal_number,
             :info,
             :representative,
             :created_at

  has_many :lawsuits
  has_many :clients
end
