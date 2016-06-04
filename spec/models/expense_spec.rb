require "rails_helper"

RSpec.describe Expense, type: :model do
  it { should belong_to :lawsuit }
  it { should validate_numericality_of :price }
  it { should validate_presence_of :entry }
  it { should validate_presence_of :lawsuit }
  it { should validate_presence_of :price }
end
