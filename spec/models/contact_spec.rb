require "rails_helper"

RSpec.describe Contact, type: :model do
  it "shoult be valid" do
    contact = build(:contact)
    expect(contact).to be_valid
  end
  it { should belong_to(:client) }
  it { should belong_to(:contact_type) }
end
