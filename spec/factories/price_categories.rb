FactoryGirl.define do
  factory :price_category do
    name "Arbete"
    price 1230.50
  end

  factory :antoher_price_category, class: PriceCategory do
    name "Utlägg"
    price 500.0
  end
end
