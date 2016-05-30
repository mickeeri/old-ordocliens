FactoryGirl.define do
  factory :counterpart do
    last_name Faker::Name.last_name
    first_name Faker::Name.first_name
    personal_number "899090-8989"
    info "Blablabla"
    representative Faker::Name.name
    firm
  end
end
