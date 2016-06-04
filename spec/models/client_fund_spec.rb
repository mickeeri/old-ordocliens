require "rails_helper"

RSpec.describe ClientFund, type: :model do
  it { should belong_to :lawsuit }
  it { should validate_numericality_of :balance }
  it { should validate_presence_of :balance }
  it { should validate_presence_of :date }
  it { should validate_presence_of :entry }
end
