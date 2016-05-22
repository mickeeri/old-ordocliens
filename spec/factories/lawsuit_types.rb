FactoryGirl.define do
  factory :lawsuit_type do
    name "Bodelning"
  end

  factory :another_lawsuit_type, class: LawsuitType do
    name "Vårdnadstvist"
  end
end
