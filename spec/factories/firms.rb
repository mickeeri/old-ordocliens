FactoryGirl.define do
  factory :firm do
    name Faker::Company.name
  end
  factory :another_firm, class: Firm do
    name Faker::Company.name
  end
end
