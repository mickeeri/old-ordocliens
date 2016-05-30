FactoryGirl.define do
  factory :lawsuit do
    user
    lawsuit_type
    closed false
    court "Östersunds tingsrätt"
    association :primary_client, factory: :client
  end
end
