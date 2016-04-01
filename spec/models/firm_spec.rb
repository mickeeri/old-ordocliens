require "rails_helper"

RSpec.describe Firm, type: :model do
  it "should be valid" do
    firm = build(:firm)
    expect(firm).to be_valid
  end

  it "should not be valid without name" do
    firm = build(:firm)
    firm.name = ""
    expect(firm).not_to be_valid
  end
end
