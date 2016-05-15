FactoryGirl.define do
  factory :user do
    firm
    last_name Faker::Name.last_name
    first_name Faker::Name.first_name
    email { Faker::Internet.email }
    password = Faker::Internet.password(8, 20, true, true)
    password password
    password_confirmation password
  end

  factory :another_user, class: User do # TODO: never used I think.
    firm
    last_name Faker::Name.last_name
    first_name Faker::Name.first_name
    email Faker::Internet.email
    password = Faker::Internet.password(8, 20, true, true)
    password password
    password_confirmation password
  end
end
