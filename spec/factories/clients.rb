FactoryGirl.define do
  factory :client do
    last_name Faker::Name.last_name
    first_name Faker::Name.first_name
    ssn "881015-8272"
    street Faker::Address.street_address
    post_code Faker::Address.postcode
    city Faker::Address.city
    note Faker::Lorem.sentence(100)
    user
  end
end
