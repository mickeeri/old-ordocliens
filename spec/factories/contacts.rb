FactoryGirl.define do
  factory :contact do
    contact Faker::Internet.email
    client
    contact_type
  end
end
