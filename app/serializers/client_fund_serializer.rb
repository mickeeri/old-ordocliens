class ClientFundSerializer < ActiveModel::Serializer
  attributes :id, :entry, :balance, :date
end
