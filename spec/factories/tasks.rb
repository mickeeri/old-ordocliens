FactoryGirl.define do
  factory :task do
    entry "MyText"
    date "2016-04-17"
    worked_hours "9.25"
    lawsuit
    price_category
  end
end
