FactoryGirl.define do
  factory :counterpart do
    last_name Faker::Name.last_name
    first_name Faker::Name.first_name
    personal_number { "#{Faker::Number.number(6)}-#{Faker::Number.number(4)}" }
    info "Blablabla"
    representative Faker::Name.name
    firm nil
  end
end
