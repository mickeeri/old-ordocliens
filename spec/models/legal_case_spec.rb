require "rails_helper"

RSpec.describe LegalCase, type: :model do
  it { should belong_to :client }
  it { should have_many :tasks }
  it { should validate_presence_of :name }
  it { should validate_length_of(:name).is_at_most(100) }
  it "active should have default value true" do
    client = build(:client)
    legal_case = client.legal_cases.build(name: "Legal case example")
    expect(legal_case.active).to eq(true)
  end
end
