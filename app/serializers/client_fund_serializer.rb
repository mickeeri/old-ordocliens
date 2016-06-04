class ClientFundSerializer < ActiveModel::Serializer
  include ActionView::Helpers::NumberHelper

  attributes :id, :entry, :balance, :date, :balance_string

  def balance_string
    number_to_currency(balance, delimiter: " ")
  end
end
