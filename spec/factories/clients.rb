FactoryGirl.define do
  factory :client do
    last_name Faker::Name.last_name
    first_name Faker::Name.first_name
    personal_number { "#{Faker::Number.number(6)}-#{Faker::Number.number(4)}" }
    co Faker::Name.name
    street Faker::Address.street_address
    post_code Faker::Address.postcode
    city Faker::Address.city
    note Faker::Lorem.sentence(100)
    user nil
  end
end
