require "rails_helper"

RSpec.describe LegalCase, type: :model do
  let(:legal_case) do
    build(:legal_case)
  end

  it "should be valid" do
    expect(legal_case).to be_valid
  end

  it "should not be valid without client" do
    legal_case.client = nil
    expect(legal_case).not_to be_valid
  end
end
