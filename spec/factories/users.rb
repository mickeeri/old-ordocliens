FactoryGirl.define do
  factory :user do
    firm
    name = Faker::Name.name
    full_name name
    user_name Faker::Internet.user_name(name)
    email Faker::Internet.email(name)
    password = Faker::Internet.password(6, 20, true, true)
    password password
    password_confirmation password
  end

  factory :another_user, class: User do
    firm
    full_name Faker::Name.name
    user_name Faker::Internet.user_name
    email Faker::Internet.email
    password = Faker::Internet.password(6, 20, true, true)
    password password
    password_confirmation password
  end
end
