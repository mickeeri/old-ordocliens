FactoryGirl.define do
  factory :user do
    last_name Faker::Name.last_name
    first_name Faker::Name.first_name
    email { Faker::Internet.email }
    password = Faker::Internet.password(8, 20, true, true)
    password password
    password_confirmation password
    firm nil
  end

  factory :another_user, class: User do # TODO: never used I think.
    last_name Faker::Name.last_name
    first_name Faker::Name.first_name
    email Faker::Internet.email
    password = Faker::Internet.password(8, 20, true, true)
    password password
    password_confirmation password
    firm nil
  end
end
