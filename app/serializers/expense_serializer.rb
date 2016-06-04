class ExpenseSerializer < ActiveModel::Serializer
  include ActionView::Helpers::NumberHelper
  attributes :id, :entry, :price, :price_string

  def price_string
    number_to_currency(price, delimiter: " ")
  end
end
