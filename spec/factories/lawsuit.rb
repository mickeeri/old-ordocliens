FactoryGirl.define do
  factory :lawsuit do
    user
    lawsuit_type
    closed false
    court "Östersunds tingsrätt"
  end
end
