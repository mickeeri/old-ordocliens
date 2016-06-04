require "rails_helper"

RSpec.describe Task, type: :model do
  it { should belong_to :lawsuit }
  it { should validate_presence_of :entry }
  it { should validate_presence_of :worked_hours }
  it do
    should validate_numericality_of(:worked_hours)
      .is_greater_than(0).is_less_than_or_equal_to(24)
  end
  it { should validate_presence_of :price_category }
end
